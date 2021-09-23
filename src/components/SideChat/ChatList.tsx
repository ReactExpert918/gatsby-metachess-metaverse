import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import UserItem from "./UserItem";
import { IChatItem } from "../../store/chat/chat.interfaces";

const ChatList = () => {
  const dispatch = useDispatch();
  const { chatOpened, chatList } = useSelector(
    (state: IAppState) => state.chat
  );
  return (
    <div className="chatList">
      <div className="chatListItem "><p className="userInfo">+ Add friend</p></div>
      {(chatList ||
        []).map((item: IChatItem) => <UserItem key={item.id} item={item} />)}
    </div>
  );
};

export default ChatList;
