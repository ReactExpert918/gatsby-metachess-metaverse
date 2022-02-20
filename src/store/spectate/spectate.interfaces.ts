import { AI_PLAY_MODE } from "../../constants/playModes";
import {
  GameRules,
  IMoveSocket,
  PieceSide,
  ILoseMatchForLeaving,
  ISpectSocket,
} from "../../interfaces/game.interfaces";
import { IUser } from "../user/user.interfaces";
import { Timer } from "../../lib/timer";
import { SpectatingRoomInfo } from "../../lib/spectate";

export interface ISpectateReducer {
  roomInfo: SpectatingRoomInfo;
}

export interface IGameplayElos {
  eloWin: number;
  eloLose: number;
  eloDraw: number;
}

export interface ITimer {
  black: number;
  white: number;
}

export interface IMoveWithTimestamp {
  move: string;
  timestamp: number;
  fen?: string;
  isCheck?: boolean;
  isCheckmate?: boolean;
  isDraw?: boolean;
  isRepetition?: boolean;
  isStalemate?: boolean;
}
