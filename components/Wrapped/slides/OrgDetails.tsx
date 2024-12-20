// @ts-nocheck

import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import type { OrgData, WrappedData, SpendingByDate, date } from "../utils/data";
import { prettifyCategory } from "./HCBTopMerchants";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";
import Background from "../components/Background";
import shuffle from "fast-shuffle";
import React, { useEffect, useRef, useState } from "react";

function findMonthWithMaxAbsoluteSum(data: SpendingByDate) {
  let monthSums: { [key: string]: number } = {};
  for (let date in data) {
    if (data.hasOwnProperty(date)) {
      let monthKey = date.substring(0, 7);
      if (!monthSums[monthKey]) {
        monthSums[monthKey] = 0;
      }
      monthSums[monthKey] += Math.abs(data[date as date]);
    }
  }
  let maxMonth = Object.keys(monthSums).reduce((a, b) =>
    monthSums[a] > monthSums[b] ? a : b
  );
  return new Date(maxMonth + "-01").toLocaleString("default", {
    month: "long"
  });
}

function deterministicShuffle(seed: string, array: any[]) {
  let intSeed = 0;
  for (let i = 0; i < seed.length; i++) {
    intSeed += seed.charCodeAt(i);
  }

  const shuffler = shuffle(intSeed);
  return shuffler(array);
}

export default function OrgDetails({
  data,
  organization,
  position
}: {
  data: WrappedData;
  organization: OrgData & { name: string };
  position: number;
}) {
  position = position % 3;
  const wrapperRef = useRef();
  const otherRef = useRef();

    let location = Object.keys(
    Object.entries(organization.spendingByLocation)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
  )[0].split(" - ");

  let copy = {
    merchant: [
      (amount: string) =>
        `raked in a lot of cash (${amount}) from ${organization.name}`,
      (amount: string) => `was ${organization.name}'s #1 merchant (${amount})`,
      (amount: string) => `was your team's favorite store (${amount})`
    ],
    categoryTop: [
      () => "Your team spent a lot on",
      () => "Certain people might say you all spend too much on",
      () => `Your #1 spending category was:`
    ],
    categoryBottom: [
      (amount: string) => `${amount} to be exact. Too much?`,
      (amount: string) => `but they're wrong. Those ${amount} were justified.`,
      (amount: string) => `Yall spent ${amount} with them!`
    ],
    month: [
      (month: string) => organization.name + " was very busy in " + month,
      (month: string) => `Your team spent & raised the most in ${month}.`,
      (month: string) =>
        `Everything was happening in ${month}, it was your busiest.`
    ],
    youSpent: [
      () => `...you spent a fair bit for ${organization.name}`,
      () => `That's the total you spent on ${organization.name}!`,
      () => `All that spent by you for ${organization.name}.`
    ]
  };

  const backgrounds = [$.blue, $.green, $.orange, $.red];

  const shuffledBackgrounds = deterministicShuffle(
    organization.name,
    backgrounds
  );

  type Edge = "top" | "bottom";
  type GridItem = (edges: Edge[], rand: number, i: number) => JSX.Element;

  const zeroOrOne = position % 2;

  const gridItems: GridItem[] = [
    (edges, rand, i) => {
      let maxKey = null;
      let maxValue = -Infinity;

      for (const [key, value] of Object.entries(organization.spendingByMerchant)) {
        if (value > maxValue) {
          maxValue = value;
          maxKey = key;
        }
      }


      return (
        <HCBStat
          key="top-merchant"
          data={
            // Object.keys(
            //   Object.entries(organization.spendingByMerchant)
            //     .sort(([, a], [, b]) => b - a)
            //     .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
            // )[0]
            maxKey
          }
          label={copy.merchant[position](
            USDollarNoCents.format(
              Math.abs(
                (maxValue as number) / 100
              )
            )
          )}
          dataStyle={{
            fontSize: "36px"
          }}
          background={shuffledBackgrounds[0]}
          style$={{
            animate$fadeIn: {
              args: edges.includes("bottom")
                ? ["fromBottom"]
                : [i % 2 == zeroOrOne ? "fromRight" : "fromLeft"],
              duration: "1s",
              delay: "150ms"
            }
          }}
        />
      )
    },
    (edges, rand, i) => {
      let maxKey = null;
      let maxValue = -Infinity;

      for (const [key, value] of Object.entries(organization.spendingByCategory)) {
        if (value > maxValue) {
          maxValue = value;
          maxKey = key;
        }
      }
      return (
        <HCBStat
          key="top-category"
          topLabel={copy.categoryTop[position]()}
          data={prettifyCategory(
            maxKey
          )}
          label={copy.categoryBottom[position](
            USDollarNoCents.format(
              Math.abs(
                (maxValue as number) / 100
              )
            )
          )}
          dataStyle={{
            fontSize: "36px"
          }}

          background={shuffledBackgrounds[1]}
          style$={{
            animate$fadeIn: {
              args: edges.includes("bottom")
                ? ["fromBottom"]
                : [i % 2 == zeroOrOne ? "fromRight" : "fromLeft"],
              duration: "1s",
              delay: "150ms"
            },
            display: organization.name.length > 20 ? "none" : "flex"
          }}
        />
      )
    },
    (edges, rand, i) => (
      <div
        key="top-month"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          width: "100%"
        }}
      >
        <HCBStat
          data={findMonthWithMaxAbsoluteSum(organization.spendingByDate)}
          topLabel="Your team spent the most in"
          background={shuffledBackgrounds[2]}
          fontSize={"1.6em"}
          style$={{
            animate$fadeIn: {
              args:
                edges.includes("bottom") && rand > 0.5
                  ? ["fromBottom"]
                  : ["fromLeft"],
              duration: "1s",
              delay: "150ms"
            }
          }}
        />
        <HCBStat
          data={USDollarNoCents.format(
            organization.spendingByUser[data.individual.id] / 100
          )}
          label={copy.youSpent[position]()}
          background={shuffledBackgrounds[3]}
          fontSize={"1.9em"}
          style$={{
            animate$fadeIn: {
              args:
                edges.includes("bottom") && rand <= 0.5
                  ? ["fromBottom"]
                  : ["fromRight"],
              duration: "1s",
              delay: "150ms"
            }
          }}
        />
      </div>
    ),
    (edges, rand, i) => (
      <div
        key="spending-town"
        {...$({
          backgroundImage: `url(https://wrapped-maps.hackclub.dev/api/maps?location=${encodeURIComponent(
            JSON.stringify(location)
          )})`,
          backgroundSize: "cover",
          minHeight: "120px",
          backgroundPosition: "center",
          width: "100%",
          borderRadius: "12px",
          position: "relative",
          animate$fadeIn: {
            args:
              edges.includes("bottom") && rand <= 0.5
                ? ["fromBottom"]
                : rand <= 0.5
                  ? ["fromLeft"]
                  : ["fromRight"],
            duration: "1s",
            delay: "150ms"
          }
        })}
      >
        <div
          style={{
            background: $.dark,
            color: $.white,
            borderRadius: "4px",
            position: "absolute",
            top: 8,
            left: 8,
            padding: "4px 8px",
            fontSize: "0.8em",
            fontWeight: 800
          }}
        >
          {organization.name}'s Spending Town
        </div>

        <div
          style={{
            color: $.darkless,
            borderRadius: "4px",
            position: "absolute",
            bottom: 2,
            left: 8,
            fontSize: "0.8em",
            textTransform: "uppercase",
            color: $.muted,
            fontStyle: "italic",
            textShadow: "0 0 4px rgba(255,255,255,0.75)"
          }}
        >
          {location.reverse()[0]}
        </div>
      </div>
    )
  ];

  const shuffledGridFunctions = deterministicShuffle(
    organization.name,
    gridItems
  );
  const shuffledGridItems = gridItems.map((item, i) => {
    const edges = [];
    if (i == 0) edges.push("top");
    if (i == shuffledGridFunctions.length - 1) edges.push("bottom");
    return item(edges, deterministicShuffle((i * 73) + "", [0, 1])[0], i);
  });

  return (
      <div ref={wrapperRef}
        {...$({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "black",
          textAlign: "center",
          gap: 10,
          width: "100%"
        })}
      >
        <h1
          {...$.title({
            width: "100%",
            color: "white",
            marginBottom: $.s2,
            animate$fadeIn: {
              args:
                position == 0
                  ? ["fromLeft"]
                  : position == 1
                    ? ["fromTop"]
                    : ["fromRight"],
              duration: "1000ms"
            }
          })}
        >
          {organization.name}
        </h1>
        {shuffledGridItems}
        <Background />
      </div>
  );
}
