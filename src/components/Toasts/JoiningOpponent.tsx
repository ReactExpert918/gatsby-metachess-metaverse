import React from "react";
import Button from "../Button";

interface Props {
  onCancel: () => void;
}
const JoiningOpponent = ({ onCancel }: Props) => {
  return (
    <div className="toastContainer topLeft">
      <p className="title">
        {"Please wait while we are searching for opponent..."}
      </p>
      <br />
      <Button dark small onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default JoiningOpponent;
