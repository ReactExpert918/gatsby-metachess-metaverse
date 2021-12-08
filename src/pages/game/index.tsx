import React, { Component } from "react";
import ChessboardWrapper from "../../components/ChessboardWrapper";
import SocketService from "../../services/socket.service";
import WinModal from "../../components/WinModal";
import { connect } from "react-redux";
import { Actions as GameplayActions } from "../../store/gameplay/gameplay.action";
import GameInfo from "../../components/ChessboardWrapper/GameInfo";
import { PageProps } from "gatsby";
import {
  ISetPlayModePayload,
  IGameplayElos,
  ITimer,
} from "../../store/gameplay/gameplay.interfaces";
import { IAppState } from "../../store/reducers";
import {
  GameRules,
  IMoveSocket,
  MovePieceEnum,
} from "../../interfaces/game.interfaces";
import MovesHistory from "../../components/MovesHistory";
import { IUser } from "../../store/user/user.interfaces";
import { getOpponentName } from "../../helpers/getOpponentNameByPlayMode";
import { navigate } from "gatsby";
import { isSSR } from "../../lib/utils";
import store from "../../store";
import RequestDrawModal from "../../components/RequestDrawModal";
import AbortGameModal from "../../components/AbortGameModal";
import OpponentLeftModal from "../../components/OpponentLeftModal";
import { getGameTypeElo } from "../../helpers/gameTypeHelper";
import ActionButtons from "../../components/ActionButtons";

interface IState {
  drawTimes: number;
  skillLevel: number;
  maximumError: number;
  probability: number;
  timerLimit: number;
  timerBonus: number;
  screen: "INTRO" | "AI_SETTINGS" | "AI_GAME" | "ROOMS";
  showEndModal: boolean;
  winner: "b" | "w" | "draw";
  showDrawModal: boolean;
  showAwaitingDrawModal: boolean;
  showOpponentLeftModal: boolean;
  showAbortModal: boolean;
  playerName: string;
}

interface IActionProps {
  setOnMove: typeof GameplayActions.onMove;
  addInMoveHistory: typeof GameplayActions.addInMoveHistory;
  setOpponent: typeof GameplayActions.setOpponent;
  setPlayerColor: typeof GameplayActions.setPlayerColor;
  setLastTimestamp: typeof GameplayActions.setLastTimestamp;
  clear: typeof GameplayActions.clear;
  setLoseMatchForLeaving: typeof GameplayActions.setLoseMatchForLeaving;
  stopTimers: typeof GameplayActions.stopTimers;
  addToHistoryWithTimestamp: typeof GameplayActions.addToHistoryWithTimestamp;
  setReplay: typeof GameplayActions.setReplay;
  setMoveHistory: typeof GameplayActions.setMoveHistory;
  setGameEndDate: typeof GameplayActions.setGameEndDate;
  setGameWinner: typeof GameplayActions.setGameWinner;
  startGame: typeof GameplayActions.startGame;
  setGameElos: typeof GameplayActions.setGameElos;
  setMissedSocketActions: typeof GameplayActions.setMissedSocketActions;
  setGameMounted: typeof GameplayActions.setGameMounted;
}

interface ISelectProps {
  playMode: ISetPlayModePayload;
  opponent: IUser;
  playerColor: "b" | "w";
  isReplay: boolean;
  gameRules: GameRules;
  missedSocketActions: any[];
  isResume: boolean;
  gameFen: string;
  currentUser: IUser;
  timer: ITimer;
  winner: "b" | "w";
  gameElos: IGameplayElos;
  moveHistoryData: string[];
}

export const INITIAL_FEN = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`;

class Game extends Component<IActionProps & ISelectProps & PageProps, IState> {
  fen: string = INITIAL_FEN;
  oldFen: string = INITIAL_FEN;
  chessboardWrapperRef = React.createRef<ChessboardWrapper>();

  initialized: boolean = false;

  unmounted = false;

  state: IState = {
    drawTimes: 0,
    skillLevel: 20,
    maximumError: 0,
    probability: 0,
    timerLimit: 5,
    timerBonus: 3,
    screen: "AI_GAME",
    showEndModal: false,
    winner: null,
    showDrawModal: false,
    showAwaitingDrawModal: false,
    showOpponentLeftModal: false,
    showAbortModal: false,
    playerName: "",
  };

  constructor(props: any) {
    super(props);
    this.onResign = this.onResign.bind(this);
  }

  componentDidMount() {
    if (!this.props.playMode) {
      return;
    }

    if (this.props.isReplay) this.doReplay();
    else if (this.props.playMode.isHumanVsHuman) {
      if (this.props.isResume) {
        this.fen = this.props.gameFen ?? INITIAL_FEN;
        this.forceUpdate();
      } else {
        this.props.missedSocketActions.forEach((t) => {
          if (t && t[0]) {
            // @ts-ignore
            // @ts-nocheck
            this[t[0]](t[1]);
          }
        });
      }
    }

    this.props.setGameMounted(true);
  }

  componentWillUnmount() {
    this.unmounted = true;
    this.props.clear();

    if (
      !this.props.winner &&
      this.props.playMode &&
      !this.props.isReplay &&
      !this.props.playMode.isAI
    ) {
      SocketService.sendData("leave-game", null, null);
      this.props.setLoseMatchForLeaving({
        opponentName: getOpponentName(false, null, this.props.opponent),
        eloLost: this.props.gameElos.eloLose,
        eloDraw: this.props.gameElos.eloDraw,
      });
    }
    this.props.setGameElos(null);
  }

  onDrawRequested = () => {
    this.setState({
      showDrawModal: true,
    });
  };

  onCancelledGame = (playerName: string) => {
    this.setState({ showAbortModal: true, playerName });
  };

  initialize = () => {
    const { playMode } = this.props;

    if (playMode.isHumanVsHuman) {
      SocketService.subscribeTo({
        eventName: "game-timeout",
        callback: (params: { winner: IUser }) => {
          const { opponent, playerColor } = this.props;
          let winner = playerColor;
          if (opponent?.Id && opponent.Id === params?.winner?.Id) {
            winner = playerColor === "w" ? "b" : "w";
          } else if (
            opponent?.GuestId &&
            opponent.GuestId === params?.winner?.GuestId
          ) {
            winner = playerColor === "w" ? "b" : "w";
          } else if (!params.winner) {
            winner = null;
          }
          this.props.stopTimers();
          this.setState({ showEndModal: true, winner });
          console.log("game-timeout:", params);
        },
      });

      SocketService.subscribeTo({
        eventName: "move-piece",
        callback: this["move-piece"],
      });

      SocketService.subscribeTo({
        eventName: "resign",
        callback: this.resign,
      });
      SocketService.subscribeTo({
        eventName: "answer-draw-request",
        callback: this["answer-draw-request"],
      });
      SocketService.subscribeTo({
        eventName: "request-draw",
        callback: this["request-draw"],
      });
      SocketService.subscribeTo({
        eventName: "game-cancelled",
        callback: this["game-cancelled"],
      });
      SocketService.subscribeTo({
        eventName: "leave-game-prompt",
        callback: this["leave-game-prompt"],
      });
    }
  };

  ["move-piece"] = (move: IMoveSocket) => {
    if (!this.chessboardWrapperRef?.current) {
      return;
    }

    const { opponent, moveHistoryData } = this.props;
    if (
      opponent &&
      this.chessboardWrapperRef?.current &&
      ((opponent.Id && opponent.Id === move.player?.Id) ||
        (opponent.GuestId && opponent.GuestId === move.player?.GuestId))
    ) {
      this.chessboardWrapperRef?.current?.handleMove(move.move as string, true);
    }

    this.props.addToHistoryWithTimestamp({
      move: move.move,
      timestamp: move.timestamp,
    });

    if (moveHistoryData.length > 1) {
      this.props.setLastTimestamp(move.timestamp);
    }

    console.log("on move-piece::", move);
  };

  ["resign"] = ({ winner }: any) => {
    this.onGameEnd(
      winner.Id === this.props.currentUser.Id &&
        winner.GuestId === this.props.currentUser.GuestId
        ? this.props.playerColor
        : this.props.playerColor === "w"
        ? "b"
        : "w"
    );
  };

  ["answer-draw-request"] = (drawAccepted: boolean) => {
    this.setState({
      showAwaitingDrawModal: false,
      showDrawModal: false,
    });
    if (drawAccepted) this.onGameEnd("draw");
  };

  ["request-draw"] = () => {
    this.onDrawRequested();
  };

  ["game-cancelled"] = () => {
    const { moveHistoryData, playerColor, opponent, currentUser } = this.props;
    if (moveHistoryData.length === 0) {
      let xPlayer = "";
      if (playerColor === "w") {
        xPlayer = currentUser.Username || "You";
      } else {
        xPlayer = opponent.Username || "Guest";
      }
      this.onCancelledGame(xPlayer);
    }
    if (moveHistoryData.length === 1) {
      let xPlayer = "";
      if (playerColor === "b") {
        xPlayer = currentUser.Username || "You";
      } else {
        xPlayer = opponent.Username || "Guest";
      }
      this.onCancelledGame(xPlayer);
    }
  };

  ["leave-game-prompt"] = () => {
    this.setState({
      showOpponentLeftModal: true,
    });
  };

  handleMove = (
    fen: string,
    playerOnMove: string,
    move?: string,
    shouldRerender?: boolean
  ): void => {
    if (this.unmounted) {
      return;
    }
    const {
      playMode: { isHumanVsHuman },
      playerColor,
      isReplay,
    } = this.props;
    this.fen = fen;
    if (move) {
      this.props.addInMoveHistory(move);
    }
    if (!isReplay && isHumanVsHuman && move && playerOnMove !== playerColor) {
      SocketService.sendData("move-piece", move, (movePiece: MovePieceEnum) => {
        console.log("move-piece:", movePiece, MovePieceEnum);
        switch (movePiece) {
          case MovePieceEnum.OK:
            this.oldFen = fen;
            return;
          case MovePieceEnum.GameNotFound:
          case MovePieceEnum.GameNotStarted:
            navigate("/");
            return;
          case MovePieceEnum.NotAValidMove:
          case MovePieceEnum.NotYourTurn:
            this.fen = this.oldFen;
            this.forceUpdate();
            return;
        }
      });
    } else if (!isReplay && !isHumanVsHuman && move) {
      this.props.addToHistoryWithTimestamp({
        move: move,
        timestamp: new Date().getTime(),
      });
    }
    this.props.setOnMove(playerOnMove);
    if (shouldRerender) {
      this.forceUpdate();
    }
  };

  onGameEnd = (winner: "b" | "w" | "draw", isReplay = false) => {
    this.props.stopTimers();
    this.setState({ showEndModal: true, winner });

    if (!isReplay && this.props.playMode.isHumanVsHuman) {
      this.props.setGameEndDate(Date.now());
      this.props.setGameWinner(winner);
    }
  };

  doReplay = async () => {
    this.fen = INITIAL_FEN;
    this.oldFen = INITIAL_FEN;

    this.props.setReplay(true);
    this.props.setOnMove("w");
    this.props.setLastTimestamp(0);
    this.props.setMoveHistory([]);

    this.forceUpdate(this.realReplay);
  };

  realReplay = async () => {
    const {
      gameplay: {
        historyWithTimestamp,
        startGameDate,
        playMode,
        endGameDate,
        winner,
      },
    } = store.getState() as IAppState;
    this.props.startGame();
    let lastDate = startGameDate;

    const doTheMovePromise = (promiseTime: number, cb: any) =>
      new Promise((res) => {
        setTimeout(() => {
          if (this.unmounted) {
            res();
            return;
          }
          cb();
          res();
        }, promiseTime);
      });

    for await (const m of historyWithTimestamp) {
      if (this.unmounted) return;

      await doTheMovePromise(m.timestamp - lastDate, () => {
        if (this.unmounted) return;
        this.chessboardWrapperRef?.current?.handleMove(m.move as string, true);
        this.props.setLastTimestamp(m.timestamp);
      });
      lastDate = m.timestamp;
    }

    const endAt = playMode
      ? new Date().getTime() + 2000
      : endGameDate - lastDate;
    if (this.unmounted) return;
    if (endAt > 0)
      setTimeout(() => {
        if (this.unmounted) return;
        this.onGameEnd(winner, true);
      }, endAt);
    else {
      this.onGameEnd(winner, true);
    }
  };

  onResign() {
    SocketService.sendData("resign", null, () => {
      // this.onGameEnd(this.props.playerColor === "b" ? "w" : "b");
    });
  }

  onDrawRequest = () => {
    const { drawTimes } = this.state;
    if (drawTimes < 5) {
      SocketService.sendData("request-draw", null, () => {
        this.setState({
          drawTimes: drawTimes + 1,
          showAwaitingDrawModal: true,
        });
      });
    }
  };

  userRequestedDrawTimeout = () => {
    this.setState({
      showDrawModal: false,
      showAwaitingDrawModal: false,
    });
  };

  cancelDraw = () => {
    SocketService.sendData("answer-draw-request", false, () => {
      this.setState({
        showDrawModal: false,
        showAwaitingDrawModal: false,
      });
    });
  };
  confirmDraw = () => {
    SocketService.sendData("answer-draw-request", true, () => {
      this.setState({
        showDrawModal: false,
        showAwaitingDrawModal: false,
      });
      this.onGameEnd("draw");
    });
  };

  render() {
    const {
      skillLevel,
      maximumError,
      probability,
      showEndModal,
      winner,
      drawTimes,
      showDrawModal,
      showAwaitingDrawModal,
      showAbortModal,
      playerName,
    } = this.state;
    const {
      playMode,
      opponent,
      currentUser,
      timer,
      playerColor,
      gameRules,
      gameElos,
      moveHistoryData,
    } = this.props;

    if (!this.props.playMode) {
      navigate("/");
      return null;
    }

    if (!this.initialized && !isSSR) {
      this.initialize();
      this.initialized = true;
    }

    // if (
    //   !this.props.isReplay &&
    //   this.props.playMode &&
    //   !this.props.playMode.isHumanVsHuman &&
    //   !this.props.playMode.isAI
    // ) {
    //   navigate("/");
    //   return null;
    // }

    return (
      <div className="gameContainer">
        {showEndModal && (
          <WinModal
            onReplay={async () => {
              // this.props.setReplay(true);
              this.setState(
                { showEndModal: false, winner: null },
                this.doReplay
              );
            }}
            onClose={() => {
              this.setState({ showEndModal: false });
            }}
            opponent={opponent}
            key={String(showEndModal)}
            isReplay={this.props.isReplay}
            elo={gameRules && getGameTypeElo(gameRules.type, currentUser)}
            gameElos={gameElos}
            gameRules={gameRules}
            winner={winner}
            playerColor={playerColor}
            playMode={playMode}
          />
        )}
        {showAwaitingDrawModal && (
          <RequestDrawModal
            isUserRequested={true}
            cancelDraw={this.userRequestedDrawTimeout}
            confirmDraw={this.confirmDraw}
          />
        )}
        {showDrawModal && (
          <RequestDrawModal
            isUserRequested={false}
            cancelDraw={this.cancelDraw}
            confirmDraw={this.confirmDraw}
          />
        )}
        {showAbortModal && (
          <AbortGameModal
            playerName={playerName}
            onCancel={() => {
              this.setState({ showAbortModal: false, showEndModal: false });
              this.props.clear();
              navigate("/");
            }}
          />
        )}
        <div className="gameWrapper">
          {/* <Chat /> */}
          <MovesHistory />
          <ChessboardWrapper
            gameRules={gameRules}
            ref={this.chessboardWrapperRef}
            skillLevel={skillLevel}
            maximumError={maximumError}
            probability={probability}
            fen={this.fen}
            playerColor={playerColor}
            handleMove={this.handleMove}
            timerLimit={this.state.timerLimit * 1000 * 60}
            timerBonus={this.state.timerBonus * 1000}
            onGameEnd={this.onGameEnd}
            isAI={playMode.isAI}
            aiDifficulty={playMode.aiMode}
            opponent={opponent}
            currentUser={currentUser}
            timer={timer}
            isReplay={this.props.isReplay}
            playMode={playMode}
            moveHistoryData={moveHistoryData}
          />
          {!playMode.isAI && !this.props.isReplay && (
            <ActionButtons
              draw={this.onDrawRequest}
              drawEnabled={drawTimes < 5}
              resign={this.onResign}
            />
          )}
          <GameInfo
            resing={this.onResign}
            onDraw={this.onDrawRequest}
            drawEnabled={drawTimes < 5}
          />

          {this.state.showOpponentLeftModal && (
            <OpponentLeftModal
              playerColor={this.props.playerColor}
              onAnswer={(a) => {
                this.setState({ showOpponentLeftModal: false });
                SocketService.sendData(
                  "leave-game-prompt",
                  a !== "draw",
                  () => {}
                );
                this.onGameEnd(a);
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState): ISelectProps => ({
  playMode: state.gameplay.playMode,
  opponent: state.gameplay.opponent,
  playerColor: state.gameplay.playerColor,
  isReplay: state.gameplay.isReplay,
  timer: state.gameplay.timer,
  gameRules: state.gameplay.gameRules,
  gameElos: state.gameplay.gameElos,
  missedSocketActions: state.gameplay.missedSocketActions,
  isResume: state.gameplay.isResume,
  gameFen: state.gameplay.gameFen,
  winner: state.gameplay.winner,
  currentUser: state.user.currentUser,
  moveHistoryData: state.gameplay.moveHistory,
});

const connected = connect<ISelectProps, IActionProps>(mapStateToProps as any, {
  setOnMove: GameplayActions.onMove,
  addInMoveHistory: GameplayActions.addInMoveHistory,
  setOpponent: GameplayActions.setOpponent,
  setPlayerColor: GameplayActions.setPlayerColor,
  setLastTimestamp: GameplayActions.setLastTimestamp,
  stopTimers: GameplayActions.stopTimers,
  clear: GameplayActions.clear,
  addToHistoryWithTimestamp: GameplayActions.addToHistoryWithTimestamp,
  setReplay: GameplayActions.setReplay,
  setMoveHistory: GameplayActions.setMoveHistory,
  setGameEndDate: GameplayActions.setGameEndDate,
  setGameWinner: GameplayActions.setGameWinner,
  setGameElos: GameplayActions.setGameElos,
  startGame: GameplayActions.startGame,
  setMissedSocketActions: GameplayActions.setMissedSocketActions,
  setLoseMatchForLeaving: GameplayActions.setLoseMatchForLeaving,
  setGameMounted: GameplayActions.setGameMounted,
})(Game);

export default connected;
