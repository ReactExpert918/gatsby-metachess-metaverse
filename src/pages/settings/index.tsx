import React from "react";
import SettingsTab from "../../components/ProfileSidebar/SettingsTab";

export default () => {
  return (
    <div
      className="profileSidebarContainer"
      style={{ width: "50%", margin: "0 auto 4vmin" }}
    >
      <SettingsTab />
    </div>
  );
};
