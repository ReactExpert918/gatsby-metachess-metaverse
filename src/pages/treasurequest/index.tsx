import React, { CSSProperties, RefObject, useEffect, useState } from "react";
import { Square } from "chess.js";
import crackedImage from "../../assets/images/crackedImage.jpg";
import treasureAudio from "../../assets/audios/treasureSound.mp3";
import wrongAudio from "../../assets/audios/wrongSound.mp3";
import Chessboard from "chessboardjsx";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import { Actions } from "../../store/treasureHunt/treasureHunt.action";
import useAudio from "../../helpers/hooks/useAudio";
import { isSSR } from "../../lib/utils";
import MoveHistory from "../../components/MovesHistoryTreasureHunt";
import GameInfo from "../../components/GameInfoTreasureHunt";
import { move } from "../../store/treasureHunt/treasureHunt.interface";
import TreasureLoot from "../../components/TreasureHuntLootInfo";

const WINDOW_WIDTH_LIMIT = 768;
export interface squareStyles {
  [square in Square]?: CSSProperties;
}
const index = () => {
  const dispatch = useDispatch();
  const [playingTreasure, playTreasure] = useAudio(treasureAudio);
  const [playingWrong, playWrong] = useAudio(wrongAudio);
  const wrapperRef: RefObject<HTMLDivElement> = React.useRef();
  const { moveList, gameOver } = useSelector(
    (state: IAppState) => state.treasureHunt
  );
  const [squareStyles, setSquareStyles] = useState<squareStyles>({});
  const squareStyling = (pieceSquare: string) => {
    console.log(pieceSquare);
    return {
      [pieceSquare]: {
        background: `url(${crackedImage})`,
      },
    };
  };
  let windowHeight = WINDOW_WIDTH_LIMIT;
  let windowWidth = 1280;
  useEffect(() => {
    if (!isSSR && typeof window !== "undefined")
      windowWidth = window.innerWidth;
    // const limitedHeight =
    if (!isSSR && typeof window !== "undefined")
      windowHeight = window.innerHeight;
  }, []);
  let chessHeight = WINDOW_WIDTH_LIMIT;
  let chessWidth =
    windowWidth <= WINDOW_WIDTH_LIMIT
      ? windowWidth
      : (windowWidth * 800) / 1920;
  if (wrapperRef?.current) {
    chessHeight = wrapperRef.current.clientHeight;
    if (chessHeight < chessWidth) chessWidth = chessHeight;
  }
  // if user navigates back to page set color of selected pieces
  useEffect(() => {
    // console.log("gere");
    let tempObj: squareStyles = {};
    moveList.forEach(
      (move: move) =>
        (tempObj = { ...tempObj, ...squareStyling(Object.keys(move)[0]) })
    );
    // console.log(tempObj);
    setSquareStyles((squareStyles: squareStyles) => ({
      ...squareStyles,
      ...tempObj,
    }));
  }, []);
  //square click handler
  const handleSquareClick = (squareId: string): void => {
    if (Object.keys(moveList).includes(squareId) || gameOver) return;
    document
      .querySelector(`div[data-squareid="${squareId}"]`)
      .classList.add("animating");
    playWrong();
    dispatch(Actions.onMove({ [squareId]: 0 }));
    // setSquareStyles((squareStyles: squareStyles) => ({
    //   ...squareStyles,
    //   ...squareStyling(squareId),
    // }));
  };
  return (
    <section className="gameContainer">
      <section className="gameWrapper">
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <TreasureLoot />
          <MoveHistory />
        </section>
        <div
          className="chessboardContainer"
          style={{ maxWidth: chessWidth, marginBottom: "4vmax" }}
        >
          <div
            className={"chessboardWrapper treasureHunt"}
            style={{ minWidth: chessWidth, minHeight: "70%", flex: "initial" }}
            ref={wrapperRef}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "start",
              }}
            >
              <Chessboard
                width={chessWidth}
                onSquareClick={handleSquareClick}
                squareStyles={squareStyles}
              />
            </div>
          </div>
        </div>
        <GameInfo setSquareStyles={setSquareStyles} />
      </section>
    </section>
  );
};

export default index;
