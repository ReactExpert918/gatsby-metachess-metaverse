import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocketService from "../../services/socket.service";
import { chatActions } from "../../store/chat/chat.actions";
import { IFriend } from "../../store/chat/chat.interfaces";
import { IAppState } from "../../store/reducers";
import FriendListItem from "./FriendListItem";
import NoRecord from "./NoRecord";

export interface ISocketFriend {
  Id: string;
  Online?: boolean;
}

const FriendList = (): JSX.Element => {
  const { friendsList } = useSelector((state: IAppState) => state.chat);
  const dispatch = useDispatch();
  const showAddFriend = () => {
    dispatch(chatActions.toggleAddFriendSearch(true));
  };

  const updateFriendStatus = (friend: ISocketFriend) => {
    const friendIndex = friendsList.findIndex((f) => f.Id === friend.Id);
    friendsList[friendIndex].Account.IsOnline = friend.Online;
    dispatch(chatActions.setFriendsList(friendsList));
  };

  useEffect(() => {
    dispatch(chatActions.fetchFriendsList());
  }, []);

  useEffect(() => {
    if (friendsList.length === 0) {
      return;
    }

    SocketService.subscribeTo({
      eventName: "friend-status",
      callback: (friend: ISocketFriend) => {
        updateFriendStatus(friend);
      },
    });
  }, [friendsList]);

  return (
    <>
      <div className="addFriend" onClick={showAddFriend}>
        + Add Friend
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
