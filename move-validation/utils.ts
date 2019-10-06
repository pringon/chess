import { Move } from '../types';

export const outOfBounds = ([start, end]: Move): boolean => (
  start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7
  || end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7
);