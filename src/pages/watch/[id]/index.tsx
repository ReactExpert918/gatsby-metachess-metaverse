import React, { useEffect, useRef, useState } from "react";
import ChessboardWrapper from "../../../components/SpectatingChessboardWrapper";
import { IPieceMove } from "../../../components/ChessboardWrapper/interface";
import GameInfo from "../../../components/SpectatingChessboardWrapper/GameInfo";
import MovesHistory from "../../../components/SpectatingChessboardWrapper/MoveHistory";
import {
  GameRules,
  IMoveSocket,
  PieceSide,
} from "../../../interfaces/game.interfaces";
import SocketService from "../../../services/socket.service";
import {
  IGameplayElos,
  IMoveWithTimestamp,
} from "../../../store/gameplay/gameplay.interfaces";
import { IUser } from "../../../store/user/user.interfaces";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../../store/reducers";
import { navigate } from "gatsby";
import subscribeToSpectate from "../../../lib/spectate";
import {
  ISpectateNotification,
  ISpectateReducer,
  NOTIFICATION_TYPE,
} from "../../../store/spectate/spectate.interfaces";
import { Actions } from "../../../store/spectate/spectate.action";
import { INITIAL_FEN } from "../../game";
import WinModal from "../../../components/WinModal";
import { getGameTypeElo } from "../../../helpers/gameTypeHelper";

interface SpectatingRoomInfo {
  secondPlayer?: IUser;
  host?: IUser;
  gameRules?: GameRules;
  startDate?: number;
  gameElos?: IGameplayElos;
  gameStartDate?: number;
  historyMoves?: Array<IMoveWithTimestamp>;
  hostLeft?: boolean;
  hostTimeLeft?: number;
  isHostTurn?: boolean;
  secondPlayerLeft?: boolean;
  secondPlayerTimeLeft?: number;
  spectatorNotifications?: [];
  whitePieces?: { Id: number };
}

const Spectating = (props: any) => {
  const [showEndModal, setShowEndModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<"b" | "w" | "draw" | null>(null);
  // const [replayState, setReplayState] = useState<
  //   "live" | "replay" | "replay-live"
  // >("live");
  const [updater, setupdater] = useState<boolean>(false);
  const currentReplayIndex = useRef<number>(0);
  const initialized = useRef<boolean>(false);
  const replayTimeout = useRef<NodeJS.Timeout>(null);
  const chessboardWrapperRef = useRef<ChessboardWrapper>(null);
  const dispatch = useDispatch();
  const idTimeoutShowModal = useRef<NodeJS.Timeout>(null);
  const {
    spectate: { roomInfo },
  }: { spectate: ISpectateReducer } = useSelector((state: IAppState) => state);
  const fen = useRef<string>(roomInfo?.gameFen || INITIAL_FEN);
  const serverStatus = useSelector(
    (state: IAppState) => state.user.serverStatus
  );
  useEffect(() => {
    fen.current = roomInfo?.gameFen || INITIAL_FEN;
  }, [roomInfo?.gameFen]);
  useEffect(() => {
    const roomId: string = props.id;
    console.log(roomId);
    subscribeToSpectate(roomId);
    return () => clearTimeout(replayTimeout.current);
  }, []);
  const onGameEnd = (
    winner: "b" | "w" | "draw",
    isReplay = false,
    calledByChessboard: boolean = false
  ) => {
    dispatch(Actions.stopTimers());
    if (calledByChessboard)
      idTimeoutShowModal.current = setTimeout(() => {
        setShowEndModal(true);
        setWinner(winner);
      }, 2000);
    else {
      setWinner(winner);
      setShowEndModal(true);
    }
    if (!isReplay) {
      dispatch(Actions.setGameEndDate(new Date().getTime()));
      dispatch(Actions.setGameWinner(winner));
    }
  };
  const movePieceCallback = (moveInfo: IMoveSocket) => {
    console.log(moveInfo);
    // if (replayState === "live")
    chessboardWrapperRef?.current?.handleMove(moveInfo.move as string, true);
    dispatch(
      Actions.setManualTimer({
        black:
          roomInfo.hostColor === "b"
            ? moveInfo.hostTimeLeft
            : moveInfo.secondPlayerTimeLeft,
        white:
          roomInfo.hostColor === "w"
            ? moveInfo.hostTimeLeft
            : moveInfo.secondPlayerTimeLeft,
      })
    );
  };
  const spectateNotificationCallback = (
    spectateNotification: ISpectateNotification
  ) => {
    console.log(spectateNotification);
    const initiatorId =
      spectateNotification.AccountId || spectateNotification.GuestId;
    const hostId = roomInfo?.host?.Id || roomInfo?.host?.GuestId;
    const initiatorIsHost = initiatorId === hostId;
    const opponentColor = roomInfo?.hostColor === "w" ? "b" : "w";
    switch (spectateNotification.Type) {
      case NOTIFICATION_TYPE.AcceptDraw:
        onGameEnd("draw");
        break;
      case NOTIFICATION_TYPE.Resign:
        onGameEnd(!initiatorIsHost ? roomInfo.hostColor : opponentColor);
        break;
      case NOTIFICATION_TYPE.LeavePromptDraw:
        onGameEnd("draw");
        break;
      case NOTIFICATION_TYPE.LeavePromptWin:
        onGameEnd(initiatorIsHost ? roomInfo.hostColor : opponentColor);
        break;
      default:
        break;
    }
  };
  const initialize = () => {
    initialized.current = true;
    SocketService.subscribeTo({
      eventName: "spectate-piece-move",
      callback: movePieceCallback,
    });
    SocketService.subscribeTo({
      eventName: "spectators-notification",
      callback: spectateNotificationCallback,
    });
  };
  const handleMove = (
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
    currentReplayIndex.current += 1;
    dispatch(
      Actions.addInMoveHistory({
        move: move,
        timestamp: new Date().getTime(),
        fen,
        isCheck,
        isCheckmate,
        isDraw,
        isRepetition,
        isStalemate,
      })
    );
    dispatch(Actions.setOnMove(playerOnMove));
  };
  const onReplayNext = () => {
    if (currentReplayIndex.current === roomInfo?.historyMoves?.length) return;
    clearTimeout(replayTimeout.current);
    // dispatch(
    //   Actions.setOnMove((currentReplayIndex.current - 1) % 2 === 0 ? "w" : "b")
    // );
    // dispatch(
    //   Actions.setMoveHistory(
    //     roomInfo?.moveHistory.slice(0, currentReplayIndex.current)
    //   )
    // );
    const historyWithTimestamp = roomInfo?.historyMoves;
    chessboardWrapperRef?.current?.handleMove(
      historyWithTimestamp[currentReplayIndex.current].move as string,
      true
    );
    fen.current = roomInfo?.historyMoves?.[currentReplayIndex.current - 1].fen;
    // currentReplayIndex.current += 1;
    setupdater(!updater);
    replayTimeout.current = setTimeout(
      () => recursiveReplayFunction(currentReplayIndex.current),
      2000
    );
  };

  const onReplayPrevious = () => {
    if (currentReplayIndex.current < 0) return;
    clearTimeout(replayTimeout.current);
    if (currentReplayIndex.current <= 1) {
      dispatch(Actions.setMoveHistory(roomInfo?.moveHistory.slice(0, 0)));
      dispatch(Actions.setOnMove("w"));
      currentReplayIndex.current = 0;
      fen.current = INITIAL_FEN;
      replayTimeout.current = setTimeout(
        () => recursiveReplayFunction(0),
        2000
      );
    } else {
      const temp = currentReplayIndex.current - 1;
      dispatch(Actions.setMoveHistory(roomInfo?.moveHistory.slice(0, temp)));
      dispatch(Actions.setOnMove(temp % 2 === 0 ? "b" : "w"));
      const historyWithTimestamp = roomInfo?.historyMoves;
      currentReplayIndex.current -= 1;
      fen.current = historyWithTimestamp[temp - 1].fen || INITIAL_FEN;
      replayTimeout.current = setTimeout(
        () => recursiveReplayFunction(temp),
        2000
      );
    }
  };

  const doReplay = async (
    last?: number,
    moveHistory?: string[],
    onMove?: string
  ) => {
    dispatch(Actions.setOnMove(onMove || "w"));
    dispatch(Actions.setMoveHistory(moveHistory || []));
    currentReplayIndex.current = last || 0;
    fen.current = INITIAL_FEN;
    setupdater(!updater);
    realReplay();
  };

  const recursiveReplayFunction = (index: number) => {
    const historyWithTimestamp = roomInfo?.historyMoves;
    if (index === historyWithTimestamp.length) {
      const { gameEndDate, winner } = roomInfo;
      onGameEnd(winner, true);
      return;
    }
    const m = historyWithTimestamp[index];
    console.log(currentReplayIndex, index);
    chessboardWrapperRef?.current?.handleMove(m.move as string, true);
    fen.current = m.fen;
    // dispatch(Actions.setMoveHistory(roomInfo?.historyMoves.slice(0, index + 1)));
    // dispatch(Actions.setOnMove(index % 2 === 0 ? "b" : "w"));
    setupdater(!updater);
    currentReplayIndex.current = index + 1;
    replayTimeout.current = setTimeout(
      () => recursiveReplayFunction(index + 1),
      2000
    );
  };

  const realReplay = async () => {
    replayTimeout.current = setTimeout(() => recursiveReplayFunction(0), 2000);
  };
  if (!roomInfo?.gameRules) return <div>spectatin</div>;
  if (!initialized.current) initialize();
  return (
    <div className="gameContainer">
      {showEndModal && (
        <WinModal
          onReplay={async () => {
            // this.props.setReplay(true);
            dispatch(Actions.setReplay(true));
            setShowEndModal(false);
            setWinner(null);
            doReplay();
          }}
          prefix="Game Host"
          onClose={() => {
            setShowEndModal(false);
          }}
          opponent={roomInfo.secondPlayer}
          // key={String(showEndModal)}
          isReplay={roomInfo.isReplay}
          elo={
            roomInfo.gameRules &&
            getGameTypeElo(roomInfo.gameRules.type, roomInfo.host)
          }
          gameElos={roomInfo.gameElos}
          gameRules={roomInfo.gameRules}
          winner={winner}
          playerColor={roomInfo.hostColor}
          //@ts-ignore
          playMode={{ isHumanVsHuman: true, isAI: false }}
        />
      )}
      <div className="gameWrapper">
        {/* <Chat /> */}
        <MovesHistory />
        <ChessboardWrapper
          gameRules={roomInfo?.gameRules}
          ref={chessboardWrapperRef}
          fen={fen.current}
          playerColor={roomInfo.hostColor}
          timerLimit={5 * 1000 * 60}
          // key={fen.current}
          timerBonus={3 * 1000}
          handleMove={handleMove}
          onGameEnd={onGameEnd}
          // aiDifficulty={playMode.aiMode}
          // opponent={roomInfo?.opponent}
          // host={roomInfo?.host}
          isReplay={roomInfo.isReplay}
          winner={roomInfo?.winner}
          playMode={{
            isHumanVsHuman: true,
            isAI: false,
            roomName: props.id,
            aiMode: 0,
            isCreate: true,
          }}
          moveHistoryData={roomInfo?.historyMoves}
          serverStatus={serverStatus}
          onReplayPrevious={onReplayPrevious}
          onReplayNext={onReplayNext}
          opponent={roomInfo?.secondPlayer}
          host={roomInfo?.host}
          timer={roomInfo?.timer}
        />
        {/* {!playMode.isAI && !props.isReplay && (
            <ActionButtons
              draw={onDrawRequest}
              drawEnabled={drawTimes < 5}
              resign={onResign}
            />
          )} */}
        <GameInfo
          onReplayPrevious={onReplayPrevious}
          onReplayNext={onReplayNext}
          showFirstMoveTime={false}
        />

        {/* {showOpponentLeftModal && (
            <OpponentLeftModal
              playerColor={props.playerColor}
              onAnswer={(a) => {
                setState({ showOpponentLeftModal: false });
                SocketService.sendData(
                  "leave-game-prompt",
                  a !== "draw",
                  () => { }
                );
                onGameEnd(a);
              }}
            />
          )} */}
      </div>
    </div>
  );
};

export default Spectating;
