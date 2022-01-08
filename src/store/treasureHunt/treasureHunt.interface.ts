import { TREASURE_QUEST_MODES } from "../../constants/playModes";

export interface move {
  [square: string]: number;
}
interface moveList extends Array<move> {}
export interface ISetPlayModePayload {
  treasureQuestMode: TREASURE_QUEST_MODES;
}
export interface ITreasureHuntReducer {
  moveList: moveList;
  chancesRemaining: number;
  lootAcquired: number;
  gameOver: boolean;
  startGameDate: number;
  endGameDate: number;
  playMode: ISetPlayModePayload;
}
