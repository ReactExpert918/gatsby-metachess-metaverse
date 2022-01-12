import React, { CSSProperties, RefObject, useEffect, useState } from "react";
import { Square } from "chess.js";
import { navigate } from "gatsby";
import crackedImage from "../../assets/images/crackedImage.jpg";
import treasureAudio from "../../assets/audios/treasureSound.mp3";
import wrongAudio from "../../assets/audios/wrongSound.mp3";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../store/reducers";
import { Actions } from "../../store/treasureHunt/treasureHunt.action";
import { Actions as UserActions } from "../../store/user/user.action";
import useAudio from "../../helpers/hooks/useAudio";
import { isSSR } from "../../lib/utils";
import MoveHistory from "../../components/MovesHistoryTreasureHunt";
import GameInfo from "../../components/GameInfoTreasureHunt";
import { move } from "../../store/treasureHunt/treasureHunt.interface";
import TreasureLoot from "../../components/TreasureHuntLootInfo";
import SocketService from "../../services/socket.service";
import { toast } from "react-toastify";
import { MODES } from "../../constants/playModes";
import { IServerStatus } from "../../store/user/user.interfaces";
const Chessboard = React.lazy(() => import("chessboardjsx"));

const WINDOW_WIDTH_LIMIT = 768;
export interface squareStyles {
  [square in Square]?: CSSProperties;
}
interface todayAttempts {
  todayAttempts: number;
}
export enum PlayEnum {
  OK,
  OKGameFinished,
  AttemptsExceeded,
  PlaceAlreadyClicked,
}
interface placeSquareResponse {
  status: PlayEnum;
  level: null | number;
}

const index = () => {
  const dispatch = useDispatch();
  const [playingTreasure, playTreasure] = useAudio(treasureAudio);
  const [playingWrong, playWrong] = useAudio(wrongAudio);
  const { serverStatus }: { serverStatus: IServerStatus } = useSelector(
    (state: IAppState) => state.user
  );
  const wrapperRef: RefObject<HTMLDivElement> = React.useRef();
  const { moveList, gameOver, gameInProgress } = useSelector(
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
  let windowWidth = 1280;
  if (!isSSR) windowWidth = window.innerWidth;
  let chessWidth =
    windowWidth <= WINDOW_WIDTH_LIMIT
      ? windowWidth
      : (windowWidth * 800) / 1920;
  let chessHeight = WINDOW_WIDTH_LIMIT;

  if (wrapperRef?.current) {
    chessHeight = wrapperRef.current.clientHeight;
    if (chessHeight < chessWidth) chessWidth = chessHeight;
  }
  useEffect(() => {
    if (!gameInProgress) {
      SocketService.sendData(
        "start-treasure-hunt",
        null,
        (response: boolean | todayAttempts) => {
          console.log(response);
          const message =
            response === null
              ? `Game Could Not Be Created.`
              : typeof response === "object"
              ? `You have exceeded the number of attempts for today. You have already played ${response.todayAttempts} times`
              : "";
          if (!response || response !== true) {
            toast.error(message, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 10000,
              closeOnClick: true,
            });
            dispatch(UserActions.setChoseMode(MODES.CHOSE_MODE));
            navigate("/choose-mode");
          }
          dispatch(Actions.setGameInProgress(true));
          dispatch(Actions.setGameInProgressAndUserNavigating(false));
        }
      );
    } else {
      let tempObj: squareStyles = {};
      moveList.forEach(
        (move: move) => (tempObj = { ...tempObj, ...squareStyling(move.place) })
      );
      setSquareStyles((squareStyles: squareStyles) => ({
        ...squareStyles,
        ...tempObj,
      }));
      SocketService.sendData("resume-my-game-treasure-hunt", null, null);
      dispatch(Actions.setGameInProgressAndUserNavigating(false));
    }
    return () => {
      if (!gameOver) {
        SocketService.sendData("leave-game-treasure-hunt", null, null);
        dispatch(Actions.setGameInProgressAndUserNavigating(true));
      }
    };
  }, []);
  //square click handler
  const handleSquareClick = (squareId: string): void => {
    if (Object.keys(moveList).includes(squareId) || gameOver) return;
    SocketService.sendData(
      "treasure-hunt-place",
      squareId,
      (response: placeSquareResponse | null) => {
        console.log(response);
        if (response === null) {
          toast.error("Server Error! Could not capture click. Try Again!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 10000,
            closeOnClick: true,
          });
        } else if (
          response.status === PlayEnum.OK ||
          response.status === PlayEnum.OKGameFinished
        ) {
          if (!response.level) {
            playWrong();
          } else {
            playTreasure();
          }
          dispatch(
            Actions.onMove({
              place: squareId.toString(),
              level: response.level,
            })
          );
          if (response.status === PlayEnum.OKGameFinished)
            dispatch(Actions.setGameEndDate(new Date().getTime()));
          document
            .querySelector(`div[data-squareid="${squareId}"]`)
            .classList.add(
              "animating",
              `animating-${(response.level && "treasure") || "digging"}`
            );
        } else if (response.status === PlayEnum.AttemptsExceeded) {
          toast.error("You Have Already exceeded number of attempts", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 10000,
            closeOnClick: true,
          });
        } else if (response.status === PlayEnum.PlaceAlreadyClicked) {
          toast.error("You Have Already Clicked This Square", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 10000,
            closeOnClick: true,
          });
        }
      }
    );
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
              {!isSSR && (
                <React.Suspense fallback={<div />}>
                  <Chessboard
                    width={chessWidth}
                    onSquareClick={handleSquareClick}
                    squareStyles={squareStyles}
                  />
                </React.Suspense>
              )}
            </div>
          </div>
        </div>
        <GameInfo setSquareStyles={setSquareStyles} />
      </section>
    </section>
  );
};

export default index;
