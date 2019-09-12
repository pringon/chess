import { Board, BoardState, BoardChange, ChangeResult, Square, Move } from './types/Board';
import { Color, Piece } from './types/Piece';

const toggleColor = (color: Color) =>
  color === 'White' ? 'Black' : 'White';

/**
 * Function that checks if a board configuration is valid.
 * @param board the board configuration to be checked, must be an 8x8 grid.
 * @returns true if the board is valid, false otherwise.
 */
const isValid = (board: Board): boolean => {
  const bLen = board.length;
  if (bLen !== 8) {
    return false;
  }
  for (let row of board) {
    if (row.length !== bLen) {
      return false;
    }
  }
  return true;
};

/**
 * Function that takes a board configuration, position and a piece and computes
 * if an event has happened(piece has been taken, game has been won).
 * @param board current board configuration.
 * @param pos affected position.
 * @param piece piece making the move.
 * @returns the event that has happened or nul if the move didn't affect any other pieces.
 */
const getChange = (board: Board, pos: Square, piece: Piece): BoardChange => {
  const newSquare = board[pos[0]][pos[1]]
  if (newSquare !== null) {
    if (newSquare.type === 'King') {
      return {
        color: toggleColor(newSquare.color),
      };
    } else {
      return {
        color: toggleColor(newSquare.color),
        type: board[pos[0]][pos[1]].type,
        takenBy: piece.type,
      };
    }
  }
  return null;
};

/**
 * Progress the game to a new state by moving one of the pieces.
 * If the move is invalid, an error will be thrown.
 * @param boardState current state of the game.
 * @param move move that will be taken.
 * @returns the new board state after the move was taken.
 */
export const movePiece = (boardState: BoardState, move: Move): ChangeResult => {
  const [start, end] = move;
  const { board } = boardState;
  const piece = board[start[0]][start[1]];
  if (!piece.isValidMove(board, move)) {
    throw Error(`Illegal move: ${move.toString()} on board: ${board.toString()}.`);
  }

  const newBoardState = Object.assign({}, boardState);
  newBoardState.board[start[0]][start[1]] = null;
  newBoardState.board[end[0]][end[1]] = piece;
  newBoardState.color = toggleColor(boardState.color);
  const changeResult: ChangeResult = {
    move,
    boardState: newBoardState,
    change: getChange(board, end, piece),
  };

  return changeResult;
};