import React, { Component } from "react";
import Spectating from "../../../components/Spectating";



const RoomList = (props: any) => {
  console.log(props);
  return (
    <div>
      <Spectating roomId = {props.id} />      
    </div>
    )
}

export default RoomList

