import { put, takeLatest } from "redux-saga/effects";
import { Actions, ACTION_TYPE } from "./leaderboard.action";
import API from "../../services/api.service";
import { ENDPOINTS } from "../../services/endpoints";
import {
  IFetchLeaderboardPayload,
  IFetchLeaderboardPayloadRating,
  ILeaderBoardResult,
  LeaderboardType,
} from "./leaderboard.interfaces";

function* onFetchAILeaderboard({
  payload,
}: {
  payload: IFetchLeaderboardPayload;
}) {
  try {
    const queryParams: IQuery[] = Object.keys(payload).map(
      (key: any): IQuery => {
        return { name: key, value: payload[key] };
      }
    );
    const leaderboard: ILeaderBoardResult[] = yield API.execute(
      "GET",
      ENDPOINTS.GET_AI_GAMES_LEADERBOARD,
      null,
      queryParams
    );
    yield put(Actions.setAiGamesLeaderboard(leaderboard));
  } catch (e) {
    console.log(e);
  }
}

function* onFetchQuickPlayLeaderboard({
  payload,
}: {
  payload: IFetchLeaderboardPayload;
}) {
  try {
    // console.log(payload);
    const queryParams: IQuery[] = Object.keys(payload).map(
      (key: any): IQuery => {
        return { name: key, value: payload[key] };
      }
    );
    console.log(queryParams);
    const leaderboard: ILeaderBoardResult[] = yield API.execute(
      "GET",
      ENDPOINTS.GET_QUICKPLAY_LEADERBOARD,
      //   payload,
      null,
      queryParams
    );
    console.log(leaderboard);
    yield put(Actions.setQuickPlayLeaderboard(leaderboard));
  } catch (e) {
    console.log(e);
  }
}

function* onFetchRatingLeaderboard({
  payload,
}: {
  payload: IFetchLeaderboardPayloadRating;
}) {
  try {
    const queryParams: IQuery[] = Object.keys(payload).map(
      (key: any): IQuery => {
        return { name: key, value: payload[key] };
      }
    );
    const leaderboard: ILeaderBoardResult[] = yield API.execute(
      "GET",
      ENDPOINTS.GET_RATING_LEADERBOARD,
      null,
      queryParams
    );
    switch (payload.gameType) {
      case LeaderboardType.Blitz:
        yield put(Actions.setBlitzLeaderboard(leaderboard));
        break;
      case LeaderboardType.Bullet:
        yield put(Actions.setBulletLeaderboard(leaderboard));
        break;
      case LeaderboardType.Classical:
        yield put(Actions.setClassicalLeaderboard(leaderboard));
        break;
      case LeaderboardType.Rapid:
        yield put(Actions.setRapidLeaderboard(leaderboard));
        break;
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchFetchAILeaderboard() {
  yield takeLatest(
    ACTION_TYPE.FETCH_AI_GAMES_LEADERBOARD as any,
    onFetchAILeaderboard
  );
}

function* watchFetchQuickPlayLeaderboard() {
  console.log("hello ");
  yield takeLatest(
    ACTION_TYPE.FETCH_QUICK_PLAY_LEADERBOARD as any,
    onFetchQuickPlayLeaderboard
  );
}

function* watchFetchRatingLeaderboard() {
  yield takeLatest(
    ACTION_TYPE.FETCH_RATING_LEADERBOARD as any,
    onFetchRatingLeaderboard
  );
}
export default [
  watchFetchAILeaderboard,
  watchFetchQuickPlayLeaderboard,
  watchFetchRatingLeaderboard,
];
