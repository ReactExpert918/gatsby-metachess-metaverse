import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import BottomChatItem from "./BottomChatItem";

const BottomChat = () => {
  const dispatch = useDispatch();
  const { chatOpened, activeChats } = useSelector(
    (state: IAppState) => state.chat
  );
  if(chatOpened) return null;
  return (
      <div className="bottomChatWrapper">
        {activeChats || []
          ? activeChats.map((chat) => (
              <BottomChatItem
                key={chat.id}
                item={chat}
                onCloseChat={() => {}}
              />
            ))
          : null}
      </div>
  );
};

export default BottomChat;
