import { ISetPlayModePayload, moveList } from "./treasureHunt.interface";
import { createAction } from "../generators";
import { move } from "./treasureHunt.interface";

export enum ACTION_TYPE {
  "SET_ON_MOVE" = "SET_ON_MOVE",
  "RESET_GAME" = "RESET_GAME",
  "CLAIM_SHAH" = "CLAIM_SHAH",
  "SET_TREASURE_MODE" = "SET_TREASURE_MODE",
  "SET_GAME_START_DATE" = "SET_GAME_START_DATE",
  "SET_GAME_END_DATE" = "SET_GAME_END_DATE",
  "SET_GAME_RESUMED" = "SET_GAME_RESUMED",
  "SET_IS_RESUME" = "SET_IS_RESUME",
}

export const Actions = {
  onMove: createAction<move>(ACTION_TYPE.SET_ON_MOVE),
  resetGame: createAction<null>(ACTION_TYPE.RESET_GAME),
  claimShah: createAction<null>(ACTION_TYPE.CLAIM_SHAH),
  setTreasureQuestMode: createAction<ISetPlayModePayload>(
    ACTION_TYPE.SET_TREASURE_MODE
  ),
  setGameStartDate: createAction<number>(ACTION_TYPE.SET_GAME_START_DATE),
  setGameEndDate: createAction<number>(ACTION_TYPE.SET_GAME_END_DATE),
  resumeGame: createAction<{ moveList: moveList; loot: number }>(
    ACTION_TYPE.SET_GAME_RESUMED
  ),
  setIsResume: createAction<boolean>(ACTION_TYPE.SET_IS_RESUME),
};
