import React from "react";
import StarIcon from "../../assets/images/star-icon.png";
import { IUser } from "../../store/user/user.interfaces";

interface Props {
  currentUser: IUser;
}

const StarTabContent = ({currentUser}: Props) => {

  if (!currentUser) return <div>Loading...</div>

  return (
    <div className="tabContent">
      <div className="overallItem">
        <p className="tabTitle">RATINGS</p>
        <div className="ratings-area">
          <div className="info">
            <p className="title">{currentUser.BulletElo}</p>
            <p className="subtitle">Bullet</p>
          </div>
          <div className="info">
            <p className="title">{currentUser.RapidElo}</p>
            <p className="subtitle">Rapid</p>
          </div>
          <div className="info">
            <p className="title">{currentUser.BlitzElo}</p>
            <p className="subtitle">Blitz</p>
          </div>
          <div className="info">
            <p className="title">{currentUser.ClassicalElo}</p>
            <p className="subtitle">Classical</p>
          </div>
        </div>
        {!currentUser.GuestId &&
          <>
            <p className="tabTitle">{"OVERALL"}</p>
            <div className="info-image">
              <img src={StarIcon} />
              <div>
                <p className="title">{currentUser.WonGames}</p>
                <p className="subtitle">Games won</p>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
};
export default StarTabContent;
