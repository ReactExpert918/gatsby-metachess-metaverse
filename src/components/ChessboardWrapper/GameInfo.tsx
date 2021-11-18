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
import {TrophySvg} from "../Images";

interface ISelectProps {
  gameRules: GameRules;
  playMode: ISetPlayModePayload;
  playerColor: "b" | "w";
  opponent: IUser;
  timer: ITimer;
  isReplay: boolean;
  gameElos: IGameplayElos;
}

interface IGameInfoProps {
  resign: () => void;
  drawEnabled: boolean;
  onDraw: () => void;
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
    gameElos,
    resign,
    onDraw,
    drawEnabled,
  } = props;
  

  const onResign = () => {
    resign();
  };

  return (
    <div className="chessboardSidebarWrapper">
      <div className="timersWrapper">
        {!playMode.isAI && (
          <Timer
            timeLeft={
              getOpponentColor(playerColor) === "w"
                ? timer?.white
                : timer?.black
            }
          />
        )}
        <div className="gameInfoContainer">
          <p className="gameInfoTitle">{"Game Info"}</p>
          {playMode.isAI ? (
            <>
              <p className="gameDetail">
                Opponent:{" "}
                {getOpponentName(playMode.isAI, playMode.aiMode, opponent)}
              </p>
              <p className="gameDetail">Opponent color: {playerColor === "w" ? "Black" : "White"}</p>
            </>
          ) : (
            <div className="block-container">

              {gameRules.chessCoin && (
                <div className="block">

                  <div className="title">
                    Chess Coin: {gameRules.chessCoin.minium} -{" "}
                  </div>
                  <div className="value">
                    {gameRules.chessCoin.maxium}
                  </div>
                </div>
              )}
              <div>
              </div>
              <div className="block">
                <div className="title">
                  MODE
                </div>
                <div className="mode">
                  {`${getGameTypeName(gameRules.time.base)} - ${(gameRules.mode == GameMode.Casual ? "Casual" : "Rated")}`}
                </div>
              </div>
              <div className="block">
                <div className="title">
                  TIME
                </div>
                <div className="value">
                  {`${gameRules.time.base}+${gameRules.time.increment}`}
                </div>
              </div>
              {gameRules.mode === GameMode.Rated && gameElos &&
                <div className="block" style={{marginTop: 10}}>
                  <div className="value-image win">
                    <TrophySvg className="trophy" />+{gameElos.eloWin}
                  </div>
                  <div className="title-small">
                    DRAW
                  </div>
                  <div className="value-image">
                    <TrophySvg className="trophy" />{gameElos.eloDraw}
                  </div>
                  <div className="title-small">
                    DEFEAT
                  </div>
                  <div className="value-image lose">
                    <TrophySvg className="trophy" />{gameElos.eloLose}
                  </div>
                </div>
              }
              {/* {gameRules.mode.toString() === GameMode.Rated.toString() && (
                <p>
                  Rating: {gameRules.rating.minium}-{gameRules.rating.maxium}
                </p>
              )} */}
              {/* Win: {gameElos.eloWin} */}
            </div>
          )}
        </div>
        {!playMode.isAI && (
          <>
            <Timer
              timeLeft={playerColor === "w" ? timer?.white : timer?.black}
            />
            {!props.isReplay && (
              <ActionButtons
                draw={onDraw}
                drawEnabled={drawEnabled}
                resign={() => {
                  onResign();
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({
  gameplay: { gameRules, playMode, playerColor, opponent, timer, isReplay, gameElos },
}: IAppState): ISelectProps => ({
  gameRules,
  playMode,
  playerColor,
  opponent,
  timer,
  isReplay,
  gameElos
});

const Connected = connect<ISelectProps, any>(
  mapStateToProps as any,
  {}
)(GameInfo);

const T = (p: any) => {
  return (
    <Connected
      resign={Object.values(p)[0]}
      onDraw={Object.values(p)[1]}
      drawEnabled={Object.values(p)[2]}
    />
  );
};

export default T;
