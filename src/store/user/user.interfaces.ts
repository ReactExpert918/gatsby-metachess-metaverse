import { MODES } from "../../constants/playModes";
import {
  GameMode,
  PieceSide,
  ResultCondition,
} from "../../interfaces/game.interfaces";

export enum MAINTENANCE_MODE {
  ONLINE,
  GAMEPLAY_DISABLED,
  OFFLINE,
}
export interface IUserReducer {
  currentUser: IUser;
  matchesHistory: IMatchHistory[];
  serverStatus: IServerStatus;
  choseMode: MODES;
  searchedUsersList: IUser[];
  alreadyAuthenticated: boolean;
}

export interface IMatchHistory {
  BoardMoves: string;
  EloEarned: number;
  GameMode: GameMode;
  Id: number;
  Identifier: string;
  Opponent: IUser;
  PieceSide: PieceSide;
  Time: { base: number; increment: number };
  Winner: { Id?: number; GuestId?: number };
  StartDate: number;
  EndDate: number;
  ResultCondition: ResultCondition;
}

export interface IUser {
  Id: number;
  Username: string;
  Email: string;
  ClassicalElo: number;
  BlitzElo: number;
  BulletElo: number;
  RapidElo: number;
  GuestId?: number;
  WonGames: number;
  TreasureGamesPlayedToday: number;
  Avatar: string;
  Settings: string;
}
export interface IServerStatus {
  Status: MAINTENANCE_MODE;
  Level1TreasureValue: number;
  Level2TreasureValue: number;
  Level3TreasureValue: number;
  TreasureQuestAttempts: number;
  TreasureQuestGamesPerDay: number;
  BoardOddSquaresColor: string;
  BoardEvenSquaresColor: string;
  BoardLastPlaySquaresColor: string;
  BoardPossibleMovesColor: string;
  BoardPossibleCapturesColor: string;
  BoardCheckSquaresColor: string;
}
