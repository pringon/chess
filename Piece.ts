import {
  Color,
  Piece,
  PieceType,
  Board,
  Move
} from './types'; 

const pawnValid = (id: number, color: Color) => (board: Board, [ start, end ]: Move): boolean => {
  if (
    start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7
    || end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7
  ) {
    return false;
  }
  const verticalDist = end[0] - start[0];
  const horizontalDist = end[1] - start[1];
  const pawnStartRow = color === Color.White ? 1 : 6;
  const colorForward = color === Color.White ? 1 : -1;
  const startSquare = board[start[0]][start[1]];
  if (!startSquare || id !== startSquare.id) {
    return false;
  }
  if (verticalDist * colorForward > 2) {
    return false;
  }
  if (start[0] === pawnStartRow && verticalDist === 2 * colorForward) {
    return !board[end[0]- colorForward][end[1]] && !board[end[0]][end[1]] && horizontalDist === 0;
  }
  if (horizontalDist !== 0) {
    if (Math.abs(horizontalDist) > 1) {
      return false;
    }
    return !!board[end[0]][end[1]];
  }
  if (verticalDist === colorForward && !board[end[0]][end[1]]) {
    return true;
  }
  return false;
};

export const getPiece = (id: number, type: PieceType, color: Color): Piece => {
  switch (type) {
    case PieceType.Pawn:
      return {
        id,
        color,
        type: PieceType.Pawn,
        validMove: pawnValid(id, color),
      };
    default:
      return {
        id,
        color,
        type: PieceType.Pawn,
        validMove: pawnValid(id, color),
      };
  }
};