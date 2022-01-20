import React from "react";
import SquaredButton from "../SquaredButton";
import { AI_PLAY_MODE } from "../../constants/playModes";

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
        <p className="header-heading">CHOOSE AI DIFFICULTY</p>
      </div>
      <div className={"squaredWrapper"}>
        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.BEGINNER)}
          title="BEGINNER"
        >
          <div className="bottomAlign">
            <span className="d-flex pawn"></span>
          </div>
        </SquaredButton>
        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.ROOKIE)}
          title="ROOKIE"
        >
          <div className="bottomAlign">
            <span className="d-flex horse"></span>
          </div>
        </SquaredButton>

        <SquaredButton
          onClick={() => props.setPlayMode(AI_PLAY_MODE.AMATEUR)}
          title="AMATEUR"
        >
          <div className="bottomAlign">
            <span className="d-flex bishop"></span>
          </div>
        </SquaredButton>

        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.INTERMEDIATE)}
          title="INTERMEDIATE"
        >
          <div className="bottomAlign">
            <span className="d-flex rook"></span>
          </div>
        </SquaredButton>
      </div>
      <div className={"squaredWrapper"}>
        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.PROFESSIONAL)}
          title="PROFESSIONAL"
        >
          <div className="bottomAlign">
            <span className="d-flex king"></span>
          </div>
        </SquaredButton>

        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.WORLD_CLASS)}
          title="WORLD CLASS"
        >
          <div className="bottomAlign">
            <span className="d-flex queen"></span>
          </div>
        </SquaredButton>
        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.MASTER)}
          title="MASTER"
        >
          <div className="bottomAlign">
            <span className="d-flex king"></span>
            <span className="d-flex queen"></span>
          </div>
        </SquaredButton>
        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.GRAND_MASTER)}
          title="GRAND MASTER"
        >
          <div className="bottomAlign">
            <span className="d-flex king"></span>
            <span className="d-flex queen"></span>
            <span className="d-flex rook"></span>
          </div>
        </SquaredButton>
      </div>
      <div className={"squaredWrapper"}>
        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.LEGEND)}
          title="LEGEND"
        >
          <div className="bottomAlign">
            <span className="d-flex king"></span>
            <span className="d-flex queen"></span>
            <span className="d-flex rook"></span>
            <span className="d-flex bishop"></span>
          </div>
        </SquaredButton>
        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.IMMORTAL)}
          title="IMMORTAL"
        >
          <div className="bottomAlign">
            <span className="d-flex king"></span>
            <span className="d-flex queen"></span>
            <span className="d-flex rook"></span>
            <span className="d-flex bishop"></span>
            <span className="d-flex horse"></span>
            <span className="d-flex pawn"></span>
          </div>
        </SquaredButton>
      </div>
    </div>
  );
};

export default PlayWithAISection;
