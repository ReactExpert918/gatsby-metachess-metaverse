// const API_BASE_URL: string = `http://localhost:4000/api/v1`;

import { API } from "../config";

const API_BASE_URL: string = API;

export const ENDPOINTS = {
  TEST: "ENDPOINTS_TEST",
  USER_SUMMARY: "FETCH_USER",
  MATCHES_HISTORY: "MATCHES_HISTORY",
  SERVER_STATUS: 'SERVER_STATUS'
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
    case ENDPOINTS.USER_SUMMARY:
      return `${API_BASE_URL}/account/summary`;
    case ENDPOINTS.MATCHES_HISTORY:
      return `${API_BASE_URL}/account/gameHistory`;
    case ENDPOINTS.SERVER_STATUS:
      return `${API_BASE_URL}/serverstatus`;
    default:
      return "";
  }
};
