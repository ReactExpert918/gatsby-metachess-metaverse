import React, { Component } from "react";
import Spectating from "../../../components/Spectating";
import game from "../game"
import Livegames from "../../components/Livegames";



const RoomList = (props) => {
  console.log(props);
  
  return (
    <div>
      <Spectating roomId = {props.id}/>
    </div>
    )
}

export default RoomList

