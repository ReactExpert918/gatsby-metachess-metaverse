import React, { useState } from "react";
import Rook from "../../assets/images/Rook.png";
import EditIcon from "../../assets/images/EditIcon.png";
import SaveIcon from "../../assets/images/SaveIcon.jpeg";
import UserEdit from "../UserEditInfo";
import { IUser } from "../../store/user/user.interfaces";

interface Props {
  currentUser: IUser;
}
const UserEditInfo = ({ currentUser }: Props) => {
  const [editing, setEditing] = useState<boolean>(false);
  if (!currentUser) return <div>Loading...</div>;
  const userInfo: JSX.Element = (
    <>
      <div className="info">
        <img
          src={currentUser.Avatar || Rook}
          alt="avatar"
          style={{
            borderRadius: "50%",
            // width: "8vmin",
            // height: "8vmin",
          }}
        />
        <p className="subtitle">Avatar</p>
      </div>
      <div className="info">
        <p className="title">{currentUser.Username}</p>
        <p className="subtitle">Username</p>
      </div>
      <div className="info">
        <p className="title" style={{ fontSize: "14px" }}>
          {currentUser.Email}
        </p>
        <p className="subtitle">Email</p>
      </div>
    </>
  );
  return (
    <div className="tabContent">
      <div className="overallItem" style={{ position: "relative" }}>
        <p className="tabTitle">Profile</p>
        {!editing ? (
          <img
            src={EditIcon}
            alt="edit Icon"
            style={{
              // borderRadius: "50%",
              width: "4vmin",
              height: "4vmin",
              position: "absolute",
              right: 0,
              top: 0,
            }}
            onClick={() => setEditing(true)}
          />
        ) : null}
        <div className="ratings-area" style={{ flexDirection: "column" }}>
          {editing ? <UserEdit setEditing={setEditing} /> : userInfo}
        </div>
      </div>
    </div>
  );
};

export default UserEditInfo;
