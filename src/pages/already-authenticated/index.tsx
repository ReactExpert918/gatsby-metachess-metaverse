import React from "react";
import Modal from "../../components/Modal";
import accessDenied from "../../assets/images/accessDenied.svg";

const Index = () => {
  return (
    <Modal onClose={() => console.log("close")}>
      <div className="accessDenied">
        <img src={accessDenied} />
        <div className={"headerWrapper"} style={{ marginBottom: "4vmin" }}>
          <p className="header-heading">You are already authenticated somewhere else!</p>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
