import React, { useState } from "react";
import Modal from "../Modal";
import CloseIcon from "../../assets/images/close-icon-white.png";
import FriendListItem from "./FriendListItem";
import FriendRequests from "./FriendRequests";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import { IChatItem } from "../../store/chat/chat.interfaces";
import { chatActions } from "../../store/chat/chat.actions";

const FriendsSidebar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { chatOpened, chatList } = useSelector(
    (state: IAppState) => state.chat
  );
  const closeSidebar = () => dispatch(chatActions.toggleSideChat());

  if (!chatOpened) return <></>;
  return (
    <>
      <div className="friendsSidebarWrapper">
        <Modal onClose={closeSidebar}>
          <div className="friendsSidebarContainer">
            <div className="friendsHeader">
              <span>Friends</span>
              <img src={CloseIcon} onClick={closeSidebar} />
            </div>
            <div className="friendsList">
              <div className="addFriend">
                <em>+</em> Add Friend
              </div>
              {(chatList || []).map((item: IChatItem) => (
                <FriendListItem item={item} key={item.id} />
              ))}
            </div>
            <FriendRequests />
          </div>
        </Modal>
      </div>
    </>
  );
};
export default FriendsSidebar;
