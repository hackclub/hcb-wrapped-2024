import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import CountUp from "react-countup";
import React from "react";
import { isEmpty } from "../slides";
import Snowfall from "react-snowfall";
import { useTimedValue } from "./Start";

export default function BestFriend({ data, isPaused }: SlideProps) {
  if(!data.individual.bestFriend) {
    return <></>
  }

  const snowflake1 = document.createElement("img");
  snowflake1.src = data.individual.bestFriend.profile_picture; // @ts-ignore
  snowflake1.style.cssText = "border-radius: 999px";
  const images = [snowflake1];

  const snowflakeSpeed = useTimedValue(
    (x) => Math.round((1.6 ** (x / 1000) / 550 + 3) * 100) / 100,
    0 as number,
    50,
    !!isPaused
  );

  return (
    <>
      <h2 {...$.title({ marginBottom: $.s4, marginTop: $.s6, textAlign: 'center' })}>💬</h2>
      <h1 {...$.title({ fontSize: "2.6em", color: $.white, textAlign: 'center' })}>
        Your HCB best friend was {data.individual.bestFriend.name} this year.
      </h1>
      <h2 {...$.headline({ marginBottom: $.s4, fontStyle: "italic", color: $.white, marginTop: $.s4, textAlign: 'center' })}>
        You commented on each other's transactions <CountUp end={data.individual.bestFriend.comments} /> times.
      </h2>
      <Background />
      <Snowfall
        images={images}
        speed={[snowflakeSpeed - 0.5, snowflakeSpeed + 0.5]}
        radius={[30, 80]}
        snowflakeCount={75}
        style={{
          animationPlayState: "paused",
          opacity: 1
        }}
      />
    </>
  );
}

BestFriend.config = {
  bgImage: `linear-gradient(rgba(51, 142, 218) 0%, rgba(38, 102, 154) 75%)`,
  cache: () => ["https://cloud-lsz94pth8-hack-club-bot.vercel.app/0frame_2.svg"],
  duration: 10_000,
  skipSlide: (data) => data.individual.bestFriend == null
} satisfies SlideOptions;
