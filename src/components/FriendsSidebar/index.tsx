import React, { useState } from "react";
import Modal from "../Modal";
import CloseIcon from "../../assets/images/close-icon-white.png";
import FriendRequests from "./FriendRequests";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import { chatActions } from "../../store/chat/chat.actions";
import FriendList from "./FriendList";
import AddFriend from "./AddFriend";

const FriendsSidebar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { chatOpened, addFriendSearch } = useSelector(
    (state: IAppState) => state.chat
  );

  if (!chatOpened) return <></>;
  return (
    <>
      <div className="friendsSidebarWrapper">
        <div className="friendsSidebarContainer">
          <div className="friendsHeader">
            <span>Friends</span>
            <img
              src={CloseIcon}
              onClick={() => dispatch(chatActions.toggleSideChat())}
            />
          </div>
          <div className="friendsList">
            {addFriendSearch ? <AddFriend /> : <FriendList />}
          </div>
          {!addFriendSearch && <FriendRequests />}
        </div>
      </div>
    </>
  );
};
export default FriendsSidebar;
