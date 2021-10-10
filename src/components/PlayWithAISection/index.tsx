import React from "react";
import SquaredButton from "../SquaredButton";
import buttonPiece from "../../assets/images/buttonPiece.svg";
import { AI_PLAY_MODE } from "../../constants/playModes";
import HorsePiece from "../Pieces/HorsePiece";
import PawnPiece from "../Pieces/PawnPiece";
import BishopPiece from "../Pieces/BishopPiece";
import RookPiece from "../Pieces/RookPiece";
import KingPiece from "../Pieces/KingPiece";

interface IProps {
  setPlayMode: (p: AI_PLAY_MODE) => void;
  goBack: () => void;
}

const PlayWithAISection = (props: IProps) => {
  return (
    <div className={"playWithAISectionContainer"}>
      <div className={"backToSelection"}>
        <p
          className={"normal"}
          onClick={props.goBack}
        >{`< Choose a game mode`}</p>
      </div>
      <div className={"headerWrapper"}>
        <p className={"xx-large"}>CHOOSE AI DIFFICULTY</p>
      </div>
      <div className={"squaredWrapper"}>
        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.BEGGINER)}
          title="BEGGINER"
        >
          <div className="centered">
            <PawnPiece />
          </div>
        </SquaredButton>

        <SquaredButton
          onClick={() => props.setPlayMode(AI_PLAY_MODE.AMATEUR)}
          title="AMATEUR"
        >
          <div className="centered">
            <HorsePiece />
          </div>
        </SquaredButton>

        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.INTERMEDIATE)}
          title="INTERMEDIATE"
        >
          <div className="centered">
            <BishopPiece />
          </div>
        </SquaredButton>
      </div>
      <div className={"squaredWrapper"}>
        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.PROFESSIONAL)}
          title="PROFESSIONAL"
        >
          <div className="centered">
            <RookPiece />
          </div>
        </SquaredButton>

        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.WORLD_CLASS)}
          title="WORLD CLASS"
        >
          <div className="centered">
            <KingPiece />
          </div>
        </SquaredButton>
      </div>
    </div>
  );
};

export default PlayWithAISection;