import React, { useState } from "react";
import SquaredButton from "../SquaredButton";
import { MODES } from "../../constants/playModes";
import PawnPiece from "../Pieces/PawnPiece";
import { IAppState } from "../../store/reducers";
import { connect } from "react-redux";
import MaintenanceModal from "../MaintenanceModal";
import {
  IServerStatus,
  MAINTENANCE_MODE,
} from "../../store/user/user.interfaces";
import UserIcon from "../../lib/svgIcons/UserIcon";
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
      {!userSeenMaintenance &&
        props.serverStatus.Status !== MAINTENANCE_MODE.ONLINE && (
          <MaintenanceModal
            setUserSeen={() => {
              setUserSeenMaintenance(true);
            }}
          />
        )}
      <div className={"headerWrapper"}>
        <p className="header-heading">CHOOSE A GAME MODE</p>
      </div>
      <div className={"squaredWrapper"}>
        <SquaredButton
          onClick={() => props.setMode(MODES.PLAY_AI)}
          title="PLAY WITH AI"
        >
          <div className={"bottomAlign mb-25"}>
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
          <div className={"bottomAlign multiple mb-25"}>
            <UserIcon />
            <span className="squaredButtonTitle mb-35">VS</span>
            <UserIcon />
          </div>
        </SquaredButton>
        <SquaredButton title="TOURNAMENT" className="tournamentSquad">
            <PawnPiece />
            <span className="tLine-1"></span>
            <UserIcon className="user-1" />
            <span className="tLine-2"></span>
            <UserIcon className="user-2" />
            <span className="tLine-3"></span>
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
