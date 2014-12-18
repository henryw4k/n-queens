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
        //columnIndex++;
        search(board, rowIndex, ++columnIndex, countPieces);
      }
    } else {
      if (countPieces === n) {
        for (var i = 0; i < n; i++) {
          solution.push(board.get(i));
        }
        return;
      }
      if (rowIndex + 1 === n) {
        return;
      }
      rowIndex++;
      columnIndex = 0;
      search(board, rowIndex, columnIndex, countPieces);
    }
    //function(){}()
  }
  search(board, rowIndex, columnIndex, countPieces);

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
        //columnIndex++;
        search(board, rowIndex, ++columnIndex, countPieces);
      }
    } else {
      if (countPieces === n) {
        solutionCount++;
        //search(board, rowIndex, columnIndex, countPieces);
        return;
      }
      if (rowIndex + 1 === n) {
        return;
      }
      rowIndex++;
      columnIndex = 0;
      for (var i = 0; i < n; i++) {
        search(board, rowIndex, columnIndex + i, countPieces);
      }
    }
    //function(){}()
  }
  search(board, rowIndex, columnIndex, countPieces);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme

  var board = new Board({n:n});

  var rowIndex = 0;
  var columnIndex = 0;
  var countPieces = 0;
  var search = function(board, rowIndex, columnIndex, countPieces) {
    //debugger;
    board.get(rowIndex)[columnIndex] = 1;
    countPieces++;

    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()
        || board.hasAnyMinorDiagonalConflicts() || board.hasAnyMajorDiagonalConflicts()) {
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
        //columnIndex++;
        search(board, rowIndex, ++columnIndex, countPieces);
      }
    } else {
      if (countPieces === n) {
        for (var i = 0; i < n; i++) {
          solution.push(board.get(i));
        }
        return;
      }
      if (rowIndex + 1 === n) {
        return;
      }
      rowIndex++;
      columnIndex = 0;
      search(board, rowIndex, columnIndex, countPieces);
    }
    //function(){}()
  }
  if(n === 0){
    solution = [];
  } else if (n === 1 || n >= 4) {
    search(board, rowIndex, columnIndex, countPieces);
  }
  else {
    solution = [];
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
