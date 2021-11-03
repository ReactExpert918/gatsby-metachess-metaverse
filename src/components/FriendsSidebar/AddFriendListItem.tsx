import React from "react";
import { useDispatch } from "react-redux";
import PieceIcon from "../../assets/images/Subtracao_23.svg";
import { chatActions } from "../../store/chat/chat.actions";
import { IUser } from "../../store/user/user.interfaces";

interface IProps {
  item: IUser;
}
const AddFriendListItem = ({ item }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const sendFriendReq = () => {
    dispatch(chatActions.sendFriendsRequests(item.Id));
  };
  return (
    <>
      <div className="friendsListItem">
        <div className="friendInfo">
          <img src={PieceIcon} />
          <span className="friendNameText">{item.Fullname}</span>
        </div>
        <div className="addFriendActions" onClick={sendFriendReq}>
          <span>+</span>
        </div>
      </div>
    </>
  );
};

export default AddFriendListItem;
