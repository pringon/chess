import {Color, Square, Piece, Board, Move} from '../types';
import {outOfBounds} from './utils';

export const rookValid = (id: number, color: Color) => (
  board: Board,
  [start, end]: Move,
): boolean => {
  if (
    outOfBounds([start, end]) ||
    (start[0] - end[0] !== 0 && start[1] - end[1] !== 0)
  ) {
    return false;
  }
  // Check if there are any pieces in your path.
  // Check which axis is non-zero.
  // Loop through each square in that series.
  // Check if a piece is in your way.
  if (start[0] - end[0] !== 0) {
    for (let i = start[0] + 1; i <= end[0]; i++) {
      const currentPiece = board[i][start[1]];
      if (currentPiece) {
        if ((currentPiece as Piece).color !== color && i === end[0]) {
          return true;
        }
        return false;
      }
    }
  } else {
    for (let i = start[1] + 1; i <= end[1]; i++) {
      console.log(board[start[0]][i]);
      if (board[start[0]][i]) {
        if ((board[start[0]][i] as Piece).color !== color && i === end[1]) {
          return true;
        }
        return false;
      }
    }
  }
  return true;
};
