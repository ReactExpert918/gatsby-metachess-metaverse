import React, { useState } from "react";
import SmallArrowLeft from "../../assets/images/small-arrow-left.png";
import SmallArrowRight from "../../assets/images/small-arrow-right.png";

interface Props {
  onClickNext: (date: Date) => void;
  onClickPrev: (date: Date) => void;
  title: string;
}

const ProfileDateRange = ({ onClickNext, onClickPrev, title }: Props) => {
  return (
    <div className="dateRangeWrapper">
      <p className="leftIcon"> {"<"}</p>
      <p className="title">{title}</p>
      <p className="leftIcon"> {">"}</p>
      <div
        className="invisibleButton left"
        onClick={() => onClickPrev(new Date())}
      />
      <div
        className="invisibleButton right"
        onClick={() => onClickNext(new Date())}
      />
    </div>
  );
};

export default ProfileDateRange;
