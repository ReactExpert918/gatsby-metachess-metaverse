import React from "react";
import { IFriendRequest } from "../../store/chat/chat.interfaces";
import PieceIcon from "../../assets/images/Subtracao_23.svg";
import ConfirmIcon from "../../assets/images/confirm-circle.png";
import CancelIcon from "../../assets/images/cancel-circle.png";

interface IProps {
  item: IFriendRequest;
}
const FriendRequestItem = ({ item }: IProps): JSX.Element => {
  return (
    <div className="friendsListItem">
      <div className="friendInfo">
        <img src={PieceIcon} />
        <span className="friendNameText">{item.name}</span>
      </div>
      <div className="friendRequestActions">
        <img src={ConfirmIcon} />
        <img src={CancelIcon} />
      </div>
    </div>
  );
};

export default FriendRequestItem;
