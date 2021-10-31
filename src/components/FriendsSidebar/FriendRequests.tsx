import React, { useState } from "react";
import ArrowIcon from "../../assets/images/up-arrow-white.png";
import { useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import FriendRequestItem from "./FriendRequestItem";

const FriendRequests = (): JSX.Element => {
  const [showRequests, setShowRequests] = useState(false);
  const { friendRequests } = useSelector((state: IAppState) => state.chat);
  return (
    <div className="friendRequestsContainer">
      <div
        className="friendRequestHeader"
        onClick={() => setShowRequests((s) => !s)}
      >
        <span>FRIEND REQUESTS</span>
        <img src={ArrowIcon} className={!showRequests ? "down" : ""} />
      </div>
      {showRequests &&
        (friendRequests || []).map((friendReq) => (
          <FriendRequestItem key={friendReq.id} item={friendReq} />
        ))}
    </div>
  );
};
export default FriendRequests;
