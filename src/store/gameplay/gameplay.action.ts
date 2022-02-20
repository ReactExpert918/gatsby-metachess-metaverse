import { createAction } from "../generators";
import {
  ISetPlayModePayload,
  ITimer,
  IMoveWithTimestamp,
  IGameResume,
  IGameplayElos,
} from "./gameplay.interfaces";
import {
  GameRules,
  ILoseMatchForLeaving,
} from "../../interfaces/game.interfaces";
import { IUser } from "../user/user.interfaces";

export enum ACTION_TYPE {
  "SET_ON_MOVE" = "gameplay_SET_ON_MOVE",
  "SET_MOVE_HISTORY" = "gameplay_SET_MOVE_HISTORY",
  "ADD_IN_MOVE_HISTORY" = "gameplay_ADD_IN_MOVE_HISTORY",
  "SET_PLAY_MODE" = "gameplay_SET_PLAY_MODE",
  "SET_GAME_RULES" = "gameplay_SET_GAME_RULES",
  "SET_PLAYER_COLOR" = "gameplay_SET_PLAYER_COLOR",
  "SET_OPPONENT" = "gameplay_SET_OPPONENT",
  "CLEAR" = "gameplay_CLEAR",
  "SET_LAST_TIMESTAMP" = "gameplay_SET_LAST_TIMESTAMP",
  "SET_LAST_TIMESTAMP_FIRST_MOVE" = "gameplay_SET_LAST_TIMESTAMP_FIRST_MOVE",
  "SET_TIMER" = "gameplay_SET_TIMER",
  "SET_FIRST_TIMER" = "gameplay_SET_FIRST_TIMER",
  "STOP_TIMERS" = "gameplay_STOP_TIMERS",
  "ADD_TO_HISTORY_WITH_TIMESTAMP" = "gameplay_ADD_TO_HISTORY_WITH_TIMESTAMP",
  "SET_HISTORY_WITH_TIMESTAMP" = "gameplay_SET_HISTORY_WITH_TIMESTAMP",
  "SET_LOSE_MATCH_FOR_LEAVING" = "gameplay_SET_LOSE_MATCH_FOR_LEAVING",
  "SET_REPLAY" = "gameplay_SET_REPLAY",

  "SET_GAME_START_DATE" = "gameplay_SET_GAME_START_DATE",
  "SET_GAME_END_DATE" = "gameplay_SET_GAME_END_DATE",
  "SET_GAME_ELOS" = "gameplay_SET_GAME_ELOS",
  "SET_WINNER" = "gameplay_SET_WINNER",

  "START_GAME" = "gameplay_START_GAME",
  "SET_MISSED_SOCKET_ACTIONS" = "gameplay_SET_MISSED_SOCKET_ACTIONS",
  "SET_GAME_MOUNTED" = "gameplay_SET_GAME_MOUNTED",
  "SET_RESUME_PARAMETERS" = "gameplay_SET_RESUME_PARAMETERS",
  "RESUME_GAME" = "gameplay_RESUME_GAME",
  "SET_SPECTATORS" = "gameplay_SET_SPECTATORS",
}

export const Actions = {
  onMove: createAction<string>(ACTION_TYPE.SET_ON_MOVE),
  setMoveHistory: createAction<string[]>(ACTION_TYPE.SET_MOVE_HISTORY),
  addInMoveHistory: createAction<string>(ACTION_TYPE.ADD_IN_MOVE_HISTORY),
  setPlayMode: createAction<Partial<ISetPlayModePayload>>(
    ACTION_TYPE.SET_PLAY_MODE
  ),
  setGameRules: createAction<Partial<GameRules>>(ACTION_TYPE.SET_GAME_RULES),
  setPlayerColor: createAction<"b" | "w">(ACTION_TYPE.SET_PLAYER_COLOR),
  setOpponent: createAction<IUser>(ACTION_TYPE.SET_OPPONENT),
  clear: createAction<any>(ACTION_TYPE.CLEAR),
  setLastTimestamp: createAction<number>(ACTION_TYPE.SET_LAST_TIMESTAMP),
  setFirstMoveTimer: createAction<number>(
    ACTION_TYPE.SET_LAST_TIMESTAMP_FIRST_MOVE
  ),
  setTimer: createAction<ITimer>(ACTION_TYPE.SET_TIMER),
  setFirstTimer: createAction<ITimer>(ACTION_TYPE.SET_FIRST_TIMER),
  setLoseMatchForLeaving: createAction<ILoseMatchForLeaving>(
    ACTION_TYPE.SET_LOSE_MATCH_FOR_LEAVING
  ),
  stopTimers: createAction<void>(ACTION_TYPE.STOP_TIMERS),
  addToHistoryWithTimestamp: createAction<IMoveWithTimestamp>(
    ACTION_TYPE.ADD_TO_HISTORY_WITH_TIMESTAMP
  ),
  setHistoryWithTimestamp: createAction<IMoveWithTimestamp[]>(
    ACTION_TYPE.SET_HISTORY_WITH_TIMESTAMP
  ),
  setReplay: createAction<boolean>(ACTION_TYPE.SET_REPLAY),

  setGameStartDate: createAction<number>(ACTION_TYPE.SET_GAME_START_DATE),
  setGameEndDate: createAction<number>(ACTION_TYPE.SET_GAME_END_DATE),
  setGameElos: createAction<IGameplayElos>(ACTION_TYPE.SET_GAME_ELOS),
  setGameWinner: createAction<"b" | "w" | "draw">(ACTION_TYPE.SET_WINNER),

  startGame: createAction<any>(ACTION_TYPE.START_GAME),
  setMissedSocketActions: createAction<any[]>(
    ACTION_TYPE.SET_MISSED_SOCKET_ACTIONS
  ),
  setGameMounted: createAction<boolean>(ACTION_TYPE.SET_GAME_MOUNTED),

  resumeGame: createAction<IGameResume>(ACTION_TYPE.RESUME_GAME),
  setResumeParameters: createAction<{ isResume: boolean; gameFen: string }>(
    ACTION_TYPE.SET_RESUME_PARAMETERS
  ),
  setSpectators: createAction<Partial<IUser>[]>(ACTION_TYPE.SET_SPECTATORS),
};
