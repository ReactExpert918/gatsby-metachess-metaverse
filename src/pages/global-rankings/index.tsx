import React from "react";
import { TREASURE_QUEST_MODES } from "../../constants/playModes";
import dropdownIcon from "../../assets/images/dropdown.svg";
import UsersRankingTable from "../../components/UserRankingTable";

interface IProps {
  setTreasureMode: (mode: TREASURE_QUEST_MODES) => void;
  goBack: () => void;
}

const index = (props: IProps) => {
  return (
    <div className={"chooseTreasureQuestModeSection globalRankingsSection"}>
      <div className={"headerWrapper"} style={{ marginBottom: "4vmin" }}>
        <p className="header-heading">Global Rankings</p>
      </div>
      <div className="filterWrapper">
        <div className="dropdown-menu">
          <p className="filterText">Most Active Users</p>
          <img src={dropdownIcon} alt="dropdown" />
        </div>
        <div className="dropdown-menu">
          <p className="filterText">Player Ranking By Rating</p>
          <img src={dropdownIcon} alt="dropdown" />
        </div>
      </div>
      {/* <div> */}
      <div className="menubuttons">
        <button className="colored">
          QUICK PAIRING STATS <br />
          <span className="timingRanking">(weekly rankimy)</span>
        </button>
        <button className="outlined">
          QUICK PAIRING STATS <br />
          <span className="timingRanking">(monthly rankimy)</span>
        </button>
        <button className="outlined">
          QUICK PAIRING STATS <br />
          <span className="timingRanking">(all time)</span>
        </button>
      </div>
      <UsersRankingTable />
    </div>
    // </div>
  );
};

export default index;
