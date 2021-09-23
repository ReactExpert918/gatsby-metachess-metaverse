import React, { Component } from "react";

interface IProps {
  timeLeft: number;
}

interface IState {
  timePassed: number;
  setTimePassed: (time: number) => void;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  timerCorrection: boolean;
}

class Timer extends Component<IProps> {
  getMinutesAndSeconds(millis: number) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === "60"
      ? minutes + 1 + ":00"
      : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
  }
  render() {
    const { timeLeft } = this.props;
    return (
      <div className={"timer"}>
        {" "}
        {this.getMinutesAndSeconds(timeLeft <= 0 ? 0 : timeLeft)}{" "}
      </div>
    );
  }
}

export default Timer;
