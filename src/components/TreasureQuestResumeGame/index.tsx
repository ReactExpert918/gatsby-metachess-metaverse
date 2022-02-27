import React, { useEffect, useState } from "react";
import Modal from "../Modal/index";
import { ILoseMatchForLeaving } from "../../interfaces/game.interfaces";
import { TrophySvg } from "../Images";

interface IProps {
  onResume: () => void;
  onLeave: () => void;
  leavingTime: number;
}

const ResumeOldGameModal = (props: IProps) => {
  const onClose = () => {
    props.onLeave();
  };
  const [timeLeft, setTimeLeft] = useState(props.leavingTime);
  useEffect(() => {
    let timeout: NodeJS.Timeout = null;
    if (timeLeft >= 0) {
      timeout = setTimeout(() => {
        if (timeLeft < 1) {
          props.onLeave();
        } else {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [timeLeft]);
  // function timeLeftToMinutesAndSeconds(timeLeft) {
  var minutes: number = Math.floor(timeLeft / 60);
  var seconds: number = timeLeft - minutes * 60;

  return (
    <Modal
      onClose={onClose}
      isTopLeft={true}
      withShadow={true}
      withBorder={true}
      isBlack={true}
      isDrawModal={true}
    >
      <div className={"resume-old-game-modal"}>
        <p>You are currently in a treasure quest game</p>
        <div className={"timeleft"}>
          <p>
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
        </div>
        <div className={"btn-container"}>
          <button onClick={props.onResume} className={"btn"}>
            Return to the game
          </button>
          {/* <button onClick={props.onLeave} className={"btn"}>
            Leave
          </button> */}
        </div>
      </div>
    </Modal>
  );
};
export default ResumeOldGameModal;
