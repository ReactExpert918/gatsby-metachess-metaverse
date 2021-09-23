import React from "react";

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: "0 0 38 38",
  x: "19",
  y: "19",
  radio: "15.91549430918954",
};

interface Props {
  className?: string;
  trailStrokeColor?: string;
  strokeColor?: string;
  percentage: number;
  children?: JSX.Element;
}

const CircleProgressBarBase = ({
  className,
  trailStrokeColor = "#E84343",
  strokeColor = "#297BFB",
  percentage,
  children,
}: Props) => {
  return (
    <figure className={`circlePercentageWrapper ${className}`}>
      <svg viewBox={circleConfig.viewBox}>
        <circle
          className="ring"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={trailStrokeColor}
        />

        <circle
          className="path"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={strokeColor}
          strokeDasharray={`${percentage} ${100 - percentage}`}
          strokeDashoffset={INITIAL_OFFSET}
        />
      </svg>
    </figure>
  );
};

export default CircleProgressBarBase;
