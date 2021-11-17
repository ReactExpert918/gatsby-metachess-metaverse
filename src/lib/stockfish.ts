import Chess, { ChessInstance, Square } from "chess.js";
import { IPieceMove } from "../components/ChessboardWrapper/interface";
import { AI_PLAY_MODE } from "../constants/playModes";

type MovePieceType = (param: IPieceMove, isAI: boolean) => void;

class _Stockfish {
  private stockfish: any;
  private game: ChessInstance;
  private movePiece: MovePieceType;

  private aiDepth: number = 10;
  private aiSkillLevel: number = 20;
  private aiMaximumErrorLevel: number = 900;
  private aiProbability: number = 10;

  private set aiSettings(aiDifficulty: AI_PLAY_MODE) {
    switch (aiDifficulty) {
      case AI_PLAY_MODE.BEGGINER:
        this.aiDepth = 1;
        this.aiSkillLevel = 0;
        this.aiMaximumErrorLevel = 600;
        this.aiProbability = 10;
        break;
      case AI_PLAY_MODE.AMATEUR:
        this.aiDepth = 3;
        this.aiSkillLevel = 3;
        this.aiMaximumErrorLevel = 450;
        this.aiProbability = 40;
        break;
      case AI_PLAY_MODE.INTERMEDIATE:
        this.aiDepth = 11;
        this.aiSkillLevel = 6;
        this.aiMaximumErrorLevel = 200;
        this.aiProbability = 100;
        break;
      case AI_PLAY_MODE.PROFESSIONAL:
        this.aiDepth = 15;
        this.aiSkillLevel = 15;
        this.aiMaximumErrorLevel = 100;
        this.aiProbability = 500;
        break;
      case AI_PLAY_MODE.WORLD_CLASS:
        this.aiDepth = 20;
        this.aiSkillLevel = 20;
        this.aiMaximumErrorLevel = 0;
        this.aiProbability = 1000;
        break;
    }
  }

  changeReferences = (game: ChessInstance, movePiece: MovePieceType) => {
    this.game = game;
    this.movePiece = movePiece;
  };

  init = (
    skillLevel: number,
    maximumError: number,
    probability: number,
    playerColor: "b" | "w",
    game: ChessInstance,
    movePiece: MovePieceType,
    aiDifficulty: AI_PLAY_MODE
  ) => {
    this.changeReferences(game, movePiece);
    this.aiSettings = aiDifficulty;
    this.stockfish = new Worker("/stockfish.js");
    this.game = game;
    this.stockfish.onmessage = (event: any) => {
      if (event.data === "uciok" && playerColor === "b") {
        this.handleAIPlay();
        // this.setState({ gameReady: true });
      } else if (event.data.includes("Fen: ")) {
        return console.log(event.data);
      } else if (event.data.includes("bestmove ")) {
        const x = event.data.split("bestmove ")[1].substring(0, 4);
        const sourceSquare = x.substring(0, 2);
        const targetSquare = x.substring(2, 4);
        setTimeout(() => {
          this.movePiece(
            {
              sourceSquare,
              targetSquare,
            },
            true
          );
        }, 200);
      }
    };

    this.stockfish.postMessage("uci");

    this.stockfish.postMessage("ucinewgame");

    this.stockfish.postMessage(
      `setoption name Skill Level value ${this.aiSkillLevel}`
    );
    this.stockfish.postMessage(
      `setoption name Skill Level Maximum Error value ${this.aiMaximumErrorLevel}`
    );
    this.stockfish.postMessage(
      `setoption name Skill Level Probability value ${this.aiProbability}`
    );
  };

  handleAIPlay = () => {
    this.stockfish.postMessage("position fen " + this.game.fen());
    this.stockfish.postMessage(`go depth ${this.aiDepth}`);
  };
}

const Stockfish = new _Stockfish();

export default Stockfish;
