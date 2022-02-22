import React, { useEffect, useRef, useState } from "react";
import subscribeToGameStart from "../../lib/gameStart";
import SocketService from "../../services/socket.service";

import socketIO from "socket.io-client";
import { SOCKET, API, COOKIE_DOMAIN, MAIN_WEBSITE } from "../../config";
import { navigate } from "gatsby";
import { GameRules } from "../../interfaces/game.interfaces";
import { IUser } from "../../store/user/user.interfaces";
import { useDispatch } from "react-redux";
import { Actions } from "../../store/user/user.action";
import { MODES } from "../../constants/playModes";
import { getOpponentName } from "../../helpers/getOpponentNameByPlayMode";

interface gameInfo {
  gameRules?: GameRules;
  gameStartDate?: number;
  historyMoves?: [];
  host?: IUser;
  secondPlayer?: IUser;
}

const JoinGame = () => {
  let roomId = useRef<string>("");
  const dispatch = useDispatch();
  const [roomInfo, setRoomInfo] = useState<gameInfo>({});
  useEffect(() => {
    if (location.search.slice(0, 8) === "?roomId=") {
      roomId.current = location.search.slice(8);
      subscribeToGameStart();
      SocketService.sendData("join-game", roomId.current, (args: any) => {
        if (args.type !== 0) setRoomInfo(args.gameInfo);
        // console.log(args);
        // debugger;
        // TODO: Will be typeof GameRules

        // socketIO(SOCKET).io.emit("spectatable", "roomId", null);
        console.log("join-game:", args);
      });
      // SocketService.sendData("start-spectating", roomId, (res)=>{
      //   if(res){
      //     navigate(`/watch/${roomId}`);
      //   }
      // })
    }
  }, []);
  if (!roomInfo || !roomInfo.gameRules) return null;
  return (
    <div className={"choseModeSectionContainer"}>
      <div className={"headerWrapper"}>
        <p className="header-heading">GAME IN PROGRESS</p>
      </div>
      <div className="sub-headingRules">
        {getOpponentName(false, null, roomInfo.host)} VS{" "}
        {getOpponentName(false, null, roomInfo.secondPlayer)}
      </div>
      <div
        style={{
          fontSize: "20px",
          color: "#fff",
          fontWeight: "500",
          width: "100%",
          textAlign: "center",
          marginBottom: "4vmin",
        }}
      >
        The game is in progress, do you want to spectate the game instead?
      </div>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <button
          className="claimButton"
          style={{
            width: "initial",
            textTransform: "uppercase",
            padding: "2vmin 2vmax",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`/watch/${roomId.current}`);
          }}
        >
          Spectate
        </button>
        <button
          className="claimButton"
          style={{
            width: "initial",
            textTransform: "uppercase",
            padding: "2vmin 2vmax",
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch(Actions.setChoseMode(MODES.PLAY_WITH_HUMAN));
            navigate(`/choose-mode`);
          }}
        >
          Back to lobby
        </button>
      </section>
    </div>
  );
};

export default JoinGame;
