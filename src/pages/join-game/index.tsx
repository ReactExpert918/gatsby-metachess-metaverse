import React from "react";
import subscribeToGameStart from "../../lib/gameStart";
import SocketService from "../../services/socket.service";

const JoinGame = (): null => {
  let roomId;
  if (location.search.slice(0, 8) === "?roomId=") {
    roomId = location.search.slice(8);
    subscribeToGameStart();
    SocketService.sendData("join-game", roomId, (...args: any) => {
      // TODO: Will be typeof GameRules
      console.log("join-game:", args);
    });
  }
  return null;
};

export default JoinGame;
