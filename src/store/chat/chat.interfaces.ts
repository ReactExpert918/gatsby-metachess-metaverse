import { IMessage } from "../../components/ChessChat";

export interface IChatReducer {
  chatOpened: boolean;
  activeChats: IChatItem[];
  chatList: IChatItem[];
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
