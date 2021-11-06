import React, { useState } from "react";
import SquaredButton from "../SquaredButton";
// import buttonPiece from '../../assets/images/buttonPiece.svg'
import { MODES } from "../../constants/playModes";
import PawnPiece from "../Pieces/PawnPiece";
import { IAppState } from "../../store/reducers";
import { connect } from "react-redux";
import { Actions as GameplayActions } from "../../store/gameplay/gameplay.action";
import MaintenanceModal from "../MaintenanceModal";
import {IServerStatus, MAINTENANCE_MODE} from "../../store/user/user.interfaces";
interface IProps {
  setMode: (p: MODES) => void;
}

interface ISelectChooseModeSectionProps extends IProps {
  serverStatus: IServerStatus;
}
const ChoseModeSection = (props: ISelectChooseModeSectionProps) => {
  const [userSeenMaintenance, setUserSeenMaintenance] = useState(true);
  return (
    <div className={"choseModeSectionContainer"}>
      {!userSeenMaintenance && props.serverStatus.Status !== MAINTENANCE_MODE.ONLINE && (
        <MaintenanceModal
          setUserSeen={() => {
            setUserSeenMaintenance(true);
          }}
        />
      )}
      <div className={"headerWrapper"}>
        <p className={"xx-large"}>CHOOSE A GAME MODE</p>
      </div>
      <div className={"squaredWrapper"}>
        <SquaredButton
          onClick={() => props.setMode(MODES.PLAY_AI)}
          title="PLAY WITH AI"
        >
          <div className={"centered"}>
            <PawnPiece />
          </div>
        </SquaredButton>
        <SquaredButton
          onClick={() => {
            setUserSeenMaintenance(false);
            if (
              props.serverStatus &&
              props.serverStatus.Status === MAINTENANCE_MODE.ONLINE
            ) {
              return props.setMode(MODES.PLAY_WITH_HUMAN);
            }
          }}
          title="PLAY WITH HUMAN"
        >
          <div className={"centered multiple"}>
            <PawnPiece />
            <PawnPiece />
          </div>
        </SquaredButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  serverStatus: state.user.serverStatus,
});

const connected = connect<ISelectChooseModeSectionProps>(
  mapStateToProps as any
)(ChoseModeSection);

export default connected;
