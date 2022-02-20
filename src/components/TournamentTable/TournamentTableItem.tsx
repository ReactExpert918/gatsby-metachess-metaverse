import React from "react";

interface Props {
  data: any;
}
const TournamentTableItem = ({ data }: Props) => {

  const itemClick = (dataId: string) => {
    console.log(dataId);
  };

  return (
    <tr
      onClick={() => itemClick(data.id)}
      className={`tournamentTableItemWrapper cells`}
    >
      <td>{data.name}</td>
      <td>{data.duration}</td>
      <td>{data.start_time}</td>
      <td>{data.time_control}</td>
      <td>{data.participants}</td>
      <td>{data.mode}</td>
    </tr>
  );
};

export default TournamentTableItem;
