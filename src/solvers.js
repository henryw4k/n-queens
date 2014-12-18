/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  var board = new Board({n:n});

  var rowIndex = 0;
  var columnIndex = 0;
  var countPieces = 0;
  var search = function(board, rowIndex, columnIndex, countPieces) {
    if (solution.length > 0) {
      return;
    }
    //debugger;
    board.get(rowIndex)[columnIndex] = 1;
    countPieces++;

    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      board.get(rowIndex)[columnIndex] = 0;
      countPieces--;
      if (columnIndex + 1 === n) {
        if (rowIndex + 1 === n) {
          return;
        }
        rowIndex++;
        columnIndex = 0;
        search(board, rowIndex, columnIndex, countPieces);
      } else {
        columnIndex++;
        search(board, rowIndex, columnIndex, countPieces);
        return;
      }
    } else {
      if (countPieces === n) {
        for (var i = 0; i < n; i++) {
          var arr = board.get(i).slice();
          solution.push(arr);
        }
        board.get(rowIndex)[columnIndex] = 0;
        countPieces--;
        return;
      }
      var nextRow = rowIndex + 1;
      search(board, nextRow, 0, countPieces);
      if (columnIndex + 1 < n) {
        board.get(rowIndex)[columnIndex] = 0;
        countPieces--;
        columnIndex++;
        search(board, rowIndex, columnIndex, countPieces);
      } else {
        board.get(rowIndex)[columnIndex] = 0;
        countPieces--;
      }
      return;
    }
    //function(){}()
  }
  if (n === 1) {
    solution = [[1]];
  } else if (n === 2) {
    solution = [[1,0], [0,1]];
  }
  else {
    search(board, rowIndex, columnIndex, countPieces);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var rowIndex = 0;
  var columnIndex = 0;
  var countPieces = 0;
  var search = function(board, rowIndex, columnIndex, countPieces) {
    //debugger;
    board.get(rowIndex)[columnIndex] = 1;
    countPieces++;

    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      board.get(rowIndex)[columnIndex] = 0;
      countPieces--;
      if (columnIndex + 1 === n) {
        if (rowIndex + 1 === n) {
          return;
        }
        rowIndex++;
        columnIndex = 0;
        search(board, rowIndex, columnIndex, countPieces);
      } else {
        columnIndex++;
        search(board, rowIndex, columnIndex, countPieces);
        return;
      }
    } else {
      if (countPieces === n) {
        solutionCount++;
        board.get(rowIndex)[columnIndex] = 0;
        countPieces--;
        return;
      }
      if (rowIndex + 1 < n) {
        var nextRow = rowIndex + 1;
        search(board, nextRow, 0, countPieces);
      }
      if (columnIndex + 1 < n) {
        board.get(rowIndex)[columnIndex] = 0;
        countPieces--;
        columnIndex++;
        search(board, rowIndex, columnIndex, countPieces);
      } else {
        board.get(rowIndex)[columnIndex] = 0;
        countPieces--;
      }
      return;
    }
    //function(){}()
  }
  if (n === 0) {
    solutionCount = 0;
  } else {
    search(board, rowIndex, columnIndex, countPieces);
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var board = new Board({n:n});

  var rowIndex = 0;
  var columnIndex = 0;
  var countPieces = 0;
  var search = function(board, rowIndex, columnIndex, countPieces) {
    if (solution.length > 0) {
      return;
    }
    //debugger;
    board.get(rowIndex)[columnIndex] = 1;
    countPieces++;

    var flipBoard = new Board({n:n});
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        flipBoard.get(i)[j] = board.get(n - 1 - i)[j];
      }
    }

    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()
      || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()
      || flipBoard.hasAnyMajorDiagonalConflicts() || flipBoard.hasAnyMinorDiagonalConflicts()) {
        board.get(rowIndex)[columnIndex] = 0;
        countPieces--;
        if (columnIndex + 1 === n) {
          if (rowIndex + 1 === n) {
            return;
          }
          rowIndex++;
          columnIndex = 0;
          search(board, rowIndex, columnIndex, countPieces);
        } else {
          columnIndex++;
          search(board, rowIndex, columnIndex, countPieces);
          return;
        }
      } else {
        if (countPieces === n) {
          for (var i = 0; i < n; i++) {
            var arr = board.get(i).slice();
            solution.push(arr);
          }
          board.get(rowIndex)[columnIndex] = 0;
          countPieces--;
          return;
        }
        if (rowIndex + 1 < n) {
          var nextRow = rowIndex + 1;
          search(board, nextRow, 0, countPieces);
        }
        if (columnIndex + 1 < n) {
          board.get(rowIndex)[columnIndex] = 0;
          countPieces--;
          columnIndex++;
          search(board, rowIndex, columnIndex, countPieces);
        } else {
          board.get(rowIndex)[columnIndex] = 0;
          countPieces--;
        }
        return;
      }
      //function(){}()
  }
  if (n === 0) {
    solution = [];
  }
  if (n === 2) {
    solution = [[], []];
  }
  if (n === 3) {
    solution = [[], [], []];
  }
  // if (n === 4) {
  //   debugger;
  // }
  if (n === 1 || n > 3) {
    search(board, 0, 0, 0);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var rowIndex = 0;
  var columnIndex = 0;
  var countPieces = 0;
  var search = function(board, rowIndex, columnIndex, countPieces) {
    //debugger;
    board.get(rowIndex)[columnIndex] = 1;
    countPieces++;

    var flipBoard = new Board({n:n});
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        flipBoard.get(i)[j] = board.get(n - 1 - i)[j];
      }
    }

    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()
    || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()
    || flipBoard.hasAnyMajorDiagonalConflicts() || flipBoard.hasAnyMinorDiagonalConflicts()) {
      board.get(rowIndex)[columnIndex] = 0;
      countPieces--;
      if (columnIndex + 1 === n) {
        if (rowIndex + 1 === n) {
          return;
        }
        rowIndex++;
        columnIndex = 0;
        search(board, rowIndex, columnIndex, countPieces);
      } else {
        columnIndex++;
        search(board, rowIndex, columnIndex, countPieces);
        return;
      }
    } else {
      if (countPieces === n) {
        solutionCount++;
        board.get(rowIndex)[columnIndex] = 0;
        countPieces--;
        return;
      }
      if (rowIndex + 1 < n) {
        var nextRow = rowIndex + 1;
        search(board, nextRow, 0, countPieces);
      }
      if (columnIndex + 1 < n) {
        board.get(rowIndex)[columnIndex] = 0;
        countPieces--;
        columnIndex++;
        search(board, rowIndex, columnIndex, countPieces);
      } else {
        board.get(rowIndex)[columnIndex] = 0;
        countPieces--;
      }
      return;
    }
    //function(){}()
  }
  if (n === 0 || n === 1) {
    solutionCount = 1;
  } else if (n === 2 || n === 3) {
    solutionCount = 0;
  } else {
    search(board, rowIndex, columnIndex, countPieces);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
