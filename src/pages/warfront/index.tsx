import React, { Component } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import SocketService from "../../services/socket.service";
import { ISetPlayModePayload } from "../../store/gameplay/gameplay.interfaces";
import { IUser } from "../../store/user/user.interfaces";

interface IProps {
  playMode: ISetPlayModePayload;
}

const GameObj = "WarFront";
const unityContext = new UnityContext({
  productName: "React Unity WebGL Tests",
  companyName: "Jeffrey Lanters",
  // The url's of the Unity WebGL runtime, these paths are public and should be
  // accessible from the internet and relative to the index.html.
  loaderUrl: "unitybuild/2020.1/myunityapp.loader.js",
  dataUrl: "unitybuild/2020.1/myunityapp.data",
  frameworkUrl: "unitybuild/2020.1/myunityapp.framework.js",
  codeUrl: "unitybuild/2020.1/myunityapp.wasm",
  streamingAssetsUrl: "unitybuild/2020.1/streamingassets",
  // Additional configuration options.
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
});

class WarFront extends Component<IProps> {
  componentDidMount(): void {
    // When the component is mounted, we'll register some event listener.
    unityContext.on("MovePiece", this.handleUnityMovePiece);
    // When the component is unmounted, we'll unregister the event listener.
  }
  initialize = () => {
    const { playMode } = this.props;
    if (playMode.isHumanVsHuman) {
      SocketService.subscribeTo({
        eventName: "game-timeout",
        callback: (params: { winner: IUser }) => {
          unityContext.send(GameObj, "Timeout", JSON.stringify(params));
        },
      });
    }
  };
  handleUnityMovePiece = (source: string, target: string) => {
    // Logic to validate the move
    // ----------------

    //Update the status on Unity
    unityContext.send(
      GameObj,
      "UpdateMoveStatus",
      JSON.stringify({
        source,
        target,
        valid: true,
        status: "check",
      })
    );
  };

  componentWillUnmount(): void {
    unityContext.removeAllEventListeners();
  }

  render() {
    return <Unity className="unity-canvas" unityContext={unityContext} />;
  }
}

export default WarFront;
