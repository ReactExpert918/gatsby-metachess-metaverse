import { IMessage } from "../../components/ChessChat";

export interface IChatReducer {
  chatOpened: boolean;
  addFriendSearch: boolean;
  activeChats: IChatItem[];
  chatList: IChatItem[];
  friendsList: IFriend[];
  friendRequests: IFriendRequest[];
}

export interface IChatItem {
  id: string;
  name: string;
  unseenCount: number;
  messages?: IMessage[];
  status?: 'online' | string;
}

export interface IFriendRequest {
  id: string;
  name: string;
}
export interface IFriend {
  id: string;
  name: string;
}
