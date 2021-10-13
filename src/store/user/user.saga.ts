import { takeLatest, select, put, call } from "redux-saga/effects";
import { ACTION_TYPE } from "./user.action";
import { Actions as userActions } from "./user.action";
import API from "../../services/api.service";
import { ENDPOINTS } from "../../services/endpoints";
import { IServerStatus, MAINTENANCE_MODE } from "./user.interfaces";
import { MAIN_WEBSITE } from "../../config";

function* onFetchCurrentUser() {
  try {
    const user = yield call(() => API.execute("GET", ENDPOINTS.USER_SUMMARY));
    console.log(user);
    yield put(userActions.setCurrentUser(user));
  } catch (res) {
    if (res.data === "not verified" && res.status === 401) {
      window.location.href = MAIN_WEBSITE
    }
    console.log("err", res);
  }
}

function* onFetchMatchesHistory() {
  try {
    const matchesHistory = yield call(() =>
      API.execute("GET", ENDPOINTS.MATCHES_HISTORY)
    );
    yield put(userActions.setMatchesHistory(matchesHistory));
  } catch (e) {
    console.log("err", e);
  }
}

function* onFetchServerStatus() {
  try {
    const serverStatus: IServerStatus = yield call(() =>
      API.execute("GET", ENDPOINTS.SERVER_STATUS)
    );
    yield put(userActions.setServerStatus(serverStatus));
  } catch (e) {
    yield put(userActions.setServerStatus({ Status: MAINTENANCE_MODE.ONLINE }));
    console.log("err", e);
  }
}

function* watchFetchCurrentUser() {
  yield takeLatest(ACTION_TYPE.FETCH_CURRENT_USER as any, onFetchCurrentUser);
}

function* watchFetchMatchesHistory() {
  yield takeLatest(
    ACTION_TYPE.FETCH_MATCHES_HISTORY as any,
    onFetchMatchesHistory
  );
}

function* watchFetchServerStatus() {
  yield takeLatest(ACTION_TYPE.FETCH_SERVER_STATUS as any, onFetchServerStatus);
}

export default [
  watchFetchCurrentUser,
  watchFetchMatchesHistory,
  watchFetchServerStatus,
];
