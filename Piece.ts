import {
  Color,
  Piece,
  PieceType,
  Board,
  Move
} from './types'; 

const pawnValid = (board: Board, [ start, end ]: Move): boolean => {
  console.warn('Not implemented.');
  return false;
};

export const getPiece = (type: PieceType, color: Color): Piece => {
  switch (type) {
    case PieceType.Pawn:
      return {
        color,
        type: PieceType.Pawn,
        isValidMove: pawnValid,
      }
  }
};