import { takeLatest, select, put } from "redux-saga/effects";
import { ACTION_TYPE } from "./gameplay.action";
import { Actions as gameplayActions } from "./gameplay.action";
import { IAppState } from "../reducers";
import { GameRules, PieceSide } from "../../interfaces/game.interfaces";
import { Timer } from "../../lib/timer";
import store from "..";
import { IGameResume } from "./gameplay.interfaces";
import { pullAllBy } from "lodash";
import { navigate } from "gatsby";
import { IUser } from "../user/user.interfaces";

let BLACK_TIMER: Timer = null;
let WHITE_TIMER: Timer = null;

const dispatchTimerChange = () => {
  if (!WHITE_TIMER || !BLACK_TIMER) {
    return;
  }
  store.dispatch(
    gameplayActions.setTimer({
      white: WHITE_TIMER.timeLeft,
      black: BLACK_TIMER.timeLeft,
    })
  );
};

function* onGameplayMoveHistory({ payload }: { payload: string }) {
  try {
    const {
      gameplay: { moveHistory },
    } = yield select();
    moveHistory.push(payload);
    yield put(gameplayActions.setMoveHistory(moveHistory));
  } catch (e) {
    console.log("err", e);
  }
}

function* onGameStart() {
  const {
    gameplay: { startGameDate, gameRules, onMove },
  } = (yield select()) as IAppState;

  if (!gameRules) return;

  BLACK_TIMER = new Timer(
    gameRules.time.base,
    gameRules.time.increment,
    startGameDate
  );
  WHITE_TIMER = new Timer(
    gameRules.time.base,
    gameRules.time.increment,
    startGameDate
  );

  yield put(
    gameplayActions.setTimer({
      black: BLACK_TIMER.timeLeft,
      white: WHITE_TIMER.timeLeft,
    })
  );
}

function* onSetLastTimestamp({ payload }: { payload: number }) {
  const { gameplay } = (yield select()) as IAppState;

  if (!WHITE_TIMER && BLACK_TIMER) {
    BLACK_TIMER.finished = true;
    BLACK_TIMER.stop(payload);
    BLACK_TIMER.clear();
    BLACK_TIMER = null;
  }
  if (!BLACK_TIMER && WHITE_TIMER) {
    WHITE_TIMER.finished = true;
    WHITE_TIMER.stop(payload);
    WHITE_TIMER.clear();
    BLACK_TIMER = null;
  }

  if (!BLACK_TIMER || !WHITE_TIMER) {
    return;
  }

  if (gameplay.onMove === "b") {
    BLACK_TIMER.reinit(payload, dispatchTimerChange);
    WHITE_TIMER.stop(payload);
  } else {
    WHITE_TIMER.reinit(payload, dispatchTimerChange);
    BLACK_TIMER.stop(payload);
  }
}

function* onClear() {
  if (BLACK_TIMER) {
    BLACK_TIMER.clear();
    BLACK_TIMER.finished = true;
  }
  if (WHITE_TIMER) {
    WHITE_TIMER.clear();
    WHITE_TIMER.finished = true;
  }
  BLACK_TIMER = null;
  WHITE_TIMER = null;
}

function* onResumeGame({ payload }: { payload: IGameResume }) {
  const { gameRules, side, timeLeft, opponentTimeLeft, isYourTurn, gameElos } =
    payload;

  BLACK_TIMER = new Timer(
    gameRules.time.base,
    gameRules.time.increment,
    payload.startDate
  );
  WHITE_TIMER = new Timer(
    gameRules.time.base,
    gameRules.time.increment,
    payload.startDate
  );

  const lastTimestamp =
    payload.history.length > 0
      ? payload.history[payload.history.length - 1].timestamp
      : payload.startDate;

  if (side === PieceSide.White) {
    if (isYourTurn) {
      BLACK_TIMER.stop(lastTimestamp);
      WHITE_TIMER.reinit(lastTimestamp, dispatchTimerChange);
    } else {
      WHITE_TIMER.stop(lastTimestamp);
      BLACK_TIMER.reinit(lastTimestamp, dispatchTimerChange);
    }

    WHITE_TIMER.timeLeft = timeLeft;
    BLACK_TIMER.timeLeft = opponentTimeLeft;
  } else {
    if (isYourTurn) {
      WHITE_TIMER.stop(lastTimestamp);
      BLACK_TIMER.reinit(lastTimestamp, dispatchTimerChange);
    } else {
      BLACK_TIMER.stop(lastTimestamp);
      WHITE_TIMER.reinit(lastTimestamp, dispatchTimerChange);
    }

    BLACK_TIMER.timeLeft = timeLeft;
    WHITE_TIMER.timeLeft = opponentTimeLeft;
  }

  yield put(
    gameplayActions.setTimer({
      white: WHITE_TIMER.timeLeft,
      black: BLACK_TIMER.timeLeft,
    })
  );

  yield put(gameplayActions.setGameElos(gameElos));

  yield put(
    gameplayActions.setPlayerColor(payload.side === PieceSide.Black ? "b" : "w")
  );

  yield put(gameplayActions.setOpponent(payload.opponent as IUser));

  yield put(gameplayActions.setGameRules(payload.gameRules));

  yield put(gameplayActions.setGameStartDate(payload.startDate));

  yield put(gameplayActions.setGameWinner(null));

  yield put(
    gameplayActions.setPlayMode({
      isAI: false,
      aiMode: null,
      isHumanVsHuman: true,
      isCreate: false,
    })
  );

  const lastFen = payload.history[payload.history.length - 1]?.fen;

  yield put(
    gameplayActions.setResumeParameters({
      isResume: true,
      gameFen: lastFen,
    })
  );

  yield put(gameplayActions.setMoveHistory(payload.history.map((x) => x.move)));
  yield put(
    gameplayActions.setHistoryWithTimestamp(
      payload.history.map((x) => ({ move: x.move, timestamp: x.timestamp }))
    )
  );

  // payload.history.forEach((x, index) => {
  //   if (index % 2 === 0) {
  //     BLACK_TIMER.reinit(x.timestamp, dispatchTimerChange);
  //     WHITE_TIMER.stop(x.timestamp);
  //   } else {
  //     WHITE_TIMER.reinit(x.timestamp, dispatchTimerChange);
  //     BLACK_TIMER.stop(x.timestamp);
  //   }
  // });

  // const lastTimeStamp =
  //   payload.history[payload.history.length - 1]?.timestamp ?? payload.startDate;
  // const now = Date.now();
  // if (payload.history.length % 2 === 0) {
  //   WHITE_TIMER.timeLeft -= now - lastTimeStamp;
  // } else {
  //   BLACK_TIMER.timeLeft -= now - lastTimeStamp;
  // }

  yield put(
    gameplayActions.onMove(payload.history.length % 2 === 0 ? "w" : "b")
  );

  navigate("/game");
}

function* watchResumeGame() {
  yield takeLatest(ACTION_TYPE.RESUME_GAME as any, onResumeGame);
}

function* watchGameplayMoveHistory() {
  yield takeLatest(
    ACTION_TYPE.ADD_IN_MOVE_HISTORY as any,
    onGameplayMoveHistory
  );
}

function* watchSetLastTimestamp() {
  yield takeLatest(ACTION_TYPE.SET_LAST_TIMESTAMP as any, onSetLastTimestamp);
}

function* watchGameStart() {
  yield takeLatest(ACTION_TYPE.START_GAME as any, onGameStart);
}

function* watchClear() {
  yield takeLatest(ACTION_TYPE.CLEAR as any, onClear);
}

function* watchStopTimers() {
  yield takeLatest(ACTION_TYPE.STOP_TIMERS as any, onClear);
}

export default [
  watchGameplayMoveHistory,
  watchSetLastTimestamp,
  watchGameStart,
  watchClear,
  watchStopTimers,
  watchResumeGame,
];
