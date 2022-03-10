import React, { useState, useEffect } from "react";
import NewGameModal from "../NewGameModal";
import UsersListTable from "../UsersListTable";
import SocketService from "../../services/socket.service";
import QuickPairingModal from "../QuickPairingModal";
import { navigate } from "gatsby";

interface IProps {
  goBack: () => void;
  onJoinRoom: (p: string) => void;
}

const PlayWithHumanSection = (props: IProps) => {
  const [joinRoom, setJoinRoom] = useState("");
  const [modalCustomGame, setModalCustomGame] = useState(false);
  const [modalQuickPairing, setModalQuickPairing] = useState(false);

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
            Create a match
          </button>
          <button className="p-lg" onClick={() => setModalQuickPairing(true)}>
            Quick pairing
          </button>
        </div>
        <div className="menubuttons">
          <button className="colored">lobby</button>
          <button className="outlined" onClick={() => navigate("/leaderboard")}>
            leaderboard
          </button>
        </div>
        <UsersListTable />
      </div>
      {modalCustomGame && (
        <NewGameModal closeModal={() => setModalCustomGame(false)} />
      )}
      {modalQuickPairing && (
        <QuickPairingModal closeModal={() => setModalQuickPairing(false)} />
      )}
    </>
  );
};

export default PlayWithHumanSection;
