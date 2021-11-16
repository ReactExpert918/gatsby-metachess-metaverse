import { call, put, takeLatest } from "redux-saga/effects";
import API from "../../services/api.service";
import { ENDPOINTS } from "../../services/endpoints";
import { ACTION_TYPE, chatActions } from "./chat.actions";
import { IFriend } from "./chat.interfaces";
import { toast } from "react-toastify";

function* onFetchFriendsList() {
  try {
    const friendsList: IFriend[] = yield call(() =>
      API.execute("GET", ENDPOINTS.GET_FRIENDS)
    );
    yield put(chatActions.setFriendsList(friendsList));
  } catch (e) {
    yield put(chatActions.setFriendsList([]));
    console.log("err", e);
  }
}

function* onFetchFriendRequests() {
  try {
    const friendRequests: IFriend[] = yield call(() =>
      API.execute("GET", ENDPOINTS.GET_FRIEND_REQUESTS)
    );
    yield put(chatActions.setFriendsRequestsList(friendRequests));
  } catch (e) {
    yield put(chatActions.setFriendsRequestsList([]));
    console.log("err", e);
  }
}

function* onSendFriendRequest(action: any) {
  try {
    yield call(() =>
      API.execute(
        "POST",
        ENDPOINTS.SEND_FRIEND_REQUEST,
        null,
        null,
        action.payload
      )
    );
    toast.success("Friend request sent successfully!");
  } catch (e: any) {
    let errorText = "";
    console.log("err", e);
    if (e.status == 400) {
      switch (e.data) {
        case 1:
          errorText = "You can't invite yourself";
        case 2:
          errorText = "User not found";
        case 3:
          errorText = "Already added as friend";
      }
    } else if (e.status == 406) {
      errorText = "Limit of friends exceeded (200)";
    } else if (e.status == 409) {
      errorText = "Friend request was already sent to that user!";
    } else {
      errorText = "Something went wrong, please try again!";
    }
    toast.error(errorText);
  }
}

function* onAcceptFriendRequest(action: any) {
  try {
    const res: string = yield call(() =>
      API.execute(
        "POST",
        ENDPOINTS.ACCEPT_FRIEND_REQUEST,
        null,
        null,
        action.payload
      )
    );
    yield put(chatActions.fetchFriendsRequestsList());
    toast.success("Friend request accepted successfully!");
  } catch (e: any) {
    let errorText = "";
    if (e.status == 406) {
      errorText = "Limit of friends exceeded (200)";
    } else {
      errorText = "Something went wrong, please try again!";
    }
    toast.error(errorText);
  }
}

function* onRefuseFriendRequest(action: any) {
  try {
    const res: string = yield call(() =>
      API.execute(
        "POST",
        ENDPOINTS.REJECT_FRIEND_REQUEST,
        null,
        null,
        action.payload
      )
    );
    yield put(chatActions.fetchFriendsRequestsList());
    toast.success("Friend request rejected successfully!");
  } catch (e: any) {
    toast.error("Something went wrong, please try again!");
  }
}

function* onRemoveFriend(action: any) {
  try {
    const res: string = yield call(() =>
      API.execute("POST", ENDPOINTS.REMOVE_FRIEND, null, null, action.payload)
    );
    yield put(chatActions.fetchFriendsList());
    toast.success("Friend removed successfully!");
  } catch (e: any) {
    toast.error("Something went wrong, please try again!");
  }
}

function* watchFetchFriendsList() {
  yield takeLatest(ACTION_TYPE.FETCH_FRIENDS_LIST as any, onFetchFriendsList);
}

function* watchSendFriendRequest() {
  yield takeLatest(
    ACTION_TYPE.SEND_FRIENDS_REQUESTS as any,
    onSendFriendRequest
  );
}

function* watchFetchfriendRequests() {
  yield takeLatest(
    ACTION_TYPE.FETCH_FRIENDS_REQUESTS as any,
    onFetchFriendRequests
  );
}

function* watchAcceptfriendRequest() {
  yield takeLatest(
    ACTION_TYPE.ACCEPT_FRIEND_REQUEST as any,
    onAcceptFriendRequest
  );
}

function* watchRefusefriendRequest() {
  yield takeLatest(
    ACTION_TYPE.REJECT_FRIEND_REQUEST as any,
    onRefuseFriendRequest
  );
}
function* watchRemovefriend() {
  yield takeLatest(ACTION_TYPE.REMOVE_FRIEND as any, onRemoveFriend);
}

export default [
  watchFetchFriendsList,
  watchFetchfriendRequests,
  watchSendFriendRequest,
  watchAcceptfriendRequest,
  watchRefusefriendRequest,
  watchRemovefriend,
];
