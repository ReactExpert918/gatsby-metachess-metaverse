import React, { useRef, useState } from "react";
import { connect, Provider } from "react-redux";

import store from "./src/store";
import SocketService from "./src/services/socket.service";
import API from "./src/services/api.service";
import queryString from "query-string";
import "./src/global.scss";
import TOKEN from "./src/services/token.service";
import { Actions as userActions } from "./src/store/user/user.action";
import { Actions as gameplayActions } from "./src/store/gameplay/gameplay.action";
import { navigate } from "gatsby";
import { IAppState } from "./src/store/reducers";
import { IGameResume, ISetPlayModePayload } from "./src/store/gameplay/gameplay.interfaces";
import { isSSR } from "./src/lib/utils";
import {
  IServerStatus,
  MAINTENANCE_MODE,
  IUser,
} from "./src/store/user/user.interfaces";
import ResumeOldGameModal from "./src/components/ResumeOldGameModal";
import { addMissedSocketActions } from "./src/lib/missedSocketActions";
import { ILoseMatchForLeaving } from "./src/interfaces/game.interfaces";
import { MAIN_WEBSITE } from "./src/config";

interface ISelectXProps {
  playMode: ISetPlayModePayload;
  loseMatchForLeaving: ILoseMatchForLeaving;
  serverStatus: IServerStatus;
}

interface IActionProps {
  setLoseMatchForLeaving: typeof gameplayActions.setLoseMatchForLeaving
}

// console.log = () => {};
const X = (p: ISelectXProps & IActionProps & { children: any }) => {

  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef<boolean>(false);

  if (!p.serverStatus) {
    store.dispatch(userActions.fetchServerStatus());
    return null;
  }
  if (p.serverStatus && p.serverStatus.MaintenanceMode === MAINTENANCE_MODE.UNDER_MAINTENANCE) {
    navigate("/maintenance");
  }
  SocketService.subscribeTo({
    eventName: "app-settings-change",
    callback: (serverStatus: IServerStatus) => {
      if (serverStatus) {
        store.dispatch(userActions.setServerStatus(serverStatus));
      }
    },
  });
  if (!initialized.current && !isSSR) {
    // const { token: queryToken } = queryString.parse(window.location.search);

    // if (queryToken) {
    //   TOKEN.remove();
    //   TOKEN.user = queryToken as string;
    //   API.initialize();
    // }
    const token = TOKEN.user;

    SocketService.init();

    SocketService.subscribeTo({
      eventName: "running-match",
      callback: (runningMatch: IGameResume) => {

        console.log(runningMatch);

        store.dispatch(gameplayActions.resumeGame(runningMatch));
        navigate("/game");

        // SocketService.sendData("resume-my-game", null, (...args: any) => {
        //   console.log("resume-my-game In running match - set-guest-token:", args);
        // });
      }
    });
    addMissedSocketActions();

    if (!token) {
      const guestToken = TOKEN.guest;
      console.log('if not token');
      console.log("That is GuestToken_"  + guestToken)
      SocketService.sendData(
        `set-guest-token`,
        guestToken,
        (params: { user: IUser; token: string }) => {
          const tokenToSet = params.token ? params.token : guestToken;
          TOKEN.guest = tokenToSet;
          API.initialize();
          store.dispatch(
            userActions.setCurrentUser({...params.user})
          );

          // SocketService.sendData("resume-my-game", null, (...args: any) => {
          //   console.log("resume-my-game Guest - set-guest-token:", args);
          // });
          setIsLoading(false);
        }
      );
    } else if (token) {
      SocketService.sendData(
        `set-user-token`,
        token,
        (isTokenValid: boolean) => {
          console.log("Validated", token, isTokenValid);

          if (!isTokenValid) {
            TOKEN.remove();
            window.location.href = MAIN_WEBSITE;
            return;
          }

          TOKEN.user = token;
          // SocketService.sendData("resume-my-game", null, (...args: any) => {
          //   console.log("resume-my-game User - set-user-token", args);
          // });
          API.initialize();
          store.dispatch(userActions.fetchCurrentUser());
          setIsLoading(false);
        }
      );
    }

    // if (
    //   window.location.pathname.indexOf("/game") === 0 &&
    //   p.playMode &&
    //   !p.playMode.isAI &&
    //   !p.playMode.isHumanVsHuman
    // ) {
    //   navigate("/");
    // }
    initialized.current = true;
  }
  

  // }, []);
  return isLoading ? null : (
    <>
      {p.loseMatchForLeaving && (
        <ResumeOldGameModal
          onResume={() => {
            SocketService.sendData("resume-my-game", null, (runningMatch: IGameResume) => {
              p.setLoseMatchForLeaving(null);
              store.dispatch(gameplayActions.resumeGame(runningMatch));
              navigate("/game");
            });
          }}
          loseMatchForLeaving={p.loseMatchForLeaving}
          onLeave={() => {
            p.setLoseMatchForLeaving(null);
          }}
          leavingTime={30000} // todo: From backend value when user left game
        />
      )}
      {p.children}
    </>
  );
};

const mapStateToProps = (state: IAppState) => ({
  playMode: state.gameplay.playMode,
  serverStatus: state.user.serverStatus,
  loseMatchForLeaving: state.gameplay.loseMatchForLeaving,
});

const ConnectedX = connect<ISelectXProps>(mapStateToProps as any, {
  setLoseMatchForLeaving: gameplayActions.setLoseMatchForLeaving
})(X);

// eslint-disable-next-line react/display-name,react/prop-types
const Main = (p: any) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts

  return (
    <Provider store={store}>
      <ConnectedX>{p.element}</ConnectedX>
    </Provider>
  );
};

export default Main;
