import { Piece, Color, PieceType } from '../types/Piece';
import { getPiece } from '../Piece';

describe('Pawn', () => {
  test('should instantiate', () => {
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

