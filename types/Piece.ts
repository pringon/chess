import { Board, Move } from '../types/Board';

export enum PieceType {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King
}

export type PieceModel = {
  id: number;
  type: PieceType;
  validMove: (board: Board, move: Move) => boolean;
};

export enum Color {
  White,
  Black,
}

export type Piece = PieceModel & {
  color: Color;
};