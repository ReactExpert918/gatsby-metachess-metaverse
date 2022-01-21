import React, { useState } from "react";
import { TREASURE_QUEST_MODES } from "../../constants/playModes";
import dropdownIcon from "../../assets/images/dropdown.svg";
import UsersRankingTable from "../../components/UserRankingTable";

interface IProps {
  setTreasureMode: (mode: TREASURE_QUEST_MODES) => void;
  goBack: () => void;
}

const index = (props: IProps) => {
  const [playerByRating, setPlayerByRating] = useState<string>(
    "Player Ranking By Rating"
  );
  const [mostActiveUser, setMostActiveUsers] =
    useState<string>("Most Active Users");
  const [openRating, setOpenRating] = useState<boolean>(false);
  const [openActive, setOpenActive] = useState<boolean>(false);
  const handleDropDownClick = (type: number): void => {
    if (type === 1) setOpenActive(!openActive);
    if (type === 2) setOpenRating(!openRating);
  };
  const handleClickOption = (e: any, type: number): void => {
    if (type === 1) setMostActiveUsers(e.target.innerText);
    if (type === 2) setPlayerByRating(e.target.innerText);
  };
  return (
    <div className={"chooseTreasureQuestModeSection globalRankingsSection"}>
      <div className={"headerWrapper"} style={{ marginBottom: "4vmin" }}>
        <p className="header-heading">Global Rankings</p>
      </div>
      <div className="filterWrapper">
        <div className="dropdown-menu" onClick={() => handleDropDownClick(1)}>
          <p className="filterText">{mostActiveUser}</p>
          {openActive && (
            <div className="dropDownOptions">
              <p
                className="filterText"
                onClick={(e) => handleClickOption(e, 1)}
              >
                <span className="bullet"></span> Quick Pairing
              </p>
              <p
                className="filterText"
                onClick={(e) => handleClickOption(e, 1)}
              >
                <span className="bullet"></span> Games With AI
              </p>
            </div>
          )}
          <img src={dropdownIcon} alt="dropdown" />
        </div>
        <div className="dropdown-menu" onClick={() => handleDropDownClick(2)}>
          <p className="filterText">{playerByRating}</p>
          {openRating && (
            <div className="dropDownOptions">
              <p
                className="filterText"
                onClick={(e) => handleClickOption(e, 2)}
              >
                <span className="bullet"></span>Bullet
              </p>
              <p
                className="filterText"
                onClick={(e) => handleClickOption(e, 2)}
              >
                <span className="bullet"></span>Blitz
              </p>
              <p
                className="filterText"
                onClick={(e) => handleClickOption(e, 2)}
              >
                <span className="bullet"></span>Rapid
              </p>
              <p
                className="filterText"
                onClick={(e) => handleClickOption(e, 2)}
              >
                <span className="bullet"></span>Classical
              </p>
            </div>
          )}
          <img src={dropdownIcon} alt="dropdown" />
        </div>
      </div>
      {/* <div> */}
      <div className="menubuttons">
        <button className="colored">
          QUICK PAIRING STATS <br />
          <span className="timingRanking">(weekly ranking)</span>
        </button>
        <button className="outlined">
          QUICK PAIRING STATS <br />
          <span className="timingRanking">(monthly ranking)</span>
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
