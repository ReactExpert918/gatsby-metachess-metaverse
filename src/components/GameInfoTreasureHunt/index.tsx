import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { squareStyles } from "../../pages/treasurequest";
import { IAppState } from "../../store/reducers";
import { Actions } from "../../store/treasureHunt/treasureHunt.action";
import { ITreasureHuntReducer } from "../../store/treasureHunt/treasureHunt.interface";

interface IProps {
  setSquareStyles: (styles: squareStyles) => void;
}

const GameInfo = (props: IProps) => {
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
            onClick={() => {
              dispatch(Actions.resetGame());
              document
                .querySelectorAll(`div[data-squareid]`)
                .forEach((el) => el.classList.remove("animating"));
              props.setSquareStyles({});
            }}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default GameInfo;
