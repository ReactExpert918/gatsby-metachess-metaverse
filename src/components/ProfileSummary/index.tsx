import React from "react";
import WinRatio from "./WinRatio";

const ProfileSummary = () => {
  return (
    <div className="profileSummaryContainer shadowContainer">
      <div className="innerContent">
        <p className="sectionTitle">Summary</p>
        <WinRatio wins={12} loses={12} />
      </div>
    </div>
  );
};

export default ProfileSummary;
