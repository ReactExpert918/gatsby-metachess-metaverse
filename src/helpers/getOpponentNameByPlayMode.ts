import { AI_PLAY_MODE } from "../constants/playModes";
import { IUser } from "../store/user/user.interfaces";

export const getOpponentName = (isAI: boolean, playMode: AI_PLAY_MODE, opponent: IUser) => {
  if (isAI) {
    switch (playMode) {
      case AI_PLAY_MODE.AMATEUR:
        return `AMATEUR AI`;
      case AI_PLAY_MODE.BEGGINER:
        return `BEGGINER AI`;
      case AI_PLAY_MODE.INTERMEDIATE:
        return `INTERMEDIATE AI`;
      case AI_PLAY_MODE.PROFESSIONAL:
        return `PROFESSIONAL AI`;
      case AI_PLAY_MODE.WORLD_CLASS:
        return `WORLD CLASS AI`;
      default:
        return '';
    }
  }

  if (opponent?.Username) {
    return opponent.Username;
  }

  if (opponent?.GuestId) {
    return `Brainiac #${opponent.GuestId}`;
  }
  return 'Unknown';
}
