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
  IMoveWithTimestamp,
} from "../../store/gameplay/gameplay.interfaces";
import { IAppState } from "../../store/reducers";
import {
  GameRules,
  IMoveSocket,
  MovePieceEnum,
  SpectList
} from "../../interfaces/game.interfaces";
import MovesHistory from "../../components/MovesHistory";
import SpectatorList from "../../components/SpectatorList";
import { IServerStatus, IUser } from "../../store/user/user.interfaces";
import { getOpponentName } from "../../helpers/getOpponentNameByPlayMode";
import { navigate } from "gatsby";
import { isSSR } from "../../lib/utils";
import store from "../../store";
import RequestDrawModal from "../../components/RequestDrawModal";
import AbortGameModal from "../../components/AbortGameModal";
import OpponentLeftModal from "../../components/OpponentLeftModal";
import { getGameTypeElo } from "../../helpers/gameTypeHelper";
import ActionButtons from "../../components/ActionButtons";
import API from "../../services/api.service";
import { ENDPOINTS } from "../../services/endpoints";
import { navigateTo } from "gatsby-link";
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
  showFirstMoveTime: boolean;
}

interface IActionProps {
  setOnMove: typeof GameplayActions.onMove;
  addInMoveHistory: typeof GameplayActions.addInMoveHistory;
  setOpponent: typeof GameplayActions.setOpponent;
  setPlayerColor: typeof GameplayActions.setPlayerColor;
  setLastTimestamp: typeof GameplayActions.setLastTimestamp;
  setFirstMoveTimer: typeof GameplayActions.setFirstMoveTimer;
  setFirstTimer: typeof GameplayActions.setFirstTimer;
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
  firstTimer: ITimer;
  winner: "b" | "w";
  gameElos: IGameplayElos;
  moveHistoryData: string[];
  moveHistoryTimestamp: IMoveWithTimestamp[];
  serverStatus: IServerStatus;
}

export const INITIAL_FEN = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`;

class Spectating extends Component<IActionProps & ISelectProps & PageProps, IState> {
  fen: string = INITIAL_FEN;
  oldFen: string = INITIAL_FEN;
  previousFen: string = INITIAL_FEN;
  token: string = "";
  chessboardWrapperRef = React.createRef<ChessboardWrapper>();
  currentReplayIndex: number = 0;
  initialized: boolean = false;

  unmounted = false;

  state: IState = {
    winner: null,    
    showOpponentLeftModal: false,   
    showSpectatorLeftModal: false,   
    playerName: "",    
    spectlist: [],
    playser_A: {
      playerName: "",
      timerLimit: 5,
      timerBonus: 3,
      drawTimes: 0,
      skillLevel: 20,
      maximumError: 0,
      probability: 0,
      screen: "AI_GAME",
      showEndModal: false,

    },
    player_B: {
      playerName: "",
      timerLimit: 5,
      timerBonus: 3,
      drawTimes: 0,
      skillLevel: 20,
      maximumError: 0,
      probability: 0,
      screen: "AI_GAME",
      showEndModal: false,
    },
  };

  idTimeoutShowModal: NodeJS.Timeout = null;
  constructor(props: any) {
    super(props);
    // SocketService.subscribeTo({
    //     eventName: "spectators-update",
    //     callback: (spectList: ISpectSocket) => {
    //       console.log(spectList);
    //       // this.setState({spectlist});
    //     }
    //   })
    SocketService.subscribeTo({
        eventName: "spectate-piece-move",
        callback: this["move-piece"],
      });
    // this.currentReplayIndex = 0;
  }



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
          this.idTimeoutShowModal = setTimeout(
            () => this.setState({ showEndModal: true, winner }),
            2000
          );
          console.log("game-timeout:", params);

        },
      });
      SocketService.subscribeTo({
        eventName: "spectators-update",
        callback: (spectList: ISpectSocket) => {
          this.setState({spectlist: SpectList});
        }
      })
      SocketService.subscribeTo({
        eventName: "spectate-piece-move",
        callback: this["move-piece"],
      });

    
      SocketService.subscribeTo({
        eventName: "game-cancelled",
        callback: this["game-cancelled"],
      });      
    }
  };

  ["move-piece"] = (move: IMoveSocket) => {
    console.log("move:", move);
    if (!this.chessboardWrapperRef?.current) {
      return;
    }

    const { opponent, moveHistoryData } = this.props;
    const {player_A, player_B} = this.state;
    if (player_A == [] && player_B == []){
      this.setState({player_A: opponent});
    } else if(player_A !== [] && player_B == []){
      this.setState({player_B: opponent});
    } else {
      if(player_A.playerName == opponent.GuestId){
        this.setState({player_A: opponent});
      } else {
        this.setState({player_B: opponent});
      }
    }


    // console.log(this.props);
    if (opponent && this.chessboardWrapperRef?.current ) {
      this.chessboardWrapperRef?.current?.handleMove(move.move as string, true);
    }

    this.props.addToHistoryWithTimestamp({
      move: move.move,
      timestamp: move.timestamp,
    });

    if (moveHistoryData.length === 1) {
      this.props.setFirstMoveTimer();
    }

    if (moveHistoryData.length > 1) {
      this.setState({ showFirstMoveTime: false });
      this.props.setLastTimestamp(move.timestamp);
    }

    console.log("on move-piece::", move);
  };
  

  ["game-cancelled"] = () => {
    const { moveHistoryData, playerColor, opponent, currentUser } = this.props;    
      let xPlayer = opponent.Username;
      this.onCancelledGame(xPlayer);    
  };

  ["stop-spectating"] = () => {
    this.setState({
      showSpectatorLeftModal: true,
    }, ()=> {
      navigateTo("/watch");
    });
  };

  handleMove = (
    fen: string,
    playerOnMove: string,
    move?: string,
    shouldRerender?: boolean,
    isCheck?: boolean,
    isCheckmate?: boolean,
    isDraw?: boolean,
    isRepetition?: boolean,
    isStalemate?: boolean
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
        fen,
        isCheck,
        isCheckmate,
        isDraw,
        isRepetition,
        isStalemate,
      });
    }
    this.props.setOnMove(playerOnMove);
    if (shouldRerender) {
      this.forceUpdate();
    }
  };

  onGameEnd = (winner: "b" | "w" | "draw", isReplay = false) => {
    this.props.stopTimers();
    this.idTimeoutShowModal = setTimeout(
      () => this.setState({ showEndModal: true, winner }),
      2000
    );

    if (!isReplay && this.props.playMode.isHumanVsHuman) {
      this.props.setGameEndDate(Date.now());
      this.props.setGameWinner(winner);
    }
  };

  
  render() {
    const {
    winner,  
    showOpponentLeftModal, 
    showSpectatorLeftModal,   
    playerName,  
    spectlist,
    playser_A,
    player_B,
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
            opponent={player_A}
            currentUser={player_B}
            timer={timer}
            isReplay={this.props.isReplay}
            playMode={playMode}
            moveHistoryData={moveHistoryData}
            serverStatus={this.props.serverStatus}
            onReplayPrevious={this.onReplayPrevious}
            onReplayNext={this.onReplayNext}
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
            onReplayPrevious={this.onReplayPrevious}
            onReplayNext={this.onReplayNext}
            drawEnabled={drawTimes < 5}
            showFirstMoveTime={showFirstMoveTime}
          />
          <SpectatorList list = {this.state.spectlist} />          
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
  firstTimer: state.gameplay.firstTimer,
  gameRules: state.gameplay.gameRules,
  gameElos: state.gameplay.gameElos,
  missedSocketActions: state.gameplay.missedSocketActions,
  isResume: state.gameplay.isResume,
  gameFen: state.gameplay.gameFen,
  winner: state.gameplay.winner,
  currentUser: state.user.currentUser,
  moveHistoryData: state.gameplay.moveHistory,
  moveHistoryTimestamp: state.gameplay.historyWithTimestamp,
  serverStatus: state.user.serverStatus,
});

const connected = connect<ISelectProps, IActionProps>(mapStateToProps as any, {
  setOnMove: GameplayActions.onMove,
  addInMoveHistory: GameplayActions.addInMoveHistory,
  setOpponent: GameplayActions.setOpponent,
  setPlayerColor: GameplayActions.setPlayerColor,
  setLastTimestamp: GameplayActions.setLastTimestamp,
  setFirstMoveTimer: GameplayActions.setFirstMoveTimer,
  setFirstTimer: GameplayActions.setFirstTimer,
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
})(Spectating);

export default connected;
