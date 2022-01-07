export interface move {
  [square: string]: number;
}
interface moveList extends Array<move> {}
export interface ITreasureHuntReducer {
  moveList: moveList;
  chancesRemaining: number;
  lootAcquired: number;
  gameOver: boolean;
}
