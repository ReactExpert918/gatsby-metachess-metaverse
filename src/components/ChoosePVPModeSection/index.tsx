import React, { useState } from "react";
import SquaredButton from "../SquaredButton";
import { MODES } from "../../constants/playModes";
import { IAppState } from "../../store/reducers";
import { connect } from "react-redux";
import { Actions as UserActions } from "../../store/user/user.action";
import MaintenanceModal from "../MaintenanceModal";
import {
  IServerStatus,
  MAINTENANCE_MODE,
} from "../../store/user/user.interfaces";
interface IProps {
  setMode: typeof UserActions.setChoseMode;
}

interface ISelectChooseModeSectionProps {
  serverStatus: IServerStatus;
}
const ChoosePVPModeSection = (
  props: ISelectChooseModeSectionProps & IProps
) => {
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
            <span className="d-flex user"></span>
            <span className="squaredButtonTitle mb-35">VS</span>
            <span className="d-flex user"></span>
          </div>
        </SquaredButton>
        <SquaredButton title="TOURNAMENT" className="tournamentSquad">
          <span className="d-flex pawn"></span>
          <span className="tLine-1"></span>
          <span className="d-flex user user-1"></span>
          <span className="tLine-2"></span>
          <span className="d-flex user user-2"></span>
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
)(ChoosePVPModeSection);

export default connected;
