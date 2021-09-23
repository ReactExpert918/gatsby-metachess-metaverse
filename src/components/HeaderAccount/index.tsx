import React from "react";
import { Link } from "gatsby";
import SmallPieceIcon from "../../assets/images/Subtracao_22.svg";
import { IAppState } from "../../store/reducers";
import { connect } from "react-redux";
import { IUser } from "../../store/user/user.interfaces";
import { getOpponentName } from "../../helpers/getOpponentNameByPlayMode";

interface ISelectProps {
  currentUser: IUser;
}

const HeaderAccount = (props: ISelectProps) => {
  return (
    <div className="headerNavigatorContainer">
      {/* {props.currentUser?.GuestId ? (
        <a
          href={"javascript:void(0);"}
          className="headerNavigatorItem headerAccountContainer no-pointer"
        >
          <img src={SmallPieceIcon} style={{ height: "40px", width: "40px" }} />
          <p className="headerNavigatorAccountTitle">
            {getOpponentName(false, null, props.currentUser)}
          </p>
        </a>
      ) : ( */}
        <Link
          to={"/profile"}
          className="headerNavigatorItem headerAccountContainer"
        >
          <img src={SmallPieceIcon} style={{ height: "40px", width: "40px" }} />
          <p className="headerNavigatorAccountTitle">
            {props.currentUser ? getOpponentName(false, null, props.currentUser) : ""}
          </p>
        </Link>
      {/* )} */}
    </div>
  );
};

const mapStateToProps = (state: IAppState): ISelectProps => ({
  currentUser: state.user.currentUser,
});

const enhance = connect(mapStateToProps);

export default enhance(HeaderAccount);
