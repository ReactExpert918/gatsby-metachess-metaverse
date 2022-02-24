import SocketService from "../services/socket.service";
import { IUser } from "../store/user/user.interfaces";
import { GameRules, PieceSide } from "../interfaces/game.interfaces";
import { navigate } from "gatsby";
import store from "../store";
import { Actions as gameplayActions } from "../store/gameplay/gameplay.action";
import { Actions as userActions } from "../store/user/user.action";
import { IGameplayElos } from "../store/gameplay/gameplay.interfaces";

interface GameStartParams {
  opponent: IUser;
  user: IUser;
  gameRules: GameRules;
  side: PieceSide;
  startDate: number;
  gameElos: IGameplayElos;
}

const subscribeToGameStart = (beforeNavigateCb?: () => void) => {
  SocketService.subscribeTo({
    eventName: "game-start",
    callback: (params: GameStartParams) => {
      startGame(params, beforeNavigateCb);
      console.log("Game start", params);
      store.dispatch(userActions.setCurrentUser({...params.user}));
      store.dispatch(gameplayActions.setGameElos({...params.gameElos}));
    },
  });
};

export const startGame = (
  params: GameStartParams,
  beforeNavigateCb?: () => void
) => {
  store.dispatch(
    gameplayActions.setPlayerColor(
      params.side === PieceSide.Black ? "b" : "w"
    )
  );
  store.dispatch(gameplayActions.setOpponent(params.opponent));
  store.dispatch(
    gameplayActions.setGameRules({
      ...params.gameRules
    })
  );

  store.dispatch(gameplayActions.setGameStartDate(params.startDate));
  store.dispatch(gameplayActions.setGameWinner(null));

  store.dispatch(
    gameplayActions.setPlayMode({
      isAI: false,
      aiMode: null,
      isHumanVsHuman: true,
      isCreate: false,
    })
  );
  store.dispatch(gameplayActions.startGame());
  if (beforeNavigateCb) {
    beforeNavigateCb();
  }
  navigate("/game");
}

export default subscribeToGameStart;
