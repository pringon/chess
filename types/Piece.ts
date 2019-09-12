import { Board, Move } from '../types/Board';

export enum PieceType {
  Pawn,
}

export interface PieceModel {
  type: PieceType;
  isValidMove: (board: Board, move: Move) => boolean;
};

export enum Color {
  White,
  Black,
}

export interface Piece extends PieceModel {
  color: Color;
};