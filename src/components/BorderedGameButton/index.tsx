import React from "react";

interface IProps {
  GameIcon: JSX.Element;
  title: string;
  subtitle?: string;
  available?: boolean;
  onPlayClick?: () => void;
}
const BorderedGameButton = ({
  GameIcon,
  title,
  subtitle,
  available,
  onPlayClick,
}: IProps) => {
  return (
    <div className="borderedGameButton">
      {GameIcon}
      <p className="title">{title}</p>
      {subtitle && <span className="subtitle">{subtitle}</span>}
      {available ? (
        <div className="play-button" onClick={onPlayClick}>
          <p>Play now</p>
        </div>
      ) : (
        <span className="coming-soon">Coming soon</span>
      )}
    </div>
  );
};
export default BorderedGameButton;
