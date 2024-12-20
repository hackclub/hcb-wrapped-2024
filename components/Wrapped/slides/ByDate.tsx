import React from "react";
import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import HCBStat from "../components/HCBStat";
import CountUp from "react-countup";
import { prettifyCategory } from "./HCBTopMerchants";
const longestConsecutiveDates = (dates) => Math.max(...dates.sort((a, b) => new Date(a) - new Date(b)).reduce((acc, curr, i, arr) => (i > 0 && new Date(curr) - new Date(arr[i - 1]) === 86400000 ? acc[acc.length - 1]++ : acc.push(1), acc), []));

const shape = [
  {
    month: "January",
    start: 6,
    length: 31
  },
  {
    month: "February",
    start: 2,
    length: 28
  },
  {
    month: "March",
    start: 2,
    length: 31
  },
  {
    month: "April",
    start: 5,
    length: 30
  },
  {
    month: "May",
    start: 0,
    length: 31
  },
  {
    month: "June",
    start: 3,
    length: 30
  },
  {
    month: "July",
    start: 5,
    length: 31
  },
  {
    month: "August",
    start: 1,
    length: 31
  },
  {
    month: "September",
    start: 4,
    length: 30
  },
  {
    month: "October",
    start: 6,
    length: 31
  },
  {
    month: "November",
    start: 2,
    length: 30
  },
  {
    month: "December",
    start: 4,
    length: 31
  }
];

export function Content({
  data,
  onePager = false
}: SlideProps & { onePager?: boolean }) {
  const changeByDate = Object.entries(data.individual.spendingByDate);
  const max = Math.max(...Object.values(data.individual.spendingByDate));
  const maxDate = new Date(
    changeByDate.find(([_, v]) => v === max)?.[0] as string
  );
  return (
    <>
      <div
        style={{
          color: $.white,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "12px"
        }}
      >
        {shape.map((month, i) => {
          const passed = shape
            .slice(0, i)
            .map((x) => x.length)
            .reduce((a, b) => a + b, 0);
          return (
            <div key={month.month}>
              <b style={{ marginBottom: "8px", color: $.smoke }}>{month.month}</b>
              <div className="grid-container mb3">
                {[...Array(month.start)].map((_, buffer) => (
                  <div
                    key={`${month.month}-${buffer}-buffer`}
                    className="grid-item"
                  ></div>
                ))}
                {[...Array(month.length)].map((_, x) => {
                  const entry = changeByDate[passed + x][1];
                  const label = changeByDate[passed + x][0];
                  const bg = `rgba(255, 73, 98, ${
                    Math.log(entry) / Math.log(max)
                  })`;
                  return (
                    <>
                      {entry > 0 ? (
                        <div
                          key={`${month.month}-${x}`}
                          className="grid-item"
                          title={label}
                          style={{ backgroundColor: bg }}
                        />
                      ) : (
                        <div
                          key={`${month.month}-${x}`}
                          className="grid-item"
                          title={label}
                        ></div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {!onePager && (
        <p style={{ color: $.white }}>
          Your spending on{" "}
          {maxDate.toLocaleDateString("en-us", {
            day: "numeric",
            month: "long"
          })}{" "}
          skyrocketed to {USDollarNoCents.format(max / 100)}
        </p>
      )}
    </>
  );
}

export default function ByDate({ data }: SlideProps) {
  return (
    <div
      {...$({
        animate$fadeIn: {
          duration: "2s"
        }
      })}
    >
      <h1
        {...$.title({
          marginBottom: $.s4,
          marginTop: "-32px",
          fontSize: "2.8em",
          fontWeight: 500,
          color: $.white
        })}
      >
        You went on a shopping spree with a <strong {...$({ color: $.blue })}>{longestConsecutiveDates(Object.entries(data.individual.spendingByDate).filter(([k, v]) => v > 0).map(([k]) => k))} day</strong> spending streak!
      </h1>
      <Content data={data} />
      <Background />
    </div>
  );
}

ByDate.config = {
  bg: $.black,
  duration: 10_000,
  skipSlide: (data) =>
    Math.max(...Object.values(data.individual.spendingByDate)) === 0
} satisfies SlideOptions;
