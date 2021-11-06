import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../store/chat/chat.actions";
import { IFriend } from "../../store/chat/chat.interfaces";
import { IAppState } from "../../store/reducers";
import FriendListItem from "./FriendListItem";
import NoRecord from "./NoRecord";

const FriendList = (): JSX.Element => {
  const { friendsList } = useSelector((state: IAppState) => state.chat);
  const dispatch = useDispatch();
  const showAddFriend = () => {
    dispatch(chatActions.toggleAddFriendSearch(true));
  };
  useEffect(() => {
    dispatch(chatActions.fetchFriendsList());
  }, []);
  return (
    <>
      <div className="addFriend" onClick={showAddFriend}>
        <em>+</em> Add Friend
      </div>
      {friendsList && friendsList.length ? (
        friendsList.map((friend: IFriend) => (
          <FriendListItem friend={friend} key={friend.Id} />
        ))
      ) : (
        <NoRecord>No friends added yet!</NoRecord>
      )}
    </>
  );
};

export default FriendList;
