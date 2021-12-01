import React from "react";
import Modal from "../Modal";
import {
  GameMode,
  GameRules,
  PieceSide,
} from "../../interfaces/game.interfaces";
import SocketService from "../../services/socket.service";

interface IProps {
  closeModal: () => void;
}

const QuickPairingModal = (props: IProps) => {

  const onQuickPlay = (base:number,increment:number) => {
    const hostSide =  PieceSide.Random
    const gameRules: GameRules = {
      chessCoin:null,
      hostSide,
      rating: 5,
      mode: GameMode.Casual,
      time: {
        base,
        increment,
      },
    };
    SocketService.sendData(
      "quick-play",
      gameRules,
      (roomToken: string) => {
        console.log("quick-play:", roomToken);
      }
    );
  };
  return (
    <Modal onClose={props.closeModal} withBorder>
      <div className="quick-pairing-modal">
        <div className={"headerRow"}>
          <h3>Quick pairing</h3>
        </div>
        <div className="row-boxes">
          <div className="row">
            <div className="box" onClick={()=>onQuickPlay(1,0)}>
              <p>1+0</p>
              <p>bullet</p>
            </div>
            <div className="box">
              <p>1+0</p>
              <p>bullet</p>
            </div>
            <div className="box">
              <p>1+0</p>
              <p>bullet</p>
            </div>
            <div className="box">
              <p>1+0</p>
              <p>bullet</p>
            </div>
          </div>
          <div className="row">
            <div className="box">
              <p>1+0</p>
              <p>bullet</p>
            </div>
            <div className="box">
              <p>1+0</p>
              <p>bullet</p>
            </div>
            <div className="box">
              <p>1+0</p>
              <p>bullet</p>
            </div>
            <div className="box">
              <p>1+0</p>
              <p>bullet</p>
            </div>
          </div>
          <div className="row">
            <div className="box lg">
              <p>ANY BULLET</p>
            </div>
            <div className="box lg">
              <p>ANY BLITZ</p>
            </div>
          </div>
          <div className="row">
            <div className="box lg">
              <p>ANY RAPID</p>
            </div>
            <div className="box lg">
              <p>ANY CLASSICAL</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickPairingModal;
