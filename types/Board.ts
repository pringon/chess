import { Piece, Color } from './';

type Row = number;
type Column = number;
export type Square = [Row, Column];
export type Move = [Square, Square];
/** 
 * Contains information on current board configuration as a 2-D matrix of [Pieces].  
 * Size must be: 8x8.
*/
export type Board = Array<Array<Piece | null>>;
/**
 * Stores the state of the game including the board configuration, how many turns have passed and
 * the who's turn currently is.
 */
export type BoardState = {
  board: Board,
  turns: number,
  color: Color,
};

type GameWon = {
  color: Color,
};
type PieceTaken = {
  color: Color,
  type: Piece,
  takenBy: Piece,
};
/**
 * [BoardChange] event that is emitted when a piece is removed from the board.
 */
export type BoardChange = GameWon | PieceTaken | null;
/**
 * Outcome of altering the state of the game. Includes the new state,
 * the move taken as well as the the change that happened.
 */
export type ChangeResult = {
  boardState: BoardState,
  move: Move,
  change: BoardChange,
};