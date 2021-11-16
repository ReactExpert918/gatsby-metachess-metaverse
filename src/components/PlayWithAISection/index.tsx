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
          onClick={() => props.setPlayMode(AI_PLAY_MODE.BEGGINER)}
          title="BEGGINER"
        >
          <div className="bottomAlign">
            <span className="d-flex pawn"></span>
          </div>
        </SquaredButton>

        <SquaredButton
          onClick={() => props.setPlayMode(AI_PLAY_MODE.AMATEUR)}
          title="AMATEUR"
        >
          <div className="bottomAlign">
            <span className="d-flex horse"></span>
          </div>
        </SquaredButton>

        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.INTERMEDIATE)}
          title="INTERMEDIATE"
        >
          <div className="bottomAlign">
            <span className="d-flex bishop"></span>
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
            <span className="d-flex rook"></span>
          </div>
        </SquaredButton>

        <SquaredButton
          className={"noMargin"}
          onClick={() => props.setPlayMode(AI_PLAY_MODE.WORLD_CLASS)}
          title="WORLD CLASS"
        >
          <div className="bottomAlign">
            <span className="d-flex king"></span>
          </div>
        </SquaredButton>
      </div>
    </div>
  );
};

export default PlayWithAISection;
