import React from "react";
import CircleProgressBarBase from "../CirclePercentage";

interface Props {
  wins: number;
  loses: number;
}

const WinRatio = ({ wins, loses }: Props) => {
  const ratio = wins + loses !== 0 ? wins / (wins + loses) : 0;
  const symbols = [
    {
      title: "Wins",
      count: wins,
      color: "#CCA66A",
    },
    {
      title: "Loses",
      count: loses,
      color: "rgba(255, 255, 255, 0.27)",
    },
  ];
  return (
    <div className="winRatioWrapper">
      <div className="circleWrapper summaryCircleProgress">
        <CircleProgressBarBase
          className={"summaryCircleProgress"}
          percentage={ratio * 100}
          trailStrokeColor={"rgba(255, 255, 255, 0.27)"}
          strokeColor={"#CCA66A"}
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
              <p className="title" style={{ color: symbol.color }}>
                {symbol.title}
              </p>
            </div>
            <div className="titleWrapper">
              <p className="count" style={{ color: symbol.color }}>
                {symbol.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinRatio;
