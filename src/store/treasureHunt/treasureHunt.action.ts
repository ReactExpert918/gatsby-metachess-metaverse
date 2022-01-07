import { createAction } from "../generators";
import { move } from "./treasureHunt.interface";

export enum ACTION_TYPE {
  "SET_ON_MOVE" = "SET_ON_MOVE",
  "RESET_GAME" = "RESET_GAME",
  "CLAIM_SHAH" = "CLAIM_SHAH",
}

export const Actions = {
  onMove: createAction<move>(ACTION_TYPE.SET_ON_MOVE),
  resetGame: createAction<null>(ACTION_TYPE.RESET_GAME),
  claimShah: createAction<null>(ACTION_TYPE.CLAIM_SHAH),
};
