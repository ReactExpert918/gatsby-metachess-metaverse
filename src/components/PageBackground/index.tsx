import React from "react";
import HorseBackground from "../../lib/svgIcons/HorseBackground";
import KingBackground from "../../lib/svgIcons/KingBackground";
import RookBackground from "../../lib/svgIcons/RookBackground";

const PageBackground = (): JSX.Element => {
  return (
    <>
      <div className="backgroundImages">
        <RookBackground />
        <HorseBackground />
        <KingBackground />
      </div>
    </>
  );
};
export default PageBackground;
