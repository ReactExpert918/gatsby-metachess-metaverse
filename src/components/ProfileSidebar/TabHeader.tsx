import React from "react";
import AchivementTab from "../../assets/images/achivement-tab.png";
import ProfileTab from "../../assets/images/profile-tab.png";
import StarTab from "../../assets/images/star-tab.png";
export type ProfileTab = "star" | "achivement" | "profile";

const tabs: ProfileTab[] = ["star", "achivement", "profile"];

interface Props {
  onSelect: (tab: ProfileTab) => void;
  selected: ProfileTab;
}

const TabHeader = ({ onSelect, selected }: Props) => {
  return (
    <div className="tabWrapper">
      {tabs.map((tab, index) => (
        <div className="singleTab" onClick={() => onSelect(tab)} key={index}>
          <img
            src={
              (tab === "star" && StarTab) ||
              (tab === "achivement" && AchivementTab) ||
              (tab === "profile" && ProfileTab)
            }
          />
          {selected === tab && <div className="activeTabIndicator" />}
        </div>
      ))}
    </div>
  );
};

export default TabHeader;
