// const API_BASE_URL: string = `http://localhost:4000/api/v1`;

import { API } from "../config";

const API_BASE_URL: string = API;

export const ENDPOINTS = {
  TEST: "ENDPOINTS_TEST",
  USER_SUMMARY: "FETCH_USER",
  USER_UPDATE: "UPDATE_USER",
  MATCHES_HISTORY: "MATCHES_HISTORY",
  SERVER_STATUS: "SERVER_STATUS",
  FIND_USER: "FIND_USER",

  // Friends
  GET_FRIENDS: "GET_FRIENDS",
  GET_FRIEND_REQUESTS: "GET_FRIEND_REQUESTS",
  ACCEPT_FRIEND_REQUEST: "ACCEPT_FRIEND_REQUEST",
  REJECT_FRIEND_REQUEST: "REJECT_FRIEND_REQUEST",
  REMOVE_FRIEND: "REMOVE_FRIEND",
  SEND_FRIEND_REQUEST: "SEND_FRIEND_REQUEST",
  GET_COUNTRIES: "GET_COUNTRIES",
};

const convertQuery = (queries: IQuery[]): string => {
  if (!queries || queries.length < 0) {
    return "";
  }

  let finalQuery = "";
  queries.forEach((query) => {
    if (query.value) {
      finalQuery += `&${encodeURI(query.name)}=${encodeURI(query.value)}`;
    }
  });
  finalQuery = `?${finalQuery.substring(1)}`;
  return finalQuery;
};

export const constructUrl = (
  endpoint: string,
  obj?: any,
  queries?: IQuery[],
  id?: string | number,
  otherEndpointProperties?: any
): string => {
  switch (endpoint) {
    case ENDPOINTS.TEST:
      return `${API_BASE_URL}/testt${queries ? convertQuery(queries) : ""}`;
    case ENDPOINTS.GET_COUNTRIES:
      return `${API_BASE_URL}/countries`;
    case ENDPOINTS.USER_SUMMARY:
      return `${API_BASE_URL}/account/summary`;
    case ENDPOINTS.USER_UPDATE:
      return `${API_BASE_URL}/account/update`;
    case ENDPOINTS.MATCHES_HISTORY:
      return `${API_BASE_URL}/account/gameHistory`;
    case ENDPOINTS.SERVER_STATUS:
      return `${API_BASE_URL}/serverstatus`;
    case ENDPOINTS.FIND_USER:
      return `${API_BASE_URL}/account/find${
        queries ? convertQuery(queries) : ""
      }`;

    // Friend's API
    case ENDPOINTS.GET_FRIENDS:
      return `${API_BASE_URL}/friend/list`;
    case ENDPOINTS.GET_FRIEND_REQUESTS:
      return `${API_BASE_URL}/friend/requests`;
    case ENDPOINTS.ACCEPT_FRIEND_REQUEST:
      return `${API_BASE_URL}/friend/requests/${id}/accept`;
    case ENDPOINTS.REJECT_FRIEND_REQUEST:
      return `${API_BASE_URL}/friend/requests/${id}/refuse`;
    case ENDPOINTS.REMOVE_FRIEND:
      return `${API_BASE_URL}/friend/requests/${id}/remove`;
    case ENDPOINTS.SEND_FRIEND_REQUEST:
      return `${API_BASE_URL}/friend/requests/${id}`;
    default:
      return "";
  }
};
