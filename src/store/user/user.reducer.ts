import { MODES } from "../../constants/playModes";
import { Action } from "../generators";
import { ACTION_TYPE } from "./user.action";
import { IUserReducer } from "./user.interfaces";

const INITIAL_STATE: IUserReducer = {
  currentUser: null,
  matchesHistory: null,
  serverStatus: null,
  choseMode: MODES.CHOSE_MODE,
};

export default (
  state: IUserReducer = INITIAL_STATE,
  action: Action
): IUserReducer => {
  return {
    ...state,
    ...{
      [action.type]: {},
      [ACTION_TYPE.SET_CURRENT_USER]: {
        currentUser: action.payload,
      },
      [ACTION_TYPE.SET_MATCHES_HISTORY]: {
        matchesHistory: action.payload,
      },
      [ACTION_TYPE.SET_SERVER_STATUS]: {
        serverStatus: action.payload,
      },
      [ACTION_TYPE.SET_CHOSE_MODE]: {
        choseMode: action.payload,
      },
    }[action.type],
  };
};
