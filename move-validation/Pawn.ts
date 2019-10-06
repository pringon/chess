import {
  Color,
  Square,
  Piece,
  Board,
  Move
} from '../types';
import { outOfBounds } from './utils';

const onSquare = (id: number, square: Piece | null) => !!square && id === square.id;

const moveOneForward = (
  board: Board,
  colorForward: number,
  verticalDist: number,
  horizontalDist: number,
  end: Square
) => (
  verticalDist === colorForward && horizontalDist === 0
  && !board[end[0]][end[1]]
);

const moveTwoForward = (
  board: Board,
  startRow: number,
  colorForward: number,
  verticalDist: number,
  horizontalDist: number,
  [start, end]: Move
) => (
  start[0] === startRow && verticalDist === 2 * colorForward
    ? !board[end[0] - colorForward][end[1]] && !board[end[0]][end[1]] && horizontalDist === 0
    : false 
);

const moveDiagonally = (board: Board, color: Color, verticalDist: number, horizontalDist: number, end: Square) => {
  const landingSquare = board[end[0]][end[1]]
  return Math.abs(horizontalDist) === 1 && Math.abs(verticalDist) === 1
    ? !!landingSquare && landingSquare.color !== color
    : false;
};

const all = (...args: boolean[]): boolean => args.reduce((acc, x) => !acc || !x ? false : acc, true);

const either = (...args: boolean[]): boolean => args.reduce((acc, x) => x ? x : acc, false);

export const pawnValid = (id: number, color: Color) => (board: Board, [ start, end ]: Move): boolean => {
  if (outOfBounds([start, end])) {
    return false;
  }
  const verticalDist = end[0] - start[0];
  const horizontalDist = end[1] - start[1];
  const pawnStartRow = color === Color.White ? 1 : 6;
  const colorForward = color === Color.White ? 1 : -1;
  const startSquare = board[start[0]][start[1]];
  return all(
    onSquare(id, startSquare),
    either(
      moveTwoForward(board, pawnStartRow, colorForward, verticalDist, horizontalDist, [start, end]),
      moveDiagonally(board, color, verticalDist, horizontalDist, end),
      moveOneForward(board, colorForward, verticalDist, horizontalDist, end)
    )
  ) 
};