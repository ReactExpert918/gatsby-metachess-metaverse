import React from "react";
import { IFriend } from "../../store/chat/chat.interfaces";
import PieceIcon from "../../assets/images/Subtracao_23.svg";

interface IProps {
  item: IFriend;
}
const AddFriendListItem = ({ item }: IProps): JSX.Element => {
  return (
    <>
      <div className="friendsListItem">
        <div className="friendInfo">
          <img src={PieceIcon} />
          <span className="friendNameText">{item.name}</span>
        </div>
        <div className="addFriendActions">
          <span>+</span>
        </div>
      </div>
    </>
  );
};

export default AddFriendListItem;
