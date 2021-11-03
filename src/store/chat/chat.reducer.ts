import { Action } from "../generators";
import { ACTION_TYPE } from "./chat.actions";
import { IChatReducer } from "./chat.interfaces";

const INITIAL_STATE: IChatReducer = {
  chatOpened: false,
  addFriendSearch: false,
  friendRequests: [],
  activeChats: [
    {
      id: "0",
      name: "John Doe",
      unseenCount: 2,
      messages: [
        {
          id: "0",
          senderId: "0",
          text: "What a nice move you made there!!",
          time: new Date(),
        },
        {
          id: "1",
          senderId: "1",
          text: "Hehe thanks!",
          time: new Date(),
        },
      ],
    },
    {
      id: "1",
      name: "John Doe",
      unseenCount: 2,
      messages: [
        {
          id: "0",
          senderId: "0",
          text: "What a nice move you made there!!",
          time: new Date(),
        },
        {
          id: "1",
          senderId: "1",
          text: "Hehe thanks!",
          time: new Date(),
        },
      ],
    },
  ],
  chatList: [
  ],
  friendsList: [
  ],
};

export default (
  state: IChatReducer = INITIAL_STATE,
  action: Action
): IChatReducer => {
  return {
    ...state,
    ...{
      [action.type]: {},
      [ACTION_TYPE.TOGGLE_SIDE_CHAT]: {
        chatOpened: !!action.payload ? action.payload : !state.chatOpened,
        addFriendSearch: state.chatOpened ? false : state.addFriendSearch,
      },
      [ACTION_TYPE.TOGGLE_ADD_FRIEND_SEARCH]: {
        addFriendSearch: !!action.payload
          ? action.payload
          : !state.addFriendSearch,
      },
      [ACTION_TYPE.SET_FRIENDS_LIST]: {
        friendsList: action.payload,
      },
      [ACTION_TYPE.SET_FRIENDS_REQUESTS]: {
        friendRequests: action.payload,
      },
    }[action.type],
  };
};
