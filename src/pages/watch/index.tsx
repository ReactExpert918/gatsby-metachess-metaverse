import React, { Component } from "react";
import Spectating from "../../components/Spectating";
import game from "../game"
import Livegames from "../../components/Livegames";

const RoomList = (props) => {
  return (
    <div>
      <Livegames />
    </div>
    )
}

const WatchWrapper = (props) => {    
  console.log("RoomList", props);
  return (
  <div>
    {RoomList(props)}
  </div>
  ) 
}

export default WatchWrapper;

