import { createAction } from "../generators";
import { IFriend } from "./chat.interfaces";

export enum ACTION_TYPE {
  "TOGGLE_SIDE_CHAT" = "CHAT_TOGGLE_SIDE_CHAT",
  "TOGGLE_ADD_FRIEND_SEARCH" = "CHAT_TOGGLE_ADD_FRIEND",

  "FETCH_FRIENDS_LIST" = "CHAT_FETCH_FRIENDS_LIST",
  "SET_FRIENDS_LIST" = "CHAT_SET_FRIENDS_LIST",
  "FETCH_FRIENDS_REQUESTS" = "CHAT_FETCH_FRIENDS_REQUESTS",
  "SET_FRIENDS_REQUESTS" = "CHAT_SET_FRIENDS_REQUESTS",
  "ADD_FRIEND_REQUEST" = "CHAT_ADD_FRIEND_REQUEST",
  "SEND_FRIENDS_REQUESTS" = "CHAT_SEND_FRIENDS_REQUESTS",
  "ACCEPT_FRIEND_REQUEST" = "CHAT_ACCEPT_FRIEND_REQUEST",
  "REJECT_FRIEND_REQUEST" = "CHAT_REJECT_FRIEND_REQUEST",
  "ADD_FRIEND" = "CHAT_ADD_FRIEND",
  "REMOVE_FRIEND" = "CHAT_REMOVE_FRIEND",
}

export const chatActions = {
  toggleSideChat: createAction<boolean>(ACTION_TYPE.TOGGLE_SIDE_CHAT),
  toggleAddFriendSearch: createAction<boolean>(
    ACTION_TYPE.TOGGLE_ADD_FRIEND_SEARCH
  ),
  fetchFriendsList: createAction<any>(ACTION_TYPE.FETCH_FRIENDS_LIST),
  setFriendsList: createAction<IFriend[]>(ACTION_TYPE.SET_FRIENDS_LIST),

  fetchFriendsRequestsList: createAction<any>(
    ACTION_TYPE.FETCH_FRIENDS_REQUESTS
  ),
  setFriendsRequestsList: createAction<IFriend[]>(
    ACTION_TYPE.SET_FRIENDS_REQUESTS
  ),
  addFriendRequest: createAction<IFriend>(ACTION_TYPE.ADD_FRIEND_REQUEST),
  sendFriendsRequests: createAction<any>(ACTION_TYPE.SEND_FRIENDS_REQUESTS),
  acceptFriendsRequest: createAction<any>(ACTION_TYPE.ACCEPT_FRIEND_REQUEST),
  refuseFriendsRequest: createAction<any>(ACTION_TYPE.REJECT_FRIEND_REQUEST),
  addFriend: createAction<IFriend>(ACTION_TYPE.ADD_FRIEND),
  removeFriend: createAction<any>(ACTION_TYPE.REMOVE_FRIEND),
};
