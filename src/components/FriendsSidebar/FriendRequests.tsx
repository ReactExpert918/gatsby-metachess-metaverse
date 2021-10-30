import React, { useState } from "react";
import ArrowIcon from "../../assets/images/up-arrow-white.png";
import PieceIcon from "../../assets/images/Subtracao_23.svg";
import ConfirmIcon from "../../assets/images/confirm-circle.png";
import CancelIcon from "../../assets/images/cancel-circle.png";
import { useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";

const FriendRequests = (): JSX.Element => {
  const [showRequests, setShowRequests] = useState(false);
  const { friendRequests } = useSelector((state: IAppState) => state.chat);
  return (
    <div className="friendRequestsContainer">
      <div className="friendRequestHeader">
        <span>FRIEND REQUESTS</span>
        <img
          src={ArrowIcon}
          className={!showRequests ? "down" : ""}
          onClick={() => setShowRequests((s) => !s)}
        />
      </div>
      {showRequests &&
        (friendRequests || []).map((friendReq) => (
          <div className="friendsListItem">
            <div className="friendInfo">
              <img src={PieceIcon} />
              <span className="friendNameText">{friendReq.name}</span>
            </div>
            <div className="friendRequestActions">
              <img src={ConfirmIcon} />
              <img src={CancelIcon} />
            </div>
          </div>
        ))}
    </div>
  );
};
export default FriendRequests;
