import { IMessage } from "../../components/ChessChat";
import { IUser } from "../user/user.interfaces";

export interface IChatReducer {
  chatOpened: boolean;
  addFriendSearch: boolean;
  activeChats: IChatItem[];
  chatList: IChatItem[];
  friendsList: IFriend[];
  friendRequests: IFriend[];
}

export interface IChatItem {
  id: string;
  name: string;
  unseenCount: number;
  messages?: IMessage[];
  status?: "online" | string;
}
export interface IFriend {
  Id: string;
  Account: IUser & {
    Fullname: string;
    IsOnline?: boolean;
  };
}
