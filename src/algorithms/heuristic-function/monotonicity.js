export const monotonicity = (board) => {
  const directionsEval = {
    up: 0,
    down: 0,
    right: 0,
    left: 0,
  };

  // up/down evaluation
  for (let col = 0; col < 4; col++) {
    let curr = 0;
    while (curr < 3) {
      let row = curr + 1;
      for (row = curr + 1; row < 4; row++) {
        if (board[row][col] === 0) {
          continue;
        } else {
          break;
        }
      }

      if (row === 4) {
        // nếu ra ngoài bảng phải trừ đi
        row--;
      }
      const currTile = board[curr][col] !== 0 ? Math.log2(board[curr][col]) : 0;
      const nextTile = board[row][col] !== 0 ? Math.log2(board[row][col]) : 0;

      if (currTile !== 0 && nextTile !== 0) {
        if (currTile > nextTile) {
          directionsEval.down += nextTile - currTile; //phạt theo hướng down nếu số bên trên > số bên dưới
        } else if (currTile < nextTile) {
          directionsEval.up += currTile - nextTile;
        }
      }
      curr = row;
    }
  }

  // left/right evaluation
  for (let row = 0; row < 4; row++) {
    let curr = 0;
    while (curr < 3) {
      let col = curr + 1;
      for (col = curr + 1; col < 4; col++) {
        if (board[row][col] === 0) {
          continue;
        } else {
          break;
        }
      }

      if (col === 4) {
        col--;
      }
      const currTile = board[row][curr] !== 0 ? Math.log2(board[row][curr]) : 0;
      const nextTile = board[row][col] !== 0 ? Math.log2(board[row][col]) : 0;

      if (currTile !== 0 && nextTile !== 0) {
        if (currTile > nextTile) {
          directionsEval.right += nextTile - currTile; //phạt theo hướng phải nếu số bên trái > số bên phải
        } else if (currTile < nextTile) {
          directionsEval.left += currTile - nextTile;
        }
      }
      curr = col;
    }
  }

  return (
    Math.max(directionsEval.up, directionsEval.down) +
    Math.max(directionsEval.left, directionsEval.right)
  );
};
