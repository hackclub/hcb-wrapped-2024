import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import HCBStat from "../components/HCBStat";
import CountUp from "react-countup";
import { prettifyCategory } from "./HCBTopMerchants";
import React from "react";
import { isEmpty } from "../slides";

export default function Spender({ data }: SlideProps) {
  const roundTo2 = (decimal: number) =>
    Math.round((decimal + Number.EPSILON) * 100 * 100) / 100;
  const percentile = roundTo2(1 - data.individual.ranking);
  const ranking = roundTo2(data.individual.ranking);

  return (
    <>
      <h2 {...$.title({ marginBottom: $.s3, marginTop: "-20px" })}>💳</h2>
      <h1 {...$.title({ marginBottom: $.s4, fontSize: "2.6em", color: $.white })}>
        Look at you big spender! You spent{' '}
        <span {...$({ color: "#fcbec5" })}>$
        <CountUp end={Math.abs(data.individual.totalMoneySpent / 100)} />
        </span>{' '}this
        year.
      </h1>

      <div {...$({ display: "flex", gap: 10, flexDirection: "column" })}>
        <HCBStat
          topLabel={`You spent ${USDollarNoCents.format(
            Math.abs(
              (Object.values(
                Object.entries(data.individual.spendingByMerchant)
                  .sort(([, a], [, b]) => b - a)
                  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
              )[0] as number) / 100
            )
          )} at`}
          data={
            Object.keys(
              Object.entries(data.individual.spendingByMerchant)
                .sort(([, a], [, b]) => b - a)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
            )[0]
          }
          label="They were your top merchant this year"
          background={$.green}
          style$={{
            animate$fadeIn: {
              args: ["fromBottom"]
            },
            color: "#000000bb"
          }}
          dataStyle={{
            fontSize: "42px",
            marginTop: "3px",
            marginBottom: "3px"
          }}
        />
        <HCBStat
          topLabel="Your favorite type of business were"
          data={prettifyCategory(
            Object.keys(
              Object.entries(data.individual.spendingByCategory)
                .sort(([, a], [, b]) => b - a)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
            )[0]
          )}
          label={`You spent ${USDollarNoCents.format(
            Math.abs(
              (Object.values(
                Object.entries(data.individual.spendingByCategory)
                  .sort(([, a], [, b]) => b - a)
                  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
              )[0] as number) / 100
            )
          )} with them.`}
          background={$.purple}
          style$={{
            animate$fadeIn: {
              args: ["fromBottom"],
              delay: "150ms"
            },
            color: "#ffffffcc"
          }}
          dataStyle={{
            fontSize: "38px",
            marginTop: "3px",
            marginBottom: "3px"
          }}
        />
        {data.individual.ranking <= 0.07 ? ( // Top 7% of spenders
          <HCBStat
            topLabel="Congrats! You're one of the top"
            data={ranking + "%"}
            label="of spenders!"
            background={$.cyan}
            style$={{
              animate$fadeIn: {
                args: ["fromBottom"],
                delay: "300ms"
              },
              color: "#000000bb"
            }}
          />
        ) : (
          <HCBStat
            topLabel="You spent more than"
            data={percentile + "%"}
            label="of other HCB users!"
            background={$.cyan}
            style$={{
              animate$fadeIn: {
                args: ["fromBottom"],
                delay: "300ms"
              },
              color: "#000000bb"
            }}
          />
        )}
      </div>
      <Background />
    </>
  );
}

Spender.config = {
  bg: $.primary,
  duration: 10_000,
  skipSlide: (data) =>
    isEmpty(data.individual.spendingByMerchant) ||
    isEmpty(data.individual.spendingByCategory)
} satisfies SlideOptions;
