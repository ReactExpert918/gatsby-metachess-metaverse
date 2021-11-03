import React from "react";
import PieceIcon from "../../assets/images/Subtracao_23.svg";
import CancelIcon from "../../assets/images/cancel-circle.png";
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
  return (
    <>
      <div className="friendsListItem">
        <div className="friendInfo">
          <img src={PieceIcon} />
          <span className="friendNameText">{friend.Account.Username}</span>
          {/* {item.unseenCount && (
            <span className="unseenCount">{item.unseenCount}</span>
          )} */}
        </div>
        <div className="friendStatus">
          {friend.Account.IsOnline ? (
            <>
              <span className="onlineDot"></span>
              <span className="friendStatusText">Online</span>
            </>
          ) : (
            <span className="friendStatusText">29 minutes ago</span>
          )}
          <img className="remove-friend-icon" src={CancelIcon} onClick={removeFriend} />
        </div>
      </div>
    </>
  );
};

export default FriendListItem;
