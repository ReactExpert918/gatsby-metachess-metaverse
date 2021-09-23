import React from "react";
import CircleProgressBarBase from "../CirclePercentage";

interface Props {
  wins: number;
  loses: number;
}

const WinRatio = ({ wins, loses }: Props) => {
  const ratio = wins / (wins + loses);
  const symbols = [
    {
      title: "Wins",
      count: wins,
      color: "#E84343",
    },
    {
      title: "Loses",
      count: loses,
      color: "#297BFB",
    },
  ];
  return (
    <div className="winRatioWrapper">
      <div className="circleWrapper summaryCircleProgress">
        <CircleProgressBarBase
          className={"summaryCircleProgress"}
          percentage={ratio * 100}
          trailStrokeColor={"#E84343"}
          strokeColor={"#297BFB"}
        />
        <div className="circleContent">
          <p className="circleTitle">{ratio * 100}%</p>
          <p className="circleSubtitle">Winratio</p>
        </div>
      </div>
      <div className="symbols">
        {symbols.map((symbol) => (
          <div className="symbolWrapper">
            <div className="titleWrapper">
              <div
                className="indicator"
                style={{ backgroundColor: symbol.color }}
              />
              <p className="title">{symbol.title}</p>
            </div>
            <div className="titleWrapper">
              <div className="indicator" />
              <p className="count">{symbol.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinRatio;
