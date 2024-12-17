import shuffle from "fast-shuffle";
import React from "react";
import $ from "./utils/theme";
import HCB from "./slides/HCB";
import HCBTopMerchants from "./slides/HCBTopMerchants";
import OrgIntro from "./slides/OrgIntro";
import OrgDetails from "./slides/OrgDetails";
import ByDate from "./slides/ByDate";
import PlatinumCardSlide from "./slides/PlatinumCardSlide";
import Start from "./slides/Start";
import Spender from "./slides/Spender";
import WordCloud from "./slides/WordCloud";
import Receipts from "./slides/Receipts";
import Hometown from "./slides/HomeTown";
import Ending from "./slides/Ending";
import HCBSection from "./slides/HCBSection";
import type { WrappedData, OrgData } from "./utils/data";
import type { SlideProps, SlideOptions } from "./internals/slidesHelper";
import CardGrants from "./slides/CardGrants";
import Reimbursements from "./slides/Reimbursements";

function deterministicShuffle(seed: string, array: any[]) {
  let intSeed = 0;
  for (let i = 0; i < seed.length; i++) {
    intSeed += seed.charCodeAt(i);
  }

  const shuffler = shuffle(intSeed);
  return shuffler(array);
}

export const isEmpty = (obj: Object) => Object.keys(obj).length === 0;
export const isNotEmpty = (obj: Object) => !isEmpty(obj);

export function generateSlidesOrder(data: WrappedData) {
  let orgSlides: any[] = [];
  if (
    Object.keys(data.organizations)
      .filter((org) => data.organizations[org].spent > 0)
      .filter(
        (org) => data.organizations[org].spendingByUser[data.individual.id]
      ).length > 0
  ) {
    orgSlides.push(OrgIntro);
    Object.keys(data.organizations)
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
      })
      .sort(
        (a, b) =>
          data.organizations[b].spendingByUser[data.individual.id] -
          data.organizations[a].spendingByUser[data.individual.id]
      )
      .slice(0, 3)
      .map((org, index) => {
        function OrgSlide({ data }: SlideProps) {
          return (
            <OrgDetails
              data={data}
              position={index}
              organization={{ name: org, ...data.organizations[org] }}
            />
          );
        }
        const color = deterministicShuffle(org, [$.blue, $.red, $.green, $.purple])[0];
        OrgSlide.config = {
          bgPattern: `linear-gradient(130deg, ${color}11 40%, ${color}33 70%, ${color}bb 100%)`,
          duration: 10000,
          cache: (data) => [getOrgImage(data.organizations[org])]
        } satisfies SlideOptions;
        orgSlides.push(OrgSlide);
      });
  }

  function getOrgImage(data: OrgData) {
    let location = Object.keys(
      Object.entries(data.spendingByLocation)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    )[0].split(" - ");
    return `https://wrapped-maps.hackclub.dev/api/maps?location=${encodeURIComponent(
      JSON.stringify(location)
    )}`;
  }

  return [
    Start,
    Spender,
    ByDate,
    CardGrants,
    Receipts,
    Reimbursements,
    WordCloud,
    Hometown,
    ...orgSlides,
    HCBSection,
    HCBTopMerchants,
    HCB,
    Ending
  ];
}
