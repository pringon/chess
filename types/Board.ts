import { Piece, Color } from './';

type Row = number;
type Column = number;
export type Square = readonly [Row, Column];
export type Move = readonly [Square, Square];
export type RowLine = ReadonlyArray<Piece | null>;
/** 
 * Contains information on current board configuration as a 2-D matrix of [Pieces].  
 * Size must be: 8x8.
*/
export type Board = ReadonlyArray<RowLine>;
/**
 * Stores the state of the game including the board configuration, how many turns have passed and
 * the who's turn currently is.
 */
export type BoardState = Readonly<{
  board: Board,
  turns: number,
  color: Color,
}>;

type GameWon = Readonly<{
  type: 'GameWon',
}>;
type PieceTaken = Readonly<{
  type: 'PieceTaken',
  piece: Piece,
  takenBy: Piece,
}>;
/**
 * [BoardChange] event that is emitted when a piece is removed from the board.
 */
export type BoardChange = Readonly<GameWon | PieceTaken>;
/**
 * Outcome of altering the state of the game. Includes the new state,
 * the move taken as well as the the change that happened.
 */
export type ChangeResult = Readonly<{
  boardState: BoardState,
  move: Move,
  change: BoardChange | null,
}>;