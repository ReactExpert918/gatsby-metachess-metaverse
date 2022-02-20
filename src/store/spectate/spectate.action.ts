import { createAction } from "../generators";
import {
  ITimer,
  IMoveWithTimestamp,
  IGameplayElos,
} from "./spectate.interfaces";
import { GameRules } from "../../interfaces/game.interfaces";
import { IUser } from "../user/user.interfaces";
import { SpectatingRoomInfo } from "../../lib/spectate";

export enum ACTION_TYPE {
  "SET_ROOM_INFO" = "spectate_SET_ROOM_INFO",
  "SET_TIMER" = "spectate_SET_TIMER",
  "ADD_IN_MOVE_HISTORY" = "spectate_ADD_IN_MOVE_HISTORY",
  "SET_ON_MOVE" = "spectate_SET_ON_MOVE",
  "SET_MOVE_HISTORY" = "spectate_SET_MOVE_HISTORY",
  "SET_GAME_END_DATE" = "spectate_SET_GAME_END_DATE",
  "SET_GAME_WINNER" = "spectate_SET_GAME_WINNER",
  "STOP_TIMERS" = "spectate_STOP_TIMERS",
  "SET_REPLAY" = "spectate_SET_REPLAY",
}

export const Actions = {
  setRoomInfo: createAction<SpectatingRoomInfo>(ACTION_TYPE.SET_ROOM_INFO),
  setTimer: createAction<ITimer>(ACTION_TYPE.SET_TIMER),
  addInMoveHistory: createAction<IMoveWithTimestamp>(
    ACTION_TYPE.ADD_IN_MOVE_HISTORY
  ),
  setOnMove: createAction<string>(ACTION_TYPE.SET_ON_MOVE),
  setGameEndDate: createAction<number>(ACTION_TYPE.SET_GAME_END_DATE),
  setGameWinner: createAction<"b" | "w" | "draw">(ACTION_TYPE.SET_GAME_WINNER),
  stopTimers: createAction<void>(ACTION_TYPE.STOP_TIMERS),
  setMoveHistory: createAction<string[]>(ACTION_TYPE.SET_MOVE_HISTORY),
  setReplay: createAction<boolean>(ACTION_TYPE.SET_REPLAY),
};
