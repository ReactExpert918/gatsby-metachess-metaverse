import { Action } from "../generators";
import { ACTION_TYPE } from "./treasureHunt.action";
import { ITreasureHuntReducer, move } from "./treasureHunt.interface";

const INITIAL_STATE: ITreasureHuntReducer = {
  moveList: [],
  chancesRemaining: 6,
  lootAcquired: 0,
  gameOver: false,
};

export default (
  state: ITreasureHuntReducer = INITIAL_STATE,
  action: Action
): ITreasureHuntReducer => {
  return {
    ...state,
    ...{
      [action.type]: {},
      [ACTION_TYPE.SET_ON_MOVE]: {
        moveList: [...state.moveList, action.payload],
        chancesRemaining: state.chancesRemaining - 1,
        gameOver: state.chancesRemaining === 1,
      },
      [ACTION_TYPE.CLAIM_SHAH]: {
        lootAcquired: 0,
      },

      [ACTION_TYPE.RESET_GAME]: {
        moveList: [],
        chancesRemaining: 6,
        lootAcquired: 0,
        gameOver: false,
      },
    }[action.type],
  };
};
