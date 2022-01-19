import Chessboard from "chessboardjsx";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { isSSR } from "../../lib/utils";
import { Actions } from "../../store/user/user.action";
import { squareStyles } from "../../pages/treasurequest";
import CustomPiece from "../CustomPiece";

export interface ISettings {
  BoardOddSquaresColor?: string;
  BoardEvenSquaresColor?: string;
  BoardLastPlaySquaresColor?: string;
  BoardPossibleMovesColor?: string;
  BoardPossibleCapturesColor?: string;
  BoardCheckSquaresColor?: string;
}

interface IProps {
  setEditing: Function;
  settings: ISettings;
}

const EditSettings = (props: IProps) => {
  const [settings, setSettings] = useState<ISettings>(props.settings);
  const [squareStyles, setSquareStyles] = useState<squareStyles>({
    ["d4"]: { background: settings.BoardCheckSquaresColor },
  });
  let id: NodeJS.Timer = null;
  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    props.setEditing(false);
    dispatch(Actions.updateSettings(settings));
  };
  const handleChange = (e: any, name: string): void => {
    if (!e.target) return;
    if (id) clearTimeout(id);
    // console.log(e.target.value, name);
    const temp = e.target.value;
    id = setTimeout(
      () =>
        setSettings({
          ...settings,
          [name]: temp,
        }),
      500
    );
  };
  const highlightSquare = (sourceSquare: any, squaresToHighlight: any) => {
    const highlightStyles = [...squaresToHighlight].reduce((a, c) => {
      const canBeEaten = c === "d5";
      return {
        ...a,
        ...{
          [c]: {
            background: canBeEaten
              ? `radial-gradient(circle, ${settings.BoardPossibleCapturesColor} 36%, transparent 0)`
              : `radial-gradient(circle, ${settings.BoardPossibleMovesColor} 36%, transparent 0)`,
            borderRadius: "50%",
          },
        },
      };
    }, {});
    setSquareStyles({
      ...squareStyles,
      ...highlightStyles,
      ["d4"]: { background: settings.BoardCheckSquaresColor },
    });
  };
  useEffect(() => {
    setSquareStyles({
      ["d4"]: { background: settings.BoardCheckSquaresColor },
    });
  }, [settings]);
  // console.log(squareStyles, settings);
  const handlePieceClick = (piece: string): void => {
    setSquareStyles({
      ["d4"]: { background: settings.BoardCheckSquaresColor },
    });

    switch (piece) {
      case "d4":
        highlightSquare(piece, ["e5", "c5", "d5", "c4", "d3", "c3", "e3"]);
        break;
      case "e4":
        highlightSquare(piece, ["e5", "d5"]);
        break;
      case "e7":
        break;
    }
  };
  // setSquareStyles
  return (
    <div className="Form-container">
      <div className="Form-wrapper">
        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <Chessboard
              darkSquareStyle={{ background: settings.BoardEvenSquaresColor }}
              lightSquareStyle={{ background: settings.BoardOddSquaresColor }}
              width={200}
              position={{ d4: "wK", e4: "wP", e7: "bK", d5: "bR" }}
              squareStyles={squareStyles}
              draggable={false}
              onSquareClick={handlePieceClick}
              onPieceClick={() => setSquareStyles({})}
              pieces={{
                wP: (pieceProps) => <CustomPiece name={"wP"} {...pieceProps} />,
                wN: (pieceProps) => <CustomPiece name={"wN"} {...pieceProps} />,
                wB: (pieceProps) => <CustomPiece name={"wB"} {...pieceProps} />,
                wR: (pieceProps) => <CustomPiece name={"wR"} {...pieceProps} />,
                wQ: (pieceProps) => <CustomPiece name={"wQ"} {...pieceProps} />,
                wK: (pieceProps) => <CustomPiece name={"wK"} {...pieceProps} />,
                bP: (pieceProps) => <CustomPiece name={"bP"} {...pieceProps} />,
                bN: (pieceProps) => <CustomPiece name={"bN"} {...pieceProps} />,
                bB: (pieceProps) => <CustomPiece name={"bB"} {...pieceProps} />,
                bR: (pieceProps) => <CustomPiece name={"bR"} {...pieceProps} />,
                bQ: (pieceProps) => <CustomPiece name={"bQ"} {...pieceProps} />,
                bK: (pieceProps) => <CustomPiece name={"bK"} {...pieceProps} />,
              }}
            />
          </React.Suspense>
        )}
        <form
          className="signup-page__form"
          style={{ gap: "2vmin" }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="Lables"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Board even squares color
            </label>
            <input
              type="color"
              name=""
              value={settings.BoardEvenSquaresColor}
              id=""
              onChange={(e: any) => handleChange(e, "BoardEvenSquaresColor")}
            />
          </div>{" "}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="Lables"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Board odd squares color
            </label>
            <input
              type="color"
              name=""
              value={settings.BoardOddSquaresColor}
              id=""
              onChange={(e: any) => handleChange(e, "BoardOddSquaresColor")}
            />
          </div>{" "}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="Lables"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Board check square color
            </label>
            <input
              type="color"
              name=""
              value={settings.BoardCheckSquaresColor}
              id=""
              onChange={(e: any) => handleChange(e, "BoardCheckSquaresColor")}
            />
          </div>{" "}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="Lables"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Board last move square color
            </label>
            <input
              type="color"
              name=""
              value={settings.BoardLastPlaySquaresColor}
              id=""
              onChange={(e: any) =>
                handleChange(e, "BoardLastPlaySquaresColor")
              }
            />
          </div>{" "}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="Lables"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Board possible move squares color
            </label>
            <input
              type="color"
              name=""
              value={settings.BoardPossibleMovesColor}
              id=""
              onChange={(e: any) => handleChange(e, "BoardPossibleMovesColor")}
            />
          </div>{" "}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="Lables"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Board possible capture square color
            </label>
            <input
              type="color"
              name=""
              value={settings.BoardPossibleCapturesColor}
              id=""
              onChange={(e: any) =>
                handleChange(e, "BoardPossibleCapturesColor")
              }
            />
          </div>{" "}
          <button className="claimButton">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditSettings;
