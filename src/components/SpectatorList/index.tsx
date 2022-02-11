import React from "react";
import { useRef } from "react";
import { IAppState } from "../../store/reducers";
import { connect, useSelector } from "react-redux";
import eyes from "../../assets/images/eye.png";


const SpectatorList = ({ list }) => {
  const Lists = useRef(null);
  function showing() {
    if (Lists.current.classList[1] == "showing") {
      Lists.current.classList.remove("showing");
    } else {
      Lists.current.classList.add("showing");
    }
  }

  // const PP = ["AA", "B"];
  return (
    <div className="spectlist">
      <div className="spectlistCellWrapper" ref={Lists}>
        {(list || []).map((spectator: string, index: number) => (
          <p key={index}>
            {spectator["GuestId"]} is looking for your game.
          </p>
        ))}
      </div>
      <button className="spectatorsListContainer" onClick={showing}>
        <img src={eyes} className="watchImg" />
        <p className="watchcount">{list.length}</p>
      </button>

    </div>

  );
}

// const mapStateToProps = );

// const connected = connect<ISelectProps, {}>(mapStateToProps as any, {})(SpectatorList);

export default SpectatorList;
