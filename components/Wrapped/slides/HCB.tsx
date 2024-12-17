import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";
import React from "react";

export default function HCB({ data }: SlideProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingBottom: "30px"
        }}
      >
        <h1
          {...$.headline({ fontSize: "2em", marginTop: "0px", color: "white" })}
        >
          That's a wrap!
        </h1>
        <div
          {...$({
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
            width: "100%"
          })}
        >
          <HCBStat
            data={Math.abs(data.hcb.spent / 100)}
            label="spent by organizations"
            background={$.green}
            isNumber
            prefix="$"
          />
          <HCBStat
            data={Math.abs(data.hcb.raised / 100)}
            label="raised on HCB"
            background={$.orange}
            isNumber
            prefix="$"
          />
          <div style={{ position: "relative" }}>
            <img
              src="https://cloud-q1u33t4vk-hack-club-bot.vercel.app/0amount.png"
              style={{ borderRadius: "12px" }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                textTransform: "uppercase",
                color: $.muted,
                fontStyle: "italic"
              }}
            >
              Popular spending locations
            </span>
          </div>
          <div
            {...$({
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              width: "100%"
            })}
          >
            <HCBStat
              data={data.hcb.organizations.new}
              label="new organizations"
              background={$.yellow}
              isNumber
            />
            <HCBStat
              data={data.hcb.users.new}
              label="new users"
              background={$.cyan}
              isNumber
            />
          </div>
        </div>
        <div
          {...$({
            margin: `${$.s3} auto`,
            marginBottom: "0px",
            fontSize: "0.9em",
            width: "80%",
            color: "white",
            textAlign: "center"
          })}
        >
          These stats omit Hack Club HQ's spending and fundraising.
        </div>
        <Background />
      </div>
    </>
  );
}

HCB.config = {
  bgImage: `linear-gradient(rgba(37,36,41,0.5) 0%, rgba(37,36,41,0.85) 75%), url(https://cloud-m82c27qbt-hack-club-bot.vercel.app/0img_4077.jpg)`,
  cache: (data) => [
    "https://cloud-q1u33t4vk-hack-club-bot.vercel.app/0amount.png",
    "https://cloud-e4hjosvw9-hack-club-bot.vercel.app/2outernet-110.jpeg"
  ],
  duration: 15_000
} satisfies SlideOptions;
