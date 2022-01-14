import React, { useState } from "react";
import ProfilePlaceholder from "../../assets/images/profile-placeholder.png";
import TabHeader, { ProfileTab } from "./TabHeader";
import StarTabContent from "./StarTabContent";
import AchivementInfoTabContent from "./AchivementsTabContent";
import ProfileInfoTabContent from "./ProfileInfoTabContent";
import { IAppState } from "../../store/reducers";
import { IUser } from "../../store/user/user.interfaces";
import { getOpponentName } from "../../helpers/getOpponentNameByPlayMode";
import { connect } from "react-redux";
import UserEditInfo from "./UserEditInfo";

interface Props {
  currentUser: IUser;
}

const ProfileSidebar = ({ currentUser }: Props) => {
  const [selectedTab, setSelectedTab] = useState<ProfileTab>("star");

  return (
    <div className="profileSidebarContainer">
      <div className="header">
        <img src={ProfilePlaceholder} />
        <p>{currentUser ? getOpponentName(false, null, currentUser) : ""}</p>
      </div>
      {!currentUser?.GuestId ? (
        <TabHeader onSelect={setSelectedTab} selected={selectedTab} />
      ) : null}
      {selectedTab === "star" && <StarTabContent currentUser={currentUser} />}
      {/* {selectedTab === "achivement" && <AchivementInfoTabContent />} */}
      {selectedTab === "profile" && <UserEditInfo currentUser={currentUser} />}
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }: IAppState): Props => ({
  currentUser,
});

export default connect(mapStateToProps)(ProfileSidebar);
