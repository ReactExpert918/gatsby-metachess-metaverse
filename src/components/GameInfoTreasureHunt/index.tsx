import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import { Actions } from "../../store/treasureHunt/treasureHunt.action";
import { ITreasureHuntReducer } from "../../store/treasureHunt/treasureHunt.interface";

const GameInfo = () => {
  const { chancesRemaining, gameOver } = useSelector(
    (state: IAppState): ITreasureHuntReducer => state.treasureHunt
  );
  const dispatch = useDispatch();
  return (
    <div className="chessboardSidebarWrapper" style={{ marginTop: "0" }}>
      <div className="timersWrapper">
        <div className="gameInfoContainer">
          <p className="gameInfoTitle">{"Game Info"}</p>
          <p className="gameDetail">Attempts Left:{chancesRemaining}</p>
        </div>
        {gameOver && (
          <button
            className="claimButton"
            onClick={() => dispatch(Actions.resetGame())}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default GameInfo;
