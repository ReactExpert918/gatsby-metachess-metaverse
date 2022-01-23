import React from "react";
// import { IUserListItem } from ".";
import { IAppState } from "../../store/reducers";
import { connect } from "react-redux";
import { IUser } from "../../store/user/user.interfaces";
import dummyUser from "../../assets/images/user.png";
import {
  GameType,
  GameMode,
  PieceSide,
} from "../../interfaces/game.interfaces";
import { IGameItem } from "../../store/games/games.interfaces";
import { getOpponentName } from "../../helpers/getOpponentNameByPlayMode";
import {
  canPlayGame,
  getGameTypeElo,
  getGameTypeName,
} from "../../helpers/gameTypeHelper";
import { SVG_ASSETS } from "../../constants/svgAssets";

const UserListTableItem = ({
  option,
  type,
}: {
  option: string;
  type: string;
}) => {
  if (type[0] === "M") {
    return (
      <tr>
        <td className="tableRankItemTextWrapper">1</td>
        <td
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2vmax",
          }}
        >
          <img src={dummyUser} alt="userDP" />
          <p className="tableRankItemTextWrapper" style={{ width: "100%" }}>
            Akumasy
          </p>
        </td>
        <td className="tableRankItemTextWrapper">88</td>
        <td className="tableRankItemTextWrapper">1670</td>
        {option === "G" && <td className="tableRankItemTextWrapper">50%</td>}
        {option !== "G" && (
          <>
            <td className="tableRankItemTextWrapper">
              6000 <span className="claimText">Claim</span>
            </td>
            <td className="tableRankItemTextWrapper">0x689 --- 36789</td>
          </>
        )}
      </tr>
    );
  } else {
    return (
      <tr>
        <td className="tableRankItemTextWrapper">1</td>
        <td
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2vmax",
          }}
        >
          <img src={dummyUser} alt="userDP" />
          <p className="tableRankItemTextWrapper" style={{ width: "100%" }}>
            Akumasy
          </p>
        </td>
        <td className="tableRankItemTextWrapper">88</td>
        <td className="tableRankItemTextWrapper">1670</td>
        <td className="tableRankItemTextWrapper">50%</td>
      </tr>
    );
  }
  return (
    <tr>
      <td className="tableRankItemTextWrapper">1</td>
      <td
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2vmax",
        }}
      >
        <img src={dummyUser} alt="userDP" />
        <p className="tableRankItemTextWrapper" style={{ width: "100%" }}>
          Akumasy
        </p>
      </td>
      <td className="tableRankItemTextWrapper">88</td>
      <td className="tableRankItemTextWrapper">1670</td>
      {option === "games with ai".toUpperCase() && (
        <td className="tableRankItemTextWrapper">50%</td>
      )}
      {option !== "games with ai".toUpperCase() && (
        <>
          <td className="tableRankItemTextWrapper">
            6000 <span className="claimText">Claim</span>
          </td>
          <td className="tableRankItemTextWrapper">0x689 --- 36789</td>
        </>
      )}
    </tr>
  );
};
export default UserListTableItem;
