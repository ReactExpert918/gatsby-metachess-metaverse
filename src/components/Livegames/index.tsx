import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableItem from "./TableItem";
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
import { navigate } from "gatsby-link";
import { IUser } from "../../store/user/user.interfaces";
import isEmpty from "lodash/isEmpty";
import subscribeToGameStart from "../../lib/gameStart";

import socketIO from "socket.io-client";
import { SOCKET, API, COOKIE_DOMAIN, MAIN_WEBSITE } from "../../config";

// export interface IUserListItem {
//   id: string;
//   name: string;
//   badge?: string;
//   rating?: string | number;
//   time: string;
//   chessCoins?: string;
//   status: boolean;
//   gameType: GameType;
// }

interface ISelectProps {
  gameItems: IGameItem[];
}

interface IActionProps {
  setGameItems: typeof GamesActions.setGameItems;
  setPlayerColor: typeof GameplayActions.setPlayerColor;
  setGameRules: typeof GameplayActions.setGameRules;
  setOpponent: typeof GameplayActions.setOpponent;
  setPlayMode: typeof GameplayActions.setPlayMode;
  modifyGameItems: typeof GamesActions.modifyGameItems;
  setCurrentUser: typeof UserActions.setCurrentUser;
}

interface IProps extends ISelectProps, IActionProps {
  usersList?: IGameItem[];
  currentUser: IUser;
}

interface ISpectateRoomsPage {
  user: IUser;
  rooms: IGameItem[];
}

// const mapGameItemsToUserList = (gameItem: IGameItem): IUserListItem => {
//   return {
//     id: gameItem.roomId,
//     name: getOpponentName(false, null, gameItem.host),
//     time: `${gameItem.gameRules.time.base}+${gameItem.gameRules.time.increment}`,
//     status: !isEmpty(gameItem.gameRules.chessCoin),
//     chessCoins:
//       gameItem.gameRules.chessCoin &&
//       `${gameItem.gameRules.chessCoin.minium}-${gameItem.gameRules.chessCoin.maxium}`,
//     gameType: gameItem.gameRules.type,
//     rating:
//       // gameItem.gameRules.mode.toString() === GameMode.Rated.toString() &&
//       `${gameItem.gameRules.rating.minium}-${gameItem.gameRules.rating.maxium}`,
//     badge:
//       gameItem.gameRules.mode.toString() === GameMode.Rated.toString()
//         ? `badge`
//         : null,
//   };
// };

const Livegames = ({
  setGameItems,
  setPlayerColor,
  setGameRules,
  setOpponent,
  setPlayMode,
  setCurrentUser,
  modifyGameItems,
}: IProps) => {  
  const { currentUser } = useSelector((state: IAppState) => state.user);
  // const gameItems: IGameItem[] = [
  //   {
  //     gameRules: {
  //       type: GameType.Blitz,
  //       rating: {
  //         maxium: 10,
  //         minium: 2,
  //       },
  //       chessCoin: {
  //         maxium: 10,
  //         minium: 2,
  //       },
  //       time: {
  //         base: 5,
  //         increment: 1,
  //       },
  //       mode: GameMode.Rated,
  //       hostSide: PieceSide.Black,
  //     },
  //     host: currentUser,
  //     roomId: "123",
  //     status: RoomEvent.GameStarted,
  //   },
  // ];
  const gameItems = useSelector(({ games }: IAppState) => games.gameItems);
  useEffect(() => {
    SocketService.subscribeTo({
      eventName: "rooms-page",
      callback: (args: IGameItem) => {
        modifyGameItems(args);
      },
    });
    SocketService.sendData(
      `spectatable-rooms-page`,
      null,
      ({ user, rooms }: ISpectateRoomsPage) => {
        console.log(user, rooms);
        setCurrentUser({ ...user });
        setGameItems(rooms);      
      }
    );    
  }, []);

  const onItemPress = (roomId: string) => {    
    SocketService.sendData("start-spectating", roomId, (response) => {
      console.log("start-spectating", response);      
      if(response){
      navigate(`/watch/${roomId}`);        
      } else {
        return;
      }
    });
  };

  const onJoingame = () => {
  const roomId = "PfybqHuVmjBU2zhVHRDtQLc7pGDNEnxg";
    // SocketService.sendData("start-spectating",roomId, (response) => {
    //   console.log("start-spectating", response);      
    //   if(response){
      navigate(`/watch/${roomId}`);        
    //   } 
    // });

  }
  
  return (
    <div className="usersListTable">
      <table>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {(gameItems || []).map((item, index) => (
            <TableItem
              key={item}
              index={index}
              item={item}
              onPress={onItemPress}
            />            
          ))}
        </tbody>
      </table>
     <button onClick={onJoingame} >BUTTON</button>
    </div>
  );
};

const connected = connect(null, {
  setGameItems: GamesActions.setGameItems,
  modifyGameItems: GamesActions.modifyGameItems,
  setPlayerColor: GameplayActions.setPlayerColor,
  setGameRules: GameplayActions.setGameRules,
  setOpponent: GameplayActions.setOpponent,
  setPlayMode: GameplayActions.setPlayMode,
  setCurrentUser: UserActions.setCurrentUser,
});

export default connected(Livegames);
