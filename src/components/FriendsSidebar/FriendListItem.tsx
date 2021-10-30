import React from "react";
import PieceIcon from "../../assets/images/Subtracao_23.svg";
import { IChatItem } from "../../store/chat/chat.interfaces";

interface IProps {
  item: IChatItem;
}

const FriendListItem = ({ item }: IProps): JSX.Element => {
  return (
    <>
      <div className="friendsListItem">
        <div className="friendInfo">
          <img src={PieceIcon} />
          <span className="friendNameText">{item.name}</span>
          {item.unseenCount && (
            <span className="unseenCount">{item.unseenCount}</span>
          )}
        </div>
        <div className="friendStatus">
          {item.status === "online" ? (
            <>
              <span className="onlineDot"></span>
              <span className="friendStatusText">Online</span>
            </>
          ) : (
            <span className="friendStatusText">{item.status}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendListItem;
