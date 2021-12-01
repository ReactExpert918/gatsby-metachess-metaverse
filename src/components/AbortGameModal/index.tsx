import React, { useEffect } from "react";
import Modal from "../Modal";

interface Props {
  onClose: () => void;
  playerName: string;
}

const AbortGameModal = ({ onClose = () => null, playerName = "" }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 5000);
  }, []);

  const title = "Game cancelled";
  const subtitle = `The game was cancelled because player ${playerName} didn't play`;
  return (
    <Modal onClose={onClose}>
      <div className="request-draw-modal">
        <p className="title">{title}</p>
        <p>{subtitle}</p>
      </div>
    </Modal>
  );
};

export default AbortGameModal;
