import React from "react";
import Timer from "../Timer";
import { IAppState } from "../../store/reducers";
import { connect } from "react-redux";
import { GameMode, GameRules } from "../../interfaces/game.interfaces";
import {
  ISetPlayModePayload,
  ITimer,
  IGameplayElos,
} from "../../store/gameplay/gameplay.interfaces";
import { getOpponentName } from "../../helpers/getOpponentNameByPlayMode";
import { IUser } from "../../store/user/user.interfaces";
import ActionButtons from "../ActionButtons";
import { getGameTypeName } from "../../helpers/gameTypeHelper";
import { TrophySvg } from "../Images";
import { isSSR } from "../../lib/utils";

interface ISelectProps {
  gameRules: GameRules;
  playMode: ISetPlayModePayload;
  playerColor: "b" | "w";
  opponent: IUser;
  timer: ITimer;
  firstTimer: ITimer;
  isReplay: boolean;
  gameElos: IGameplayElos;
}

interface IGameInfoProps {
  resign: () => void;
  drawEnabled: boolean;
  onDraw: () => void;
  showFirstMoveTime: boolean;
  onReplayPrevious: () => void;
  onReplayNext: () => void;
}

const getOpponentColor = (playerColor: "b" | "w") => {
  return playerColor === "b" ? "w" : "b";
};

function GameInfo(props: IGameInfoProps & ISelectProps) {
  const {
    gameRules,
    playMode,
    playerColor,
    opponent,
    timer,
    firstTimer,
    gameElos,
    resign,
    onDraw,
    drawEnabled,
    showFirstMoveTime,
    onReplayPrevious,
    onReplayNext,
  } = props;

  const onResign = () => {
    resign();
  };

  const windowWidth = isSSR ? 1024 : window.innerWidth;
  console.log(playMode);
  return (
    <div className="chessboardSidebarWrapper">
      <div className="timersWrapper">
        {!playMode.isAI && showFirstMoveTime && !props.isReplay && (
          <div>
            <Timer
              className="timer-desktop-first"
              timeLeft={
                getOpponentColor(playerColor) === "w"
                  ? firstTimer?.white
                  : firstTimer?.black
              }
            />
          </div>
        )}
        {playMode != null && !playMode.isAI && !props.isReplay && (
          <Timer
            className="timer-desktop"
            timeLeft={
              getOpponentColor(playerColor) === "w"
                ? timer?.white
                : timer?.black
            }
          />
        )}
        <div className="gameInfoContainer">
          <p className="gameInfoTitle">{"Game Info"}</p>
          {playMode != undefined && playMode != null && playMode.isAI ? (
            <>
              <p className="gameDetail">
                Opponent:{" "}
                {getOpponentName(playMode.isAI, playMode.aiMode, opponent)}
              </p>
              <p className="gameDetail">
                Opponent color: {playerColor === "w" ? "Black" : "White"}
              </p>
            </>
          ) : (
            <div className="block-container">
              {gameRules.chessCoin && (
                <div className="block">
                  <div className="title">
                    Chess Coin: {gameRules.chessCoin.minium} -{" "}
                  </div>
                  <div className="value">{gameRules.chessCoin.maxium}</div>
                </div>
              )}
              <div></div>
              <div className="block">
                <div className="title">MODE</div>
                <div className="mode">
                  {`${getGameTypeName(gameRules.time.base)} - ${
                    gameRules.mode == GameMode.Casual ? "Casual" : "Rated"
                  }`}
                </div>
              </div>
              <div className="block">
                <div className="title">TIME</div>
                <div className="value">
                  {`${gameRules.time.base}+${gameRules.time.increment}`}
                </div>
              </div>
              {gameRules.mode === GameMode.Rated && gameElos && (
                <div className="block" style={{ marginTop: 10 }}>
                  <div className="value-image win">
                    <TrophySvg className="trophy" />+{gameElos.eloWin}
                  </div>
                  <div className="title-small">DRAW</div>
                  <div className="value-image">
                    <TrophySvg className="trophy" />
                    {gameElos.eloDraw}
                  </div>
                  <div className="title-small">DEFEAT</div>
                  <div className="value-image lose">
                    <TrophySvg className="trophy" />
                    {gameElos.eloLose}
                  </div>
                </div>
              )}
              {/* {gameRules.mode.toString() === GameMode.Rated.toString() && (
                <p>
                  Rating: {gameRules.rating.minium}-{gameRules.rating.maxium}
                </p>
              )} */}
              {/* Win: {gameElos.eloWin} */}
            </div>
          )}
        </div>
        <div>
          {!playMode.isAI && showFirstMoveTime && !props.isReplay && (
            <>
              <Timer
                className="timer-desktop-first"
                timeLeft={
                  playerColor === "w" ? firstTimer?.white : firstTimer?.black
                }
              />
            </>
          )}
          {playMode != null && !playMode.isAI && !props.isReplay && (
            <>
              <Timer
                className="timer-desktop"
                timeLeft={playerColor === "w" ? timer?.white : timer?.black}
              />
              <ActionButtons
                draw={onDraw}
                drawEnabled={drawEnabled}
                resign={() => {
                  onResign();
                }}
              />
            </>
          )}
          {props.isReplay && windowWidth >= 768 && (
            <div
              style={{
                width: "100%",
                height: "10vh",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bolder",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log("hello");
                  onReplayPrevious();
                }}
              >
                {"<"} Previous
              </p>

              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bolder",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={onReplayNext}
              >
                Next {">"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({
  gameplay: {
    gameRules,
    playMode,
    playerColor,
    opponent,
    timer,
    firstTimer,
    isReplay,
    gameElos,
  },
}: IAppState): ISelectProps => ({
  gameRules,
  playMode,
  playerColor,
  opponent,
  timer,
  firstTimer,
  isReplay,
  gameElos,
});

const Connected = connect<ISelectProps, any>(
  mapStateToProps as any,
  {}
)(GameInfo);

const T = (p: any) => {
  return <Connected {...p} />;
};

export default T;
