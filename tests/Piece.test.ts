import {Board, RowLine, Piece, Square, Color, PieceType} from '../types';
import {getPiece} from '../Piece';

const emptyRow = (): RowLine => [...Array(8)].fill(null);

const emptyBoard = (): Board => [...Array(8)].fill(emptyRow());

const placePiece = (board: Board, piece: Piece, [r, c]: Square) =>
  board.map((list, row) =>
    list.map((value, column) => (row === r && column === c ? piece : value)),
  );

describe('Piece', () => {
  test('should instantiate a piece', () => {
    expect.assertions(2);

    const pawn: Piece = getPiece(0, PieceType.Pawn, Color.White);

    expect(pawn.type).toBe(PieceType.Pawn);
    expect(pawn.color).toBe(Color.White);
  });
});

describe('Pawn', () => {
  let board: Board;
  let pawn: Piece;

  beforeEach(() => {
    const baseBoard = emptyBoard();
    pawn = getPiece(0, PieceType.Pawn, Color.White);
    board = placePiece(baseBoard, pawn, [1, 1]);
  });

  test('should be able to go forwards once.', () => {
    const isValid = pawn.validMove(board, [[1, 1], [2, 1]]);
    expect(isValid).toBe(true);
  });

  test('should not be able to go backwards.', () => {
    const isInvalid = pawn.validMove(board, [[1, 1], [0, 1]]);
    expect(isInvalid).toBe(false);
  });

  test('should not be able to go sideways.', () => {
    const goLeft = pawn.validMove(board, [[1, 1], [1, 0]]);
    expect(goLeft).toBe(false);

    const goRight = pawn.validMove(board, [[1, 1], [1, 1]]);
    expect(goRight).toBe(false);
  });

  test("start move should not be able to be something different that the piece's position", () => {
    const wrongStart = pawn.validMove(board, [[0, 1], [1, 1]]);
    expect(wrongStart).toBe(false);
  });

  test('should not be able to use the same start and end positions.', () => {
    const samePosition = pawn.validMove(board, [[1, 1], [1, 1]]);
    expect(samePosition).toBe(false);
  });

  test('should be able to go forwards by two rows if it is on the starting row', () => {
    const twoRowsWhite = pawn.validMove(board, [[1, 1], [3, 1]]);
    expect(twoRowsWhite).toBe(true);

    const blackPawn = getPiece(1, PieceType.Pawn, Color.Black);
    const newBoard = placePiece(board, blackPawn, [7, 1]);

    const twoRowsBlack = blackPawn.validMove(newBoard, [[7, 1], [6, 1]]);
    expect(twoRowsBlack).toBe(true);
  });

  test('should not be able to go forwards by more than two rows', () => {
    const threeRowsWhite = pawn.validMove(board, [[1, 1], [4, 1]]);
    expect(threeRowsWhite).toBe(false);

    const blackPawn = getPiece(1, PieceType.Pawn, Color.Black);
    const newBoard = placePiece(board, blackPawn, [7, 1]);

    const threeRowsBlack = blackPawn.validMove(newBoard, [[7, 1], [5, 1]]);
    expect(threeRowsBlack).toBe(false);
  });

  test('should not be able to go forwards by two rows if it not in its starting position', () => {
    const whitePawn = getPiece(1, PieceType.Pawn, Color.Black);
    const whiteBoard = placePiece(board, whitePawn, [3, 4]);

    const twoRowsWhite = whitePawn.validMove(whiteBoard, [[3, 4], [5, 4]]);
    expect(twoRowsWhite).toBe(false);

    const blackPawn = getPiece(1, PieceType.Pawn, Color.Black);
    const blackBoard = placePiece(board, blackPawn, [5, 1]);

    const twoRowsBlack = blackPawn.validMove(blackBoard, [[6, 1], [3, 1]]);
    expect(twoRowsBlack).toBe(false);
  });

  test('should not be able to go diagonally if there is no opposing piece to be taken', () => {
    const takePiece = pawn.validMove(board, [[1, 1], [2, 2]]);
    expect(takePiece).toBe(false);
  });

  test('should be able to go diagonally if there is an opposing piece to be taken.', () => {
    const blackPiece = getPiece(1, PieceType.Pawn, Color.Black);
    const newBoard = placePiece(board, blackPiece, [2, 2]);

    const takePiece = pawn.validMove(newBoard, [[1, 1], [2, 2]]);
    expect(takePiece).toBe(true);
  });
});

describe('Rook', () => {
  let board: Board;
  let rook: Piece;

  beforeEach(() => {
    const baseBoard = emptyBoard();
    rook = getPiece(0, PieceType.Rook, Color.White);
    board = placePiece(baseBoard, rook, [1, 1]);
  });

  test('should be able to move forwards', () => {
    expect(rook.validMove(board, [[1, 1], [2, 1]])).toBe(true);
    expect(rook.validMove(board, [[1, 1], [4, 1]])).toBe(true);
    expect(rook.validMove(board, [[1, 1], [7, 1]])).toBe(true);
  });

  xtest('should be able to move backwards', () => {
    expect(rook.validMove(board, [[1, 1], [0, 1]])).toBe(true);
  });

  xtest('should be able to move sideways', () => {
    // LEFT
    expect(rook.validMove(board, [[1, 1], [1, 0]])).toBe(true);
    // RIGHT
    expect(rook.validMove(board, [[1, 1], [1, 2]])).toBe(true);
    expect(rook.validMove(board, [[1, 1], [1, 4]])).toBe(true);
    expect(rook.validMove(board, [[1, 1], [1, 7]])).toBe(true);
  });

  xtest('should not be able to move diagonally', () => {
    expect(rook.validMove(board, [[1, 1], [2, 2]])).toBe(true);
    expect(rook.validMove(board, [[1, 1], [4, 4]])).toBe(true);
    expect(rook.validMove(board, [[1, 1], [3, 4]])).toBe(true);
    expect(rook.validMove(board, [[1, 1], [6, 3]])).toBe(true);
  });

  xtest('should not be able to move through allied pieces', () => {
    const pawn = getPiece(2, PieceType.Pawn, Color.White);
    const newBoard = placePiece(board, pawn, [3, 1]);
    expect(rook.validMove(newBoard, [[1, 1], [5, 1]])).toBe(false);
  });

  xtest('should not be able to move through enemy pieces', () => {
    const pawn = getPiece(2, PieceType.Pawn, Color.Black);
    const newBoard = placePiece(board, pawn, [3, 1]);
    expect(rook.validMove(newBoard, [[1, 1], [5, 1]])).toBe(false);
  });

  xtest('should be able to take enemy pieces if they are in xits path', () => {
    const pawn = getPiece(2, PieceType.Pawn, Color.Black);
    const newBoard = placePiece(board, pawn, [3, 1]);
    expect(rook.validMove(newBoard, [[1, 2], [3, 1]])).toBe(true);
  });
});
