import React from "react";
import { Link } from "gatsby";
import SmallPieceIcon from "../../assets/images/Subtracao_22.svg";
import { IAppState } from "../../store/reducers";
import { connect, useDispatch } from "react-redux";
import { IUser } from "../../store/user/user.interfaces";
import { getOpponentName } from "../../helpers/getOpponentNameByPlayMode";
import { chatActions } from "../../store/chat/chat.actions";
import SearchIcon from "../../lib/svgIcons/SearchIcon";
import ChatIcon from "../../lib/svgIcons/ChatIcon";
import BellIcon from "../../lib/svgIcons/BellIcon";
import { HeaderNavigatorItem } from "../Header";

interface ISelectProps {
  currentUser: IUser;
}

const HeaderAccount = (props: ISelectProps) => {
  const dispatch = useDispatch();
  const openSideChatPanel = () => {
    dispatch(chatActions.toggleSideChat());
  };
  return (
    <div className="headerNavigatorContainer flex-end">
      {props.currentUser && props.currentUser.Username ? (
        <>
          <SearchIcon className="nav-icon" />
          <ChatIcon className="nav-icon" onClick={openSideChatPanel} />
          <BellIcon className="nav-icon" />
          <Link to={"/profile"} className="headerAccountContainer">
            <span>
              <img src={SmallPieceIcon} />
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
            <SearchIcon className="nav-icon mr-50" />
            <HeaderNavigatorItem className="pr-50" to="/login" title="LOGIN" />
            <HeaderNavigatorItem to="/sign-up" title="SIGNUP" />
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: IAppState): ISelectProps => ({
  currentUser: state.user.currentUser,
});

const enhance = connect(mapStateToProps);

export default enhance(HeaderAccount);
