import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import HCBStat from "../components/HCBStat";
import CountUp from "react-countup";
import React from "react";
import { isEmpty } from "../slides";

export default function Hometown({ data }: SlideProps) {
  let location = Object.keys(
    Object.entries(data.individual.spendingByLocation)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
  )[0].split(" - ");
  let location2, location3;
  try {
    location2 = Object.keys(
      Object.entries(data.individual.spendingByLocation)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    )[1].split(" - ");
    location3 = Object.keys(
      Object.entries(data.individual.spendingByLocation)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    )[2].split(" - ");
  } catch (err) {
    console.error("Location 2 or 3 not found", err);
  }
  return (
    <div
      {...$({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        height: "100%",
        paddingBottom: "80px",
        color: "white",
        textAlign: "left"
      })}
    >
      <div>
        <h2
          {...$.title({
            marginBottom: $.s3,
            animate$fadeIn: {
              args: ["fromTop"],
              duration: "1.5s"
            }
          })}
        >
          🗺️
        </h2>
        <h1
          {...$.title({
            fontSize: "2.6em",
            marginBottom: $.s4,
            animate$fadeIn: {
              args: ["fromLeft"],
              duration: "1.5s"
            },
            fontWeight: 450
          })}
        >
          Your biggest spending town was <strong>{location.toReversed()[0]}, {location.toReversed()[1]}</strong>, where you spent over{" "}
          <strong>{USDollarNoCents.format(
            Math.abs(
              (Object.values(
                Object.entries(data.individual.spendingByLocation)
                  .sort(([, a], [, b]) => b - a)
                  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
              )[0] as number) / 100
            )
          )}</strong>.
        </h1>
      </div>
      {location2 && location3 ? <h1 {...$({ fontWeight: 400, animate$fadeIn: {
              args: ["fromBottom"],
              duration: "1.5s"
            } })}>Runners up include <strong>{location2.toReversed()[0]}, {location2.toReversed()[1]}</strong> and <strong>{location3.toReversed()[0]}, {location3.toReversed()[1]}</strong>.</h1> : null}
      <Background />
    </div>
  );
}

Hometown.config = {
  duration: 8_000,
  conditionalBgImage: (data) => {
    let location = Object.keys(
      Object.entries(data.individual.spendingByLocation)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    )[0].split(" - ");
    return `linear-gradient(rgba(37,36,41,0.5) 0%, rgba(37,36,41,0.85) 75%), url(https://wrapped-maps.hackclub.dev/api/mega-maps?location=${encodeURIComponent(
      JSON.stringify(location)
    )})`;
  },
  cache: (data) => {
    let location = Object.keys(
      Object.entries(data.individual.spendingByLocation)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    )[0].split(" - ");
    return [
      `https://wrapped-maps.hackclub.dev/api/mega-maps?location=${encodeURIComponent(
        JSON.stringify(location)
      )}`
    ];
  },
  skipSlide: (data) =>
    isEmpty(data.individual.spendingByLocation) ||
    Math.abs(
      (Object.values(
        Object.entries(data.individual.spendingByLocation)
          .sort(([, a], [, b]) => b - a)
          .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
      )[0] as number) / 100
    ) < 200
} satisfies SlideOptions;
