export interface ILeaderboardReducer {
  quickPlayLeaderboard: ILeaderBoardResult[];
  aiGamesLeaderboard: ILeaderBoardResult[];
  rapidLeaderboard: ILeaderBoardResult[];
  blitzLeaderboard: ILeaderBoardResult[];
  bulletLeaderboard: ILeaderBoardResult[];
  classicalLeaderboard: ILeaderBoardResult[];
}

export enum LeaderboardType {
  "Classical" = 1,
  "Bullet",
  "Rapid",
  "Blitz",
}

export interface IFetchLeaderboardPayload {
  beginDate: number;
  endDate: number;
  top?: number;
  skip?: number;
}

export interface IFetchLeaderboardPayloadRating {
  beginDate: number;
  endDate: number;
  top?: number;
  skip?: number;
  gameType: LeaderboardType;
}

export interface ILeaderBoardResult {
  Account: {
    Id: number;
    Avatar: null | string;
    Username: string;
    WalletAddress: null | string;
    AverageRating: number;
  };
  Games: number;
}
