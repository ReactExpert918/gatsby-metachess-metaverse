import { createAction } from "../generators";

export enum ACTION_TYPE {
  "TOGGLE_SIDE_CHAT" = "CHAT_TOGGLE_SIDE_CHAT",
  "TOGGLE_ADD_FRIEND_SEARCH" = "CHAT_TOGGLE_ADD_FRIEND",
}

export const chatActions = {
  toggleSideChat: createAction<boolean>(ACTION_TYPE.TOGGLE_SIDE_CHAT),
  toggleAddFriendSearch: createAction<boolean>(ACTION_TYPE.TOGGLE_ADD_FRIEND_SEARCH),
};
