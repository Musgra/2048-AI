const LOOK_UP_DIRECTIONS = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
];

const validPosition = (row, col) => {
  //Xem ô có tồn tại trong bàn hay không?
  if (row >= 0 && row < 4 && col >= 0 && col < 4) {
    return true;
  }

  return false;
};

const isEmptyTile = (board, row, col) => {
  // nếu giá trị = 0 tức là ô trống
  if (validPosition(row, col)) {
    if (board[row][col] === 0) {
      return true;
    }
  }

  return false;
};

const NearestTile = (board, row, col, direction) => {
  // ô gần nhất hợp lệ
  do {
    row += direction.x;
    col += direction.y;
  } while (row < 4 && col < 4 && isEmptyTile(board, row, col));

  const nextRow = row;
  const nextCol = col;
  return { nextRow, nextCol };
};

export const smoothness = (board) => {
  let smoothnessVal = 0;
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
  }

  for (let row = 0; row < 4; row++) {
    //so sánh với các ô liền kề để tính độ chênh lệch(độ chênh lệch càng ít thì càng tốt)
    for (let col = 0; col < 4; col++) {
      if (board[row][col] !== 0 && (row !== maxRow || col !== maxCol)) {
        for (let direction of LOOK_UP_DIRECTIONS) {
          const { nextRow, nextCol } = NearestTile(board, row, col, direction);

          if (
            !isEmptyTile(nextRow, nextCol) && //nếu ô có giá trị và hợp lệ
            validPosition(nextRow, nextCol)
          ) {
            smoothnessVal -= Math.abs(
              Math.log2(board[nextRow][nextCol]) - Math.log2(board[row][col]) // tính độ chênh lêch của nearest tile và ô hiện tại
            );
          }
        }
      }
    }
  }

  return smoothnessVal;
};
