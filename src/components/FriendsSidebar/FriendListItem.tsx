import React from "react";
import PieceIcon from "../../assets/images/Subtracao_23.svg";
import CancelIcon from "../../assets/images/cancel-circle-red.png";
import { IFriend } from "../../store/chat/chat.interfaces";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/chat/chat.actions";

interface IProps {
  friend: IFriend;
}

const FriendListItem = ({ friend }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const removeFriend = () => {
    dispatch(chatActions.removeFriend(friend.Id));
  };
  const statusClass = `statusCircle ${friend.Account.IsOnline ? "on" : "off"}`;

  return (
    <div className="friendsListItem">
      <div className="friendInfo">
        <div className="avatar">
          <img src={PieceIcon} />
          <div className={statusClass}></div>
        </div>
        <span className="friendNameText">{friend.Account.Username}</span>
        {/* {item.unseenCount && (
            <span className="unseenCount">{item.unseenCount}</span>
          )} */}
      </div>
      <div className="friendStatus">
        <img
          className="remove-friend-icon"
          src={CancelIcon}
          onClick={removeFriend}
        />
      </div>
    </div>
  );
};

export default FriendListItem;
