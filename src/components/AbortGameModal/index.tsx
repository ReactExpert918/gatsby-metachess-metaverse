import React, { useEffect } from "react";
import Modal from "../Modal";

interface Props {
  playerName: string;
  onCancel: () => void;
}

const AbortGameModal = ({ playerName = "", onCancel = () => null }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      onCancel();
    }, 1200);
  }, []);

  const title = "Game cancelled";
  const subtitle = `The game was cancelled because player ${playerName} didn't play`;
  return (
    <Modal onClose={onCancel}>
      <div className="request-draw-modal">
        <p className="title">{title}</p>
        <p>{subtitle}</p>
      </div>
    </Modal>
  );
};

export default AbortGameModal;
