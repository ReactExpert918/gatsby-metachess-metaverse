import moment from "moment";
import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import { MAINTENANCE_MODE } from "../../store/user/user.interfaces";
// interface IActionProps {
//   setPlayMode: typeof GameplayActions.setPlayMode;
// }

const MaintenancePage = () => {
  const { serverStatus } = useSelector((state: IAppState) => state.user);
  const mDate = moment(serverStatus.MaintenanceTime);
  return (
    <div className={"maintenance-page"}>
      {/* {serverStatus.MaintenanceMode === MAINTENANCE_MODE.ONLINE && (<p>
        we want to schedule a maintenance in 20 days
      </p>)} */}
      {serverStatus.MaintenanceMode === MAINTENANCE_MODE.NEW_GAMES_DISABLED && !serverStatus.MaintenanceDuration && (<p>
        A maintenance is scheduled for {mDate.format('MMMM')} {mDate.format('DD')}th at {mDate.format('LT')}. During the update, our services won't be available.
      </p>)}
      {serverStatus.MaintenanceMode === MAINTENANCE_MODE.NEW_GAMES_DISABLED && serverStatus.MaintenanceDuration && (<p>
        A maintenance is scheduled for {mDate.format('MMMM')} {mDate.format('DD')}th at {mDate.format('LT')} with an estimated duration of {serverStatus.MaintenanceDuration} minutes. 
        During the update, our services won't be available.
      </p>)}
      <p>
      </p>
    </div>
  );
};

// const connected = connect<null, IActionProps>(null, {
//   setPlayMode: GameplayActions.setPlayMode,
// })(ChoseMode);

export default MaintenancePage;
