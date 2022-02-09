import React from "react";
import {useRef} from "react";
import { IAppState } from "../../store/reducers";
import { connect, useSelector } from "react-redux";
import eyes from "../../assets/images/eye.png";


const SpectatorList = ({ list }) => {  
// const list = this.props.list;
  const Lists = useRef(null);
function showing (){
  Lists.current.classList.add("showing");
}

function hidden () {
  Lists.current.classList.remove("showing");
}
// const PP = ["AA", "B"];
  return (
    <div className="spectlist">
    <div className="cellWrapper" ref={Lists}>
        {list.map((spectator: string, index: number) => (
          <p key={index}>
            {spectator} is looking for your game.
          </p>
        )).reverse()}
      </div>
    <button className="spectatorsListContainer" onMouseOver = {showing} onMouseLeave = {hidden}
    >
      <img src={eyes} className="watchImg" />
      <p className="watchcount">{list.length}</p> 
    </button>     
      
     </div> 
    
  );
}

// const mapStateToProps = );

// const connected = connect<ISelectProps, {}>(mapStateToProps as any, {})(SpectatorList);

export default SpectatorList;
