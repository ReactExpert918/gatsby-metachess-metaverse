import React from "react";
import { Link } from "gatsby";
import { IAppState } from "../../store/reducers";
import { connect, useDispatch } from "react-redux";
import { IUser } from "../../store/user/user.interfaces";
import { getOpponentName } from "../../helpers/getOpponentNameByPlayMode";
import { chatActions } from "../../store/chat/chat.actions";
import { HeaderNavigatorItem } from "../Header";
import SearchIcon from "../../lib/svgIcons/SearchIcon";
import FriendsIcon from "../../lib/svgIcons/FriendsIcon";
import BellIcon from "../../lib/svgIcons/BellIcon";
import SmallPieceIcon from "../../assets/images/Subtracao_22.svg";
import { MAIN_WEBSITE } from "../../config";
import MaintenancePage from "../../pages/maintenance";

interface ISelectProps {
  currentUser: IUser;
}

const HeaderAccount = (props: ISelectProps) => {
  const dispatch = useDispatch();
  console.log(props.currentUser);
  const openSideChatPanel = () => {
    dispatch(chatActions.toggleSideChat());
  };

  return (
    <div className="headerNavigatorContainer flex-end">
      {props.currentUser && props.currentUser.Username ? (
        <>
          <MaintenanceInfo />
          <SearchIcon className="nav-icon" />
          <FriendsIcon className="nav-icon" onClick={openSideChatPanel} />
          <BellIcon className="nav-icon" />
          <Link to={"/profile"} className="headerAccountContainer">
            <span>
              <img src={props.currentUser?.Avatar || SmallPieceIcon} />
            </span>

            <p className="headerNavigatorAccountTitle">
              {props.currentUser
                ? getOpponentName(false, null, props.currentUser)
                : ""}
            </p>
          </Link>
        </>
      ) : (
        <>
          <div className="headerNavigatorContainer flex-end">
            <MaintenanceInfo />
            <SearchIcon className="nav-icon mr-50" />
            <HeaderNavigatorItem
              className="pr-50"
              url={`${MAIN_WEBSITE}login?r=game`}
              title="LOGIN"
            />
            <HeaderNavigatorItem
              url={`${MAIN_WEBSITE}signup?r=game`}
              title="SIGNUP"
            />
          </div>
        </>
      )}
    </div>
  );
};

const MaintenanceInfo = () => {
  return (
    <div className="maintenance-info">
      <BellIcon className="nav-icon tooltip-info-icon" />
      <div className="tooltip">
        <span className="tooltip-header"></span>
        <MaintenancePage />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState): ISelectProps => ({
  currentUser: state.user.currentUser,
});

const enhance = connect(mapStateToProps);

export default enhance(HeaderAccount);
