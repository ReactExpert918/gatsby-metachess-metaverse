import React, { useState, useContext, useEffect } from "react";
import ChoseModeSection from "../components/ChoseModeSection";
import PlayWithAISection from "../components/PlayWithAISection";
import { MODES, AI_PLAY_MODE } from "../constants/playModes";
import { connect } from "react-redux";
import { Actions as GameplayActions } from "../store/gameplay/gameplay.action";
import { Actions as UserActions } from "../store/user/user.action";
import { navigate } from "gatsby";
import PlayWithHumanSection from "../components/PlayWithHumanSection";
import { IAppState } from "../store/reducers";
import { IServerStatus } from "../store/user/user.interfaces";
import { isSSR } from "../lib/utils";

interface IActionProps {
  setPlayMode: typeof GameplayActions.setPlayMode;
  setPlayerColor: typeof GameplayActions.setPlayerColor;
  setChoseMode: typeof UserActions.setChoseMode;
  setGameStartDate: typeof GameplayActions.setGameStartDate;
}

interface ISelectChooseModeProps {
  serverStatus: IServerStatus;
  choseMode: MODES;
}

const ChoseMode = (props: ISelectChooseModeProps & IActionProps) => {
  const setAIPlayMode = (playMode: AI_PLAY_MODE) => {
    props.setPlayMode({
      isAI: true,
      isHumanVsHuman: false,
      aiMode: playMode,
    });
    props.setGameStartDate(new Date().getTime());
    props.setPlayerColor(Math.random() >= 0.5 ? "b" : "w");
    navigate("/game");
  };

  const onJoinRoom = (roomName: string) => {
    props.setPlayMode({
      isHumanVsHuman: true,
      roomName,
      isCreate: false,
    });
    navigate("/game");
  };
  const onGoBack = () => {
    props.setChoseMode(MODES.CHOSE_MODE);
  };

  const { choseMode } = props;

  return (
    <div
      className={`choseModeContainer desktopMaxWidth ${
        choseMode === MODES.PLAY_WITH_HUMAN && `no-align-center`
      }`}
    >
      {choseMode === MODES.CHOSE_MODE && <ChoseModeSection setMode={props.setChoseMode} />}
      {choseMode === MODES.PLAY_AI && (
        <PlayWithAISection setPlayMode={setAIPlayMode} goBack={onGoBack} />
      )}
      {choseMode === MODES.PLAY_WITH_HUMAN && (
        <PlayWithHumanSection goBack={onGoBack} onJoinRoom={onJoinRoom} />
      )}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  serverStatus: state.user.serverStatus,
  choseMode: state.user.choseMode,
});

const connected = connect<ISelectChooseModeProps, IActionProps>(
  mapStateToProps as any,
  {
    setPlayMode: GameplayActions.setPlayMode,
    setPlayerColor: GameplayActions.setPlayerColor,
    setChoseMode: UserActions.setChoseMode,
    setGameStartDate: GameplayActions.setGameStartDate,
  }
)(ChoseMode);

export default connected;
