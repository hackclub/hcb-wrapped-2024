import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import HCBStat from "../components/HCBStat";
import CountUp from "react-countup";
import { prettifyCategory } from "./HCBTopMerchants";
import React from "react";
import { isEmpty } from "../slides";

export default function CardGrants({ data }: SlideProps) {
  const roundTo2 = (decimal: number) =>
    Math.round((decimal + Number.EPSILON) * 100 * 100) / 100;
  const percentile = roundTo2(1 - data.individual.ranking);
  const ranking = roundTo2(data.individual.ranking);

  return (
    <>
      <h2 {...$.title({ marginBottom: $.s4, marginTop: $.s5 })}>💰</h2>
      <h1 {...$.title({ fontSize: "2.6em", color: $.white })}>
        Hack Club granted you{' '}
        <span {...$({ color: "#ffffffbb" })}>$
        <CountUp end={Math.abs(data.individual.cardGrantAmount / 100)} />
        </span>{' '}this
        year.
      </h1> 
      <h2 {...$.headline({ marginBottom: $.s4, fontStyle: "italic", color: $.white, marginTop: $.s4 })}>You were issued <CountUp end={data.individual.cardGrantCount} /> grant cards!</h2>

      <Background />
    </>
  );
}

CardGrants.config = {
bgImage: `url("https://cloud-3d7o2aqrb-hack-club-bot.vercel.app/0frame_1__15_.svg")`,
  duration: 10_000,
  skipSlide: (data) =>
    data.individual.cardGrantAmount == 0
} satisfies SlideOptions;
