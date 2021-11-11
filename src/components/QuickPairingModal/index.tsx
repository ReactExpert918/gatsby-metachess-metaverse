import React from "react";
import Modal from "../Modal";

interface IProps {
  closeModal: () => void;
}

const QuickPairingModal = (props: IProps) => {
  return (
    <Modal onClose={props.closeModal} withBorder>
      <div className="quick-pairing-modal">
        <div className={"headerRow"}>
          <h3>Quick pairing</h3>
        </div>
        <div className="row-boxes">
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
              <p>1+0</p>
              <p>bullet</p>
            </div>
            <div className="box lg">
              <p>1+0</p>
              <p>bullet</p>
            </div>
          </div>
          <div className="row">
            <div className="box lg">
              <p>1+0</p>
              <p>bullet</p>
            </div>
            <div className="box lg">
              <p>1+0</p>
              <p>bullet</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickPairingModal;
