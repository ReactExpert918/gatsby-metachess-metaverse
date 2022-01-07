import React from "react";
import { useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import {
  ITreasureHuntReducer,
  move,
} from "../../store/treasureHunt/treasureHunt.interface";

const MoveHistory = () => {
  const { moveList: moveHistory } = useSelector(
    (state: IAppState): ITreasureHuntReducer => state.treasureHunt
  );
  return (
    <div className="moveHistoryContainer" style={{ marginTop: "0" }}>
      <p className="title">Plundered Tiles</p>
      <div className="moveHistoryWrapper">
        <div className="cellWrapper">
          {(moveHistory || [])
            .map((move: move, i: number) => (
              <div
                key={i}
                className={
                  i % 2
                    ? "moveHistoryCell moveHistoryCellEven"
                    : "moveHistoryCell moveHistoryCellOdd"
                }
              >
                <p>
                  {Object.keys(move)[0]} - {Object.values(move)[0]} Shah
                </p>
              </div>
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
};

export default MoveHistory;
