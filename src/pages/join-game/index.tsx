import React from "react";
import subscribeToGameStart from "../../lib/gameStart";
import SocketService from "../../services/socket.service";

import socketIO from "socket.io-client";
import { SOCKET, API, COOKIE_DOMAIN, MAIN_WEBSITE } from "../../config";

const JoinGame = (): null => {
  let roomId;
  if (location.search.slice(0, 8) === "?roomId=") {
    roomId = location.search.slice(8);
    subscribeToGameStart();
    SocketService.sendData("join-game", roomId, (...args: any) => {
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
  return null;
};

export default JoinGame;
