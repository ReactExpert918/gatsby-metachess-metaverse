import React, { useState } from "react";
import CloseIcon from "../../assets/images/close-icon-white2.png";
import FriendRequests from "./FriendRequests";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import { chatActions } from "../../store/chat/chat.actions";
import FriendList from "./FriendList";
import AddFriend from "./AddFriend";

const MAX_NUM_FRIENDS = 200;

const FriendsSidebar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { chatOpened, addFriendSearch } = useSelector(
    (state: IAppState) => state.chat
  );
  const { friendsList } = useSelector((state: IAppState) => state.chat);

  if (!chatOpened) return <></>;
  return (
    <>
      <div className="friendsSidebarWrapper">
        <div className="friendsSidebarContainer">
          <div className="friendsHeader">
            <div>
              <span>Friends</span>
              <span style={{marginLeft: '16px'}}>
                {friendsList.length}/{MAX_NUM_FRIENDS}
              </span>
            </div>
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
