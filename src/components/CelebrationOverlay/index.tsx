import React, { useEffect } from "react";
import celebration from "../../assets/images/celebration.gif";

const CelebrationOverlay = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "initial");
  }, []);
  return (
    <div className="overlay-div-celebration">
      <img
        src={celebration}
        alt="animation"
        style={{ width: "50%", height: "50%" }}
      />
      <div className="headerWrapper">
        <div className="header-heading">Level 3 Treasure Found!</div>
      </div>
    </div>
  );
};

export default CelebrationOverlay;
