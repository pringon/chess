import {
  Color,
  Square,
  Piece,
  Board,
  Move
} from '../types'; 
import { outOfBounds } from './utils';

export const rookValid = (id: number, color: Color) => (board: Board, [start, end]: Move): boolean => {
  if (outOfBounds([start, end])) {
    return false;
  }
  return true;
};
