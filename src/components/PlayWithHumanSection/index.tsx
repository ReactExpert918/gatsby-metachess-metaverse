import React, { useState, useEffect } from "react";
import NewGameModal from "../NewGameModal";
import UsersListTable from "../UsersListTable";
import SocketService from "../../services/socket.service";

interface IProps {
  goBack: () => void;
  onJoinRoom: (p: string) => void;
}

const PlayWithHumanSection = (props: IProps) => {
  const [joinRoom, setJoinRoom] = useState("");
  const [modalCustomGame, setModalCustomGame] = useState(false);

  return (
    <>
      <div className="playWithHumanContainer">
        <div className="titleWrapper">
          <p className={"xx-large"}>PLAY WITH HUMAN</p>
        </div>
        <div className={"backToSelection"}>
          <p
            className={"normal"}
            onClick={props.goBack}
          >{`< Choose a game mode`}</p>
        </div>
        <div className="buttonsContainer">
          {/* <button
            className="outlinedButton  mRight mBottom"
            onClick={() => props.onJoinRoom(joinRoom)}
          >
            {"Quick pairing (3+0)"}
          </button> */}
          <button
            className="outlinedButton"
            onClick={() => setModalCustomGame(true)}
          >
            {"Create custom game"}
          </button>
          {/* <button className="outlinedButton  mRight mBottom">
            {"Challenge an user"}
          </button> */}
        </div>
        <UsersListTable />
      </div>
      {modalCustomGame && (
        <NewGameModal closeModal={() => setModalCustomGame(false)} />
      )}
    </>
  );
};

export default PlayWithHumanSection;
