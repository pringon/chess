import {
  Color,
  Piece,
  PieceType,
} from './types';
import {
  pawnValid,
  rookValid
} from './move-validation';

export const getPiece = (id: number, type: PieceType, color: Color): Piece => {
  switch (type) {
    case PieceType.Pawn:
      return {
        id,
        color,
        type: PieceType.Pawn,
        validMove: pawnValid(id, color),
      };
    case PieceType.Rook:
      return {
        id,
        color,
        type: PieceType.Rook,
        validMove: rookValid(id, color),
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