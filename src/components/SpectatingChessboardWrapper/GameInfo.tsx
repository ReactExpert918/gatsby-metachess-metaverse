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
  playerColor: "b" | "w";
  opponent: IUser;
  timer: ITimer;
  gameElos: IGameplayElos;
  isReplay: boolean;
}

interface IGameInfoProps {
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
    playerColor,
    // opponent,
    timer,
    gameElos,
    showFirstMoveTime,
    onReplayPrevious,
    onReplayNext,
  } = props;

  const windowWidth = isSSR ? 1024 : window.innerWidth;
  return (
    <div className="chessboardSidebarWrapper">
      <div className="timersWrapper">
        {
          <Timer
            className="timer-desktop"
            timeLeft={
              getOpponentColor(playerColor) === "w"
                ? timer?.white
                : timer?.black
            }
          />
        }
        <div className="gameInfoContainer">
          <p className="gameInfoTitle">{"Game Info"}</p>

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
        </div>
        <div>
          {
            <>
              <Timer
                className="timer-desktop"
                timeLeft={playerColor === "w" ? timer?.white : timer?.black}
              />
            </>
          }
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
  spectate: {
    roomInfo: {
      gameRules,
      secondPlayer: opponent,
      timer,
      gameElos,
      hostColor: playerColor,
      isReplay,
    },
  },
}: IAppState): ISelectProps => ({
  gameRules,
  playerColor,
  opponent,
  timer,
  gameElos,
  isReplay,
});

const Connected = connect<ISelectProps, any>(
  mapStateToProps as any,
  {}
)(GameInfo);

const T = (p: any) => {
  return <Connected {...p} />;
};

export default T;
