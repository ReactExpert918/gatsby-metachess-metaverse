import React, { useEffect } from "react";

import { Actions as userActions } from "../../store/user/user.action";
import Matches from "../../components/Matches";
import ProfileSidebar from "../../components/ProfileSidebar";
import { IAppState } from "../../store/reducers";
import { IUser } from "../../store/user/user.interfaces";
import { connect } from "react-redux";
import CloseIcon from "../../assets/images/close-icon.png";
import { navigate } from "gatsby";
import UserEditInfo from "../../components/UserEditInfo";
import ProfileSummary from "../../components/ProfileSummary";
import AnotherThing from "../../components/AnotherThing";
import ProfileDateRange from "../../components/ProfileDateRange";
interface Props {
  currentUser: IUser;
}

interface IActionProps {
  fetchCurrentUser: typeof userActions.fetchCurrentUser;
}

const Profile = ({ currentUser, fetchCurrentUser }: Props & IActionProps) => {
  useEffect(() => {
    if (currentUser?.Id && fetchCurrentUser) fetchCurrentUser();
  }, [fetchCurrentUser]);

  // console.log(fetchCurrentUser);
  // return <UserEditInfo />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2vmin",
        alignItems: "center",
        flex: "1",
        marginBottom: "4vmin",
      }}
    >
      <ProfileDateRange
        title={"01-15 Aug 2020"}
        onClickNext={() => {}}
        onClickPrev={() => {}}
      />
      <div className={"profileWrapper"}>
        <ProfileSidebar currentUser={currentUser} />
        <div className="profileOverall">
          <img
            src={CloseIcon}
            className="close-icon"
            onClick={() => navigate("/")}
          />
          {!currentUser ? (
            <div></div>
          ) : currentUser.GuestId ? (
            <div className="logged-in-feature">
              This area is not available for guests.
            </div>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: "2vmax",
                  alignItems: "center",
                }}
              >
                <ProfileSummary />
                <AnotherThing />
              </div>
              <Matches />
            </>
          )}
          {/* <ProfileDateRange
        title={"01-15 Aug 2020"}
        onClickNext={() => {}}
        onClickPrev={() => {}}
      />
      <div className={"profileSummaryWrapper"}>
        <ProfileSummary />
      </div> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }: IAppState): Props => ({
  currentUser,
});

export default connect(mapStateToProps, {
  fetchCurrentUser: userActions.fetchCurrentUser,
})(Profile);
