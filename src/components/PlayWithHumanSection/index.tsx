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
        <div className={"backToSelection"}>
          <p
            className={"normal"}
            onClick={props.goBack}
          >{`< Choose a game mode`}</p>
        </div>
        <div className="titleWrapper">
          <p className="title-heading">PLAY WITH HUMAN</p>
        </div>

        <div className="gamebuttons">
          <button onClick={() => setModalCustomGame(true)}>
            Create custom game
          </button>
          <button className="p-lg">Quick pairing</button>
        </div>
        <div className="menubuttons">
          <button className="colored">lobby</button>
          <button className="outlined">global ranking</button>
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
