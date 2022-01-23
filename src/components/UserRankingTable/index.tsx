import React, { useEffect } from "react";
import UsersListTableHeader from "./UsersRankingTableHeader";
import UserListTableItem from "./UsersRankingTableItem";
import SocketService from "../../services/socket.service";
import { IGameItem, RoomEvent } from "../../store/games/games.interfaces";
import { IAppState } from "../../store/reducers";
import { connect, useSelector } from "react-redux";
import { Actions as GamesActions } from "../../store/games/games.action";
import { Actions as GameplayActions } from "../../store/gameplay/gameplay.action";
import { Actions as UserActions } from "../../store/user/user.action";
import { getOpponentName } from "../../helpers/getOpponentNameByPlayMode";
import {
  GameMode,
  GameRules,
  PieceSide,
  GameType,
} from "../../interfaces/game.interfaces";
import { navigate } from "gatsby";
import { IUser } from "../../store/user/user.interfaces";
import isEmpty from "lodash/isEmpty";
import subscribeToGameStart from "../../lib/gameStart";

const UsersListTable = ({ option, type }: { option: string; type: string }) => {
  return (
    <div className="usersRankingTable">
      <table>
        <thead>
          <UsersListTableHeader option={option} type={type} />
        </thead>
        <tbody>
          {/* {(gameItems || []).map((item, index) => (
            <UserListTableItem
              key={item.roomId}
              index={index}
              item={item}
              onPress={onItemPress}
            />
          ))} */}
          <UserListTableItem option={option} type={type} />
        </tbody>
      </table>

      {/* <div className="listItems">
        
      </div> */}
    </div>
  );
};
export default UsersListTable;
