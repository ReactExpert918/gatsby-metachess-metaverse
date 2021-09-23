import React, { useState } from "react";
import { IChatItem } from "../../store/chat/chat.interfaces";
import SmallLogo from "../../assets/images/Subtracao_22.svg";
import CloseIcon from "../../assets/images/close-icon.png";
import UnseenNumber from "./UnseenNumber";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChessMessages";
interface Props {
  item: IChatItem;
  onCloseChat: () => void;
}

const BottomChatItem = ({ item, onCloseChat }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeChat = () => {
    if (isOpen) setIsOpen(false);
    else onCloseChat;
  };

  return (
    <div className={`bottomChatItemWrapper ${isOpen ? " openedItem" : ""}`}>
      <div className="bottomChatHeader" onClick={() => setIsOpen(!isOpen)}>
        <div className="userInfo">
          <img className="chatIcon" src={SmallLogo} />
          <p>{item.name}</p>
          {!isOpen && item.unseenCount ? (
            <UnseenNumber number={item.unseenCount} />
          ) : null}
        </div>
        <img src={CloseIcon} className="closeIcon" onClick={closeChat} />
      </div>
      {isOpen ? (
        <div className="chatContent">
          <div className="bottomChatHeader" onClick={() => setIsOpen(!isOpen)}>
            <div className="userInfo">
              <img className="chatIcon" src={SmallLogo} />
              <p>{item.name}</p>
            </div>
            <img src={CloseIcon} className="closeIcon" onClick={closeChat} />
          </div>
          <div className="chatContainer">
            <ChatMessages messages={item.messages} />
            <ChatInput />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BottomChatItem;
