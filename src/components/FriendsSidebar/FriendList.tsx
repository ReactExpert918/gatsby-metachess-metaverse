import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../store/chat/chat.actions";
import { IChatItem } from "../../store/chat/chat.interfaces";
import { IAppState } from "../../store/reducers";
import FriendListItem from "./FriendListItem";

const FriendList = (): JSX.Element => {
  const { chatList } = useSelector((state: IAppState) => state.chat);
  const dispatch = useDispatch();
  const showAddFriend = () => {
    dispatch(chatActions.toggleAddFriendSearch(true));
  };
  if (!chatList || !chatList.length) return <></>;
  return (
    <>
      <div className="addFriend" onClick={showAddFriend}>
        <em>+</em> Add Friend
      </div>
      {chatList.map((item: IChatItem) => (
        <FriendListItem item={item} key={item.id} />
      ))}
    </>
  );
};

export default FriendList;
