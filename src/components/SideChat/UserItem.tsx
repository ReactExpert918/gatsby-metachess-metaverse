import React from "react";
import SmallLogo from "../../assets/images/Subtracao_22.svg";

import UnseenNumber from "../BottomChat/UnseenNumber";
import { IChatItem } from "../../store/chat/chat.interfaces";
import OnlineStatus from "./OnlineStatus";

interface Props {
  item: IChatItem;
  onClick: () => void;
}

const UserItem = ({ item, onClick }: Props) => (
  <div className="chatListItem" onClick={onClick}>
    <div className="userInfo" onClick={onClick}>
      <img className="chatIcon" src={SmallLogo} />
      <p>{item.name}</p>
      {item.unseenCount ? <UnseenNumber number={item.unseenCount} /> : null}
    </div>
    <OnlineStatus status={item.status} />
  </div>
);

export default UserItem;
