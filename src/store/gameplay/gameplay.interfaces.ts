import { AI_PLAY_MODE } from "../../constants/playModes";
import { GameRules, IMoveSocket, PieceSide, ILoseMatchForLeaving } from "../../interfaces/game.interfaces";
import { IUser } from "../user/user.interfaces";
import { Timer } from "../../lib/timer";

export interface IGameplayReducer {
  playerColor: "b" | "w";
  onMove: "b" | "w";
  moveHistory: string[];
  playMode: ISetPlayModePayload;
  gameRules: GameRules;
  opponent: IUser;
  lastTimestamp: number;
  timer: ITimer;
  historyWithTimestamp: IMoveWithTimestamp[];
  startGameDate: number;
  endGameDate: number;
  winner: 'b' | 'w';
  isReplay: boolean;
  missedSocketActions: any[];
  gameMounted: boolean;
  isResume: boolean;
  gameFen: string;
  gameElos: IGameplayElos;
  loseMatchForLeaving: ILoseMatchForLeaving;
}

export interface ISetPlayModePayload {
  isAI: boolean;
  aiMode: AI_PLAY_MODE;
  isHumanVsHuman: boolean;
  roomName: string;
  isCreate: boolean;
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
}

export enum ResultCondition {
  Gameplay = 1,
  Timeout,
  Resign,
  Leave,
  DrawRequest
};

export interface IGameResume {
  identifier: string;
  opponent: Partial<IUser>;
  gameRules: GameRules;
  history: IMoveSocket[];
  opponentTimeLeft: number;
  timeLeft: number;
  isYourTurn: boolean;
  side: PieceSide;
  startDate: number;
  gameElos: IGameplayElos
}
