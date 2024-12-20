import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import React from "react";

export function formatDuration(seconds: number) {
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  if (seconds < minute) {
    return seconds + (seconds === 1 ? " second" : " seconds");
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return minutes + (minutes === 1 ? " minute" : " minutes");
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    const hoursStr = hours + (hours === 1 ? " hour" : " hours");
    return hoursStr;
  } else {
    const days = Math.floor(seconds / day);
    const daysStr = days + (days === 1 ? " day" : " days");
    return daysStr;
  }
}

export default function Receipts({ data }: SlideProps) {
  const uploadTime = data.individual.averageReceiptUploadTime || 0;
  const prettyLostReceiptCount =
    data.individual.lostReceiptCount == 0
      ? "none"
      : data.individual.lostReceiptCount;
  const naughty = uploadTime > 604800 || data.individual.lostReceiptCount > 50;
  return (
    <div
      {...$({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100%",
        paddingBottom: "80px",
        color: "white",
        textAlign: "left",

      })}
    >
      <h2 {...$.title({ marginBottom: $.s3 })}>🧾</h2>
      <h1
        {...$.title({ marginBottom: $.s4, fontSize: "2.8em", color: "white", fontWeight: 500 })}
      >
        Receipts are important; you've got{" "}
        <strong
          style={{
            color: naughty ? "#fcbec5" : "#095465",
            fontWeight: 700,
            whiteSpace: "nowrap"
          }}
        >
          {prettyLostReceiptCount} missing
        </strong>{" "}
        {uploadTime == 0 ? null : (
          <>
            {prettyLostReceiptCount == "none" && naughty ? "but" : "and"} take on average{" "}
            <strong
              style={{
                color: naughty ? "#fcbec5" : "#095465",
                fontWeight: 700,
                whiteSpace: "nowrap"
              }}
            >
              {formatDuration(data.individual.averageReceiptUploadTime)}
            </strong>{" "}
            to upload them.
          </>
        )}
      </h1>
      <h2
        {...$.headline({
          marginTop: $.s3,
          color: "white",
          animate$fadeIn: {
            args: ["fromLeft"],
            delay: "0.1s"
          }
        })}
      >
        <i>You're on the {naughty ? "naughty" : "nice"} list!</i>
      </h2>
      <Background />
    </div>
  );
}

Receipts.config = {
  conditionalBg: (data) =>
    data.individual.averageReceiptUploadTime > 604800 ||
    data.individual.lostReceiptCount > 50
      ? $.red
      : $.green,
  duration: 10_000
} satisfies SlideOptions;
