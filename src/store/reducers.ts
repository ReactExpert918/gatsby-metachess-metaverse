import { combineReducers } from 'redux';
import testReducer from './test/reducer';
import gameplayReducer from './gameplay/gameplay.reducer';
import userReducer from './user/user.reducer';
import { IGameplayReducer } from './gameplay/gameplay.interfaces';
import { IChatReducer } from './chat/chat.interfaces';
import chatReducer from './chat/chat.reducer';
import { IUserReducer } from './user/user.interfaces';
import { IGamesReducer } from './games/games.interfaces';
import gamesReducer from './games/games.reducer';

export interface IAppState {
  test: ITestReducer;
  gameplay: IGameplayReducer;
  chat: IChatReducer;
  user: IUserReducer;
  games: IGamesReducer;
}

const reducers = combineReducers({
  test: testReducer,
  gameplay: gameplayReducer,
  chat: chatReducer,
  user: userReducer,
  games: gamesReducer,
});

export default reducers;
