
MaxMove (board, maxDepth, currentDepth, alpha, beta) {
    if (currentDepth = maxDepth) {
        return eval(board)
    }

    maxUtility <- MINUS_INFINITY
    endgame <- true
    nextMove <- null
    ForEach moves {
        if (canMove(move)) {
            endgame <- false
            childUtility = MinMove(board, maxDepth, currentDepth + 1)
            if (childUtility > maxUtility) {
                maxUtitlity <- childUtility
                alpha = max(alpha, maxUtility)
                if (beta <= alpha) {
                    return maxUtility;
                }
                nextMove <- move
            }
        }
    }

    if (endGame) {
        return eval(board)
    }

    if (currentDepth = 0) {
        return nextMove
    } else {
        return maxUtility
    }
}

MinMove(board, maxDepth, currentDepth, alpha, beta) {
    if (currentDepth == maxDepth) {
        return eval(board);
    }

    minUtility <- INFINITY
    ForEach emptyTile {
        ForEach value of [2, 4] {
            emptyTile = value
            childUtility = MaxMove(board, maxDepth, currentDepth + 1)
            if (childUtility < minUtility) {
                minUtility = childUtility
                beta = min(beta, minUtility)

                if (beta <= alpha) {
                    emptyTile = 0
                    return minUtility
                }
            }
        }
        emptyTile = 0
    }
        
    return minUtility       
}

MiniMax(board, maxDepth) {
    return MaxMove(board, maxDepth, 0, MINUS_INFINITY, INFINITY)
}
   