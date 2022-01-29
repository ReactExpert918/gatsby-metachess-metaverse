import React, { useEffect, useState } from "react";
import Modal from "../Modal/index";
import MaintenancePage from "../../pages/maintenance";
import { useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import { MAINTENANCE_MODE } from "../../store/user/user.interfaces";

const MaintenanceModal = () => {
  const { serverStatus } = useSelector((state: IAppState) => state.user);
  console.log("this is serverStatus =====> ", serverStatus);
  const [userSeenMaintenance, setUserSeenMaintenance] = useState(true);
  // const newGamesDisabled =
  //   serverStatus.MaintenanceMode === MAINTENANCE_MODE.NEW_GAMES_DISABLED;
  useEffect(() => {
    if (serverStatus.MaintenanceMode !== 0) {
      setUserSeenMaintenance(false);
    }
  }, [serverStatus]);
  return (
    <>
      {!userSeenMaintenance && (
        <Modal onClose={() => setUserSeenMaintenance(true)} withBorder>
          <div className={"maintenance-modal"}>
            <MaintenancePage />
            <div className={"btn-container"}></div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MaintenanceModal;
