import { monotonicity } from "./monotonicity";
import { smoothness } from "./smoothness";
import { possibleMerge } from "./possibleMerge";

const emptyTiles = (board) => {
  //ktra số ô còn trống(càng nhiều càng tốt)
  let emptyTilesNumber = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        emptyTilesNumber++;
      }
    }
  }

  return emptyTilesNumber;
};

const maxTileAtCorner = (board) => {
  //
  let max = 0;
  let maxRow = 0;
  let maxCol = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] > max) {
        max = board[row][col];
        maxRow = row;
        maxCol = col;
      }
    }

    if (
      (maxRow === 3 && maxCol === 3) ||
      (maxRow === 3 && maxCol === 0) ||
      (maxRow === 0 && maxCol === 3) ||
      (maxRow === 0 && maxCol === 0)
    ) {
      // Nếu max ở 4 góc
      return Math.log2(max);
    }

    // Nếu max k ở 4 góc => phạt
    return Math.log2(max) * -1;
  }
};

const combinedHeuristic = (board) => {
  const monoWeight = 1.0;
  const smoothWeight = 0.1;
  const emptyWeight = 2.75;
  const maxTileCornerWeight = 1.5;
  const possibleWeight = 1.0;

  return (
    monotonicity(board) * monoWeight +
    smoothWeight * smoothness(board) +
    maxTileCornerWeight * maxTileAtCorner(board) +
    emptyWeight * emptyTiles(board) +
    possibleWeight * possibleMerge(board)
  );
};

const heuristicFunctions = {
  monotonicity: monotonicity,
  smoothness: smoothness,
  combinedHeuristic: combinedHeuristic,
};

export const heuristicFunction = heuristicFunctions.combinedHeuristic;
