import React from "react";

const UsersListTableHeader = () => (
  <tr className="usersRankingTableHeaderWrapper usersRankingTableItemWrapper  cells">
    <th style={{ width: "10%" }}>Rank</th>
    <th style={{ width: "30%" }}>Username</th>
    <th style={{ width: "10%" }}>Game Count</th>
    <th style={{ width: "10%" }}>Player Rating</th>
    <th style={{ width: "20%" }}>
      Eligible Rewards <br />
      (in $ shah)
    </th>
    <th style={{ width: "20%" }}>Wallet Address</th>
    {/* <p>Chess Coins</p> */}
  </tr>
);

export default UsersListTableHeader;
