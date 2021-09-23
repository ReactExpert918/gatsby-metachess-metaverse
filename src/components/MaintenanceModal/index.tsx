import React from "react";
import Modal from "../Modal/index";
import MaintenancePage from "../../pages/maintenance";

interface IProps {
  setUserSeen: () => void;
}

const MaintenanceModal = (props: IProps) => {
  return (
    <Modal onClose={props.setUserSeen}>
      <div className={"maintenance-modal"}>
        <MaintenancePage />
        <div className={"btn-container"}>
          <button onClick={props.setUserSeen} className={"btn"}>
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MaintenanceModal;
