import {
  Board,
  Piece,
  Color,
  PieceType
} from '../types';
import { getPiece } from '../Piece';

const emptyBoard = (): Board => (
  [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
);

describe('Piece', () => {
  test('should instantiate a piece', () => {
    expect.assertions(2);

    let pawn: Piece;
    try {
      pawn = getPiece(PieceType.Pawn, Color.White);
    } catch (err) {
      throw Error('Piece could not be created');
    }

    expect(pawn.type).toBe(PieceType.Pawn);
    expect(pawn.color).toBe(Color.White);
  });
});

describe('Pawn', () => {
  let board;
  let pawn;

  beforeEach(() => {
    board = emptyBoard();
    pawn = getPiece(PieceType.Pawn, Color.White);
    board[1][1] = pawn;
  });

  test('should be able to go forwards once.', () => {
    const isValid = pawn.isValidMove(board, [[1, 1], [2, 1]]);
    expect(isValid).toBe(true);
  });

  xtest('should not be able to go backwards.', () => {
    const isInvalid = pawn.isValidMove(board, [[1, 1], [0, 1]]);
    expect(isInvalid).toBe(false);
  });

  xtest('should not be able to go sideways.', () => {
    const goLeft = pawn.isValidMove(board, [[1, 1], [1, 0]]);
    expect(goLeft).toBe(false);

    const goRight = pawn.isValidMove(board, [[1, 1], [1, 1]]);
    expect(goRight).toBe(false);
  });

  xtest('start move should not be able to be something different that the piece\'s position', () => {
    const wrongStart = pawn.isValidMove(board, [[0, 1], [1, 1]]);
    expect(wrongStart).toBe(false);
  });

  xtest('should not be able to use the same start and end positions.', () => {
    const samePosition = pawn.isValidMove(board, [[1, 1], [1, 1]]);
    expect(samePosition).toBe(false);
  });

  xtest('should be able to go forwards by two rows if it is on the starting row', () => {
    const twoRowsWhite = pawn.isValidMove(board, [[1, 1], [3, 1]]);
    expect(twoRowsWhite).toBe(true);

    const blackPawn = getPiece(PieceType.Pawn, Color.Black);
    board[7][1] = blackPawn;

    const twoRowsBlack = blackPawn.isValidMove(board, [[7, 1], [6, 1]]);
    expect(twoRowsBlack).toBe(true);
  });

  xtest('should not be able to go forwards by two rows if it not in its starting position', () => {
    const whitePawn = getPiece(PieceType.Pawn, Color.Black);
    board[3][4] = whitePawn;

    const twoRowsWhite = whitePawn.isValidMove(board, [[3, 4], [5, 4]]);
    expect(twoRowsWhite).toBe(false);

    const blackPawn = getPiece(PieceType.Pawn, Color.Black);
    board[6][1] = blackPawn;

    const twoRowsBlack = blackPawn.isValidMove(board, [[6, 1], [4, 1]]);
    expect(twoRowsBlack).toBe(false);
  });

  xtest('should be able to go diagonally if there is an opposing piece to be taken.', () => {
    const blackPiece = getPiece(PieceType.Pawn, Color.Black);
    board[2][1] = blackPiece;

    const takePiece = pawn.isValid(board, [[1, 1], [2, 2]]);
    expect(takePiece).toBe(true); 
  });
});