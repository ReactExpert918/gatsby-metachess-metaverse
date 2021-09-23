import React, { useState, useContext, useEffect } from "react";
// interface IActionProps {
//   setPlayMode: typeof GameplayActions.setPlayMode;
// }

const MaintenancePage = () => {
  return (
    <div className={"choseModeContainer desktopMaxWidth"}>
      <p>Site under Maintenance</p>
      <p>We'll be back soon</p>
    </div>
  );
};

// const connected = connect<null, IActionProps>(null, {
//   setPlayMode: GameplayActions.setPlayMode,
// })(ChoseMode);

export default MaintenancePage;
