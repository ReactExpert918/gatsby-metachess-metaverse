import { takeLatest, select, put, call } from "redux-saga/effects";
import { ACTION_TYPE } from "./user.action";
import { Actions as userActions } from "./user.action";
import API from "../../services/api.service";
import { ENDPOINTS } from "../../services/endpoints";
import { IServerStatus, IUser, MAINTENANCE_MODE } from "./user.interfaces";
import { MAIN_WEBSITE } from "../../config";
import { UserTypes } from "../../components/UserEditInfo";
import { IAppState } from "../reducers";

function* onFetchCurrentUser() {
  try {
    const user = yield call(() => API.execute("GET", ENDPOINTS.USER_SUMMARY));
    console.log(user);
    yield put(userActions.setCurrentUser(user));
  } catch (res) {
    if (res.data === "not verified" && res.status === 401) {
      window.location.href = MAIN_WEBSITE;
    }
    console.log("err", res);
  }
}

function* onUpdateCurrentUser({
  payload,
}: {
  payload: {
    Fullname: string;
    Type: UserTypes;
    CountryId: number;
    WalletAddress: string;
    Avatar: string;
  };
}) {
  try {
    yield call(() =>
      API.execute("POST", ENDPOINTS.USER_UPDATE, payload)
    );
    const getUser = (state: IAppState): IUser => state.user.currentUser;
    const user:IUser = yield select(getUser);
    console.log(user);
    yield put(userActions.setCurrentUser({...user,Avatar:payload.Avatar}));
  } catch (res) {
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

function* onFetchUsersByUsername(action: any) {
  try {
    const query: IQuery[] = [
      {
        name: "query",
        value: action.payload,
      },
    ];
    const usersList: IUser[] = yield call(() =>
      API.execute("GET", ENDPOINTS.FIND_USER, null, query)
    );
    yield put(userActions.setSearchedUserList(usersList));
  } catch (e) {
    yield put(userActions.setSearchedUserList([]));
    console.log("err", e);
  }
}

function* watchFetchSearchedUserList() {
  yield takeLatest(
    ACTION_TYPE.FETCH_SEARCHED_USER_LIST as any,
    onFetchUsersByUsername
  );
}

function* watchFetchCurrentUser() {
  yield takeLatest(ACTION_TYPE.FETCH_CURRENT_USER as any, onFetchCurrentUser);
}

function* watchUpdateCurrentUser() {
  yield takeLatest(ACTION_TYPE.UPDATE_CURRENT_USER as any, onUpdateCurrentUser);
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
  watchFetchSearchedUserList,
  watchUpdateCurrentUser,
];
