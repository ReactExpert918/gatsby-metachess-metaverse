import { Action } from "../generators";
import { ACTION_TYPE } from "./treasureHunt.action";
import { ITreasureHuntReducer, move } from "./treasureHunt.interface";

const INITIAL_STATE: ITreasureHuntReducer = {
  moveList: [],
  chancesRemaining: 6,
  lootAcquired: 0,
  gameOver: false,
  playMode: null,
  startGameDate: null,
  endGameDate: null,
  gameInProgressUserNavigating: false,
  gameInProgress: false,
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
        moveList: [...state.moveList, action.payload?.move],
        lootAcquired: state.lootAcquired + action.payload?.loot,
        chancesRemaining: state.chancesRemaining - 1,
      },
      [ACTION_TYPE.CLAIM_SHAH]: {
        lootAcquired: 0,
      },
      [ACTION_TYPE.SET_GAME_END_DATE]: {
        endGameDate: action.payload,
        gameOver: true,
        gameInProgress: false,
      },
      [ACTION_TYPE.SET_GAME_START_DATE]: {
        startGameTime: action.payload,
      },
      [ACTION_TYPE.SET_GAME_RESUMED]: {
        moveList: action.payload?.moveList,
        chancesRemaining: 6 - action.payload?.moveList?.length,
        lootAcquired: action.payload?.loot,
        gameInProgress: true,
      },
      [ACTION_TYPE.RESET_GAME]: {
        moveList: [],
        chancesRemaining: 6,
        lootAcquired: 0,
        gameOver: false,
        gameInProgress: true,
      },
      [ACTION_TYPE.SET_GAME_IN_PROGRESS]: {
        gameInProgress: action.payload,
      },
      [ACTION_TYPE.SET_GAME_IN_PROGRESS_USER_NAVIGATING]: {
        gameInProgressUserNavigating: action.payload,
      },
    }[action.type],
  };
};
