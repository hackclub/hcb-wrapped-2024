import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import React from "react";
import { isNotEmpty } from "../slides";

export default function OrgIntro({ data }: SlideProps) {
  const orgCount = Object.keys(data.organizations)
    .filter((org) => data.organizations[org].spent > 0)
    .filter((org) => {
      const orgData = data.organizations[org];
      return (
        orgData.spendingByUser[data.individual.id] &&
        isNotEmpty(orgData.spendingByCategory) &&
        isNotEmpty(orgData.spendingByDate) &&
        isNotEmpty(orgData.spendingByLocation) &&
        isNotEmpty(orgData.spendingByMerchant)
      );
    }).length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        paddingBottom: "80px",
        color: "white",
        textAlign: "center"
      }}
    >
      <h1 {...$.title({ animate$spinIn: [] })}>
        {orgCount > 3 ? (
          <>
            This year, you've been working on a lot of projects,{" "}
            {Object.keys(data.organizations).length} to be exact.
          </>
        ) : (
          <>You've been busy on HCB this year.</>
        )}
      </h1>
      <h2
        {...$.headline({
          marginBottom: $.s3,
          marginTop: $.s3,
          fontWeight: 400,
          width: "80%",
          animate$fadeIn: {
            duration: "4s"
          }
        })}
      >
        {orgCount > 3
          ? "Let's take a look back at the three that meant the most."
          : `Let's take a look back at the project${
              orgCount == 1 ? "" : "s"
            } you worked on.`}
      </h2>

      <Background />
    </div>
  );
}

OrgIntro.config = {
  bg: $.purple,
  duration: 8_000
} satisfies SlideOptions;
