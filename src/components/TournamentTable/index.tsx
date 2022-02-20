import React, { useState, useEffect } from "react";
import TournamentTableHeader from './TournamentTableHeader';
import TournamentTableItem from './TournamentTableItem';

interface IProps {
  data: array;
  type: number;
}

const TournamentTable = (props: IProps) => {

  return (
      <div className="tournamentTableContainer">
        <table className={"tournamentTable" + (props.type === 1 ? " ongoingTable" : "")}>
          <thead>
            <TournamentTableHeader />
          </thead>
          <tbody>
            {props.data.map((each, index) => (
              <TournamentTableItem data={each} key={index} />
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default TournamentTable;