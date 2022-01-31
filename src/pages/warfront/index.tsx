import React, { Component } from "react";
import Chess, { ChessInstance, Square } from "chess.js";
import Stockfish from "../../lib/stockfish";
import SocketService from "../../services/socket.service";
import { ISetPlayModePayload } from "../../store/gameplay/gameplay.interfaces";
import { IUser } from "../../store/user/user.interfaces";
import { AI_PLAY_MODE } from "../../constants/playModes";
import { IAppState } from "../../store/reducers";
import { connect } from "react-redux";
import { IPieceMove } from "../../components/ChessboardWrapper/interface";
import { MovePieceEnum } from "../../interfaces/game.interfaces";
import { navigate } from "gatsby";

interface IProps {
  playMode: ISetPlayModePayload;
  playerColor: "b" | "w";
  isAI: boolean;
  aiDifficulty: AI_PLAY_MODE;
  isReplay: boolean;
}

interface IActionProps {}

const GameObj = "StateManager";
class WarFront extends Component<IProps> {
  game: ChessInstance;
  unityInstance: any;
  componentDidMount(): void {
    // When the component is mounted, we'll register some event listener.
    const { playerColor } = this.props;
    const Window = window as any;
    this.game = new (Chess as any)();
    this.loadUnity();
    this.forceUpdate();
    if (this.props.isAI) {
      Stockfish.init(
        null,
        null,
        null,
        playerColor,
        this.game,
        this.handleMove,
        this.props.aiDifficulty
      );
    }
    Window.getPossibleAns = (from: Square) => {
      // if (!this.playerCanPlay()) {
      //   return "[]";
      // }
      const moves = this.game.moves({
        square: from,
        verbose: true,
      });

      // exit if there are no moves available for this square
      if (moves.length === 0) {
        return "[]";
      }
      return JSON.stringify(moves.map((m) => m.to));
    };
    Window.move = (from: Square, to: Square) => {
      console.log("move from", from);
      console.log("move to", to);
      this.handleMove({ sourceSquare: from, targetSquare: to });
    };
    Window.promote = (side: string, which: string, where: string) => {
      console.log(side, which, where);
      // this.handleMultiplayerMove(which === "white" ? "w" : "b", where);
    };
  }
  initialize = () => {
    const { playMode } = this.props;
    if (playMode.isHumanVsHuman) {
      // SocketService.subscribeTo({
      //   eventName: "game-timeout",
      //   callback: this["game-timeout"],
      // });
      // SocketService.subscribeTo({
      //   eventName: "game-cancelled",
      //   callback: this["game-cancelled"],
      // });
    }
  };
  playerCanPlay = (): boolean => {
    if (this.props.isReplay) {
      return false;
    }
    return this.props.playerColor === this.game?.turn();
  };
  handleMultiplayerMove = (
    // fen: string,
    playerOnMove: string,
    move?: string
    // shouldRerender?: boolean,
    // isCheck?: boolean,
    // isCheckmate?: boolean,
    // isDraw?: boolean,
    // isRepetition?: boolean,
    // isStalemate?: boolean
  ): void => {
    const {
      playMode: { isHumanVsHuman },
      playerColor,
      isReplay,
    } = this.props;
    if (!isReplay && isHumanVsHuman && move && playerOnMove !== playerColor) {
      SocketService.sendData("move-piece", move, (movePiece: MovePieceEnum) => {
        console.log("move-piece:", movePiece, MovePieceEnum);
        switch (movePiece) {
          case MovePieceEnum.OK:
            return;
          case MovePieceEnum.GameNotFound:
          case MovePieceEnum.GameNotStarted:
            navigate("/");
            return;
          case MovePieceEnum.NotAValidMove:
          case MovePieceEnum.NotYourTurn:
            this.forceUpdate();
            return;
        }
      });
    }
  };
  handleMove = (nextMove: IPieceMove, isAI?: boolean) => {
    if (
      nextMove &&
      this.props.playerColor &&
      this.props.playerColor !== this.game.turn() &&
      !isAI
    ) {
      return;
    }
    // see if the move is legal
    const move = this.game.move({
      from: nextMove.sourceSquare,
      to: nextMove.targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {
      return;
    }
    if (move.promotion) {
      this.unityInstance.SendMessage(
        GameObj,
        "OnPromoted",
        JSON.stringify({
          side: this.game.turn() === "w" ? "white" : "black",
          which: move.promotion,
          where: nextMove.targetSquare,
        })
      );
    }
    if (this.game.in_checkmate()) {
      this.unityInstance.SendMessage(
        GameObj,
        "OnCheckmate",
        this.game.turn() !== "w" ? "white" : "black"
      );
    } else if (this.game.in_check()) {
      this.unityInstance.SendMessage(
        GameObj,
        "OnCheck",
        this.game.turn() !== "w" ? "white" : "black"
      );
    } else if (
      this.game.in_stalemate() ||
      this.game.in_draw() ||
      this.game.in_threefold_repetition()
    ) {
      this.unityInstance.SendMessage(GameObj, "OnDraw");
    }
    // this.unityInstance.SendMessage(
    //   GameObj,
    //   "OnMoved",
    //   JSON.stringify({ from: nextMove.sourceSquare, to: nextMove.targetSquare })
    // );
    if (isAI) {
      //this.forceUpdate();
    } else {
      this.forceUpdate(() => {
        if (this.props.isAI) {
          setTimeout(() => {
            Stockfish.handleAIPlay();
          }, 500);
        }
      });
    }
  };
  loadUnity = () => {
    var loaderUrl = "Chess3D/Chess3D.loader.js";
    var config = {
      dataUrl: "Chess3D/Chess3D.data",
      frameworkUrl: "Chess3D/Chess3D.framework.js",
      codeUrl: "Chess3D/Chess3D.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "MetaChess",
      productName: "Projecthess 3D",
      productVersion: "1.0.0",
    };
    var script = document.createElement("script");
    script.src = loaderUrl;
    var canvas = document.querySelector("#unity-canvas");
    script.onload = () => {
      (window as any)
        .createUnityInstance(canvas, config)
        .then((unityInstance: any) => {
          this.unityInstance = unityInstance;
          this.unityInstance.SendMessage(
            GameObj,
            "OnInit",
            JSON.stringify({ myTurn: true })
          );
        })
        .catch((message: any) => {
          alert(message);
        });
    };
    console.log(script);
    document.body.appendChild(script);
  };
  // ["game-timeout"] = (params: { winner: IUser }) => {
  //   //unityContext.send(GameObj, "Timeout", JSON.stringify(params));
  // };
  // ["game-cancelled"] = () => {};

  // handleUnityMovePiece = (source: string, target: string) => {
  //   console.log("handleUnityMovePiece source", source);
  //   console.log("handleUnityMovePiece target", target);
  //   // Logic to validate the move
  //   // ----------------

  //   //Update the status on Unity
  //   // unityContext.send(
  //   //   GameObj,
  //   //   "UpdateMoveStatus",
  //   //   JSON.stringify({
  //   //     source,
  //   //     target,
  //   //     valid: true,
  //   //     status: "check",
  //   //   })
  //   // );
  // };

  componentWillUnmount(): void {
    //unityContext.removeAllEventListeners();
  }

  render() {
    return (
      <>
        <div className="warfront-page">
          <canvas id="unity-canvas" width="960" height="600"></canvas>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IAppState): IProps => ({
  playMode: { isHumanVsHuman: false },
  playerColor: "w",
  isReplay: false,
  isAI: true,
  aiDifficulty: AI_PLAY_MODE.AMATEUR,
});

const connected = connect<IProps, IActionProps>(
  mapStateToProps as any,
  {}
)(WarFront);

export default connected;
