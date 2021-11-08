import { navigate } from "gatsby";
import React, { useState } from "react";
import BorderedGameButton from "../components/BorderedGameButton";
import Chessboard2D from "../lib/svgIcons/Chessboard2D";
import Chessboard3D from "../lib/svgIcons/Chessboard3D";
import Chessboard3DWarF from "../lib/svgIcons/Chessboard3DWarF";

const ChooseGame = () => {
  return (
    <div className={"choseModeSectionContainer"}>
      <div className={"headerWrapper"}>
        <p className="header-heading">GAME</p>
      </div>
      <div className="borderedButtonWrapper">
        <BorderedGameButton
          GameIcon={<Chessboard2D className="game-2d-icon" />}
          title="2D"
          available
          onPlayClick={()=>navigate('/choose-mode')}
        />
        <BorderedGameButton
          GameIcon={<Chessboard3D className="game-3d-icon" />}
          title="3D"
        />
        <BorderedGameButton
          GameIcon={<Chessboard3DWarF className="game-3df-icon" />}
          title="3D"
          subtitle="War-front"
        />
      </div>
    </div>
  );
};

export default ChooseGame;
