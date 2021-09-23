import React from "react";
import { IFriendRequest } from "../../store/chat/chat.interfaces";
import SmallLogo from "../../assets/images/Subtracao_22.svg";
import ConfirmCircleIcon from "../../assets/images/confirm-circle.png";
import CancelCircleIcon from "../../assets/images/cancel-circle.png";

interface Props {
  onPressCancel: () => void;
  onPressConfirm: () => void;
  item: IFriendRequest;
}

const FriendRequest = ({ onPressCancel, onPressConfirm, item }: Props) => (
  <div className="chatListItem">
    <div className="userInfo">
      <img className="chatIcon" src={SmallLogo} />
      <p>{item.name}</p>
    </div>
    <div className="buttonsWrapper">
      <img src={ConfirmCircleIcon} onClick={onPressConfirm} />

      <img src={CancelCircleIcon} onClick={onPressCancel} />
    </div>
  </div>
);

export default FriendRequest;
