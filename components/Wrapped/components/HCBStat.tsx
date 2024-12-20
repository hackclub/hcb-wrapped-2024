import $, { StyleProps } from "../utils/theme";
import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";

export default function HCBStat({
  data,
  topLabel,
  label,
  background,
  isNumber = false,
  fontSize = "",
  prefix = "",
  style$,
  dataStyle = {},
  lineClamp,
  setHeight,
  labelStyle = {}
}: {
  data: string | number;
  label?: string;
  topLabel?: string;
  background?: string;
  isNumber?: boolean;
  fontSize?: string;
  prefix?: string;
  style$?: StyleProps;
  dataStyle?: StyleProps;
  lineClamp?: number;
  setHeight?: (height: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (setHeight) {
      setHeight(ref.current?.clientHeight || 0);
    }
  }, [ref.current?.clientHeight]);;
  return (
    <div
      ref={ref}
      {...$({
        background: background || $.sunken,
        borderRadius: "12px",
        padding: `${$.s3} ${$.s4}`,
        textTransform: "uppercase",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        ...(style$ ? style$ : {})
      })}
    >
      {topLabel && (
        <div {...$({ display: "flex", alignItems: "center", gap: "4px" })}>
          <b
            {...$({
              fontSize: "0.9em",
              fontWeight: 500
            })}
          >
            {topLabel}
          </b>
        </div>
      )}
      {isNumber ? (
        <CountUp
          end={Number(data.toString().replace("$", "").replace(",", ""))}
          duration={1.5}
          {...$.title({ fontWeight: 800 })}
          prefix={prefix}
        />
      ) : (
        <h2
          {...$.title({
            fontWeight: 800,
            fontSize,
            overflowWrap: "anywhere",
            ...dataStyle,
            ...(lineClamp ? { 
              
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: lineClamp,
                lineClamp: lineClamp,
                WebkitBoxOrient: "vertical",
             } : {})
          })}
        >
          {data}
        </h2>
      )}
      {label && (
        <div {...$({ display: "flex", alignItems: "center", gap: "4px" })}>
          <b
            {...$({
              fontSize: "0.9em",
              fontWeight: 500,
              ...labelStyle
            })}
          >
            {label}
          </b>
        </div>
      )}
    </div>
  );
}
