// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
<<<<<<< HEAD
      // fetch row
      var row = this.get(rowIndex), count = 0;
      // iterate row, for each item
      for (var i = 0; i < row.length; i++) {
        // count number of '1' we see
        count += row[i];
      }

      // return true is > 1
      return count > 1;
=======
      var counter = 0;
      for (var i = 0; i < this.get('n'); i++) {
        if (this.get(rowIndex)[i]) {
          counter++;
        } // this.get(rowIndex) => row that we want to check
      }
      return counter > 1;
>>>>>>> 2586bef9a3e411143f54679360ae1aa79f0890b5
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
<<<<<<< HEAD
      // iterate over board for each row
      for (var i = 0; i < this.get('n'); i++) {
        // invole hasRowConflictAt for this row
        if (this.hasRowConflictAt(i)) {
          // if result is true, return true
          return true;
        }
      }

      return false
=======
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
>>>>>>> 2586bef9a3e411143f54679360ae1aa79f0890b5
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
<<<<<<< HEAD
      var count = 0;
      for (var i = 0; i < this.get('n'); i++) {
        count += this.get(i)[colIndex];
      }
      return count > 1;
=======
      var counter = 0;
      for(var i = 0; i < this.get('n'); i++){
        counter+= this.get(i)[colIndex];
      }
      return counter > 1;
>>>>>>> 2586bef9a3e411143f54679360ae1aa79f0890b5
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
<<<<<<< HEAD
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) {
=======
      for( var i = 0; i < this.get('n'); i++){
        if( this.hasColConflictAt(i)){
>>>>>>> 2586bef9a3e411143f54679360ae1aa79f0890b5
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
<<<<<<< HEAD
      // From the position specified
      var col = majorDiagonalColumnIndexAtFirstRow, count = 0, countBackwards = 0, row = 0;
      while (row < this.get('n') && col < this.get('n')) {
        count += this.get(row)[col];
        row++;
        col++;
      }

      return count > 1;
=======
      // var counter = 0;
      // for (var i = 0; i < this.get('n') - majorDiagonalColumnIndexAtFirstRow; i++) {
      //   counter += this.get(i)[majorDiagonalColumnIndexAtFirstRow];
      //   majorDiagonalColumnIndexAtFirstRow++;
      // }
      // return counter > 1;
      var counter = 0;
      var col = majorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      while(col < this.get('n') && row < this.get('n')){
        counter += this.get(row)[col];
        row++;
        col++;
      }
      return counter > 1;
>>>>>>> 2586bef9a3e411143f54679360ae1aa79f0890b5
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
<<<<<<< HEAD
      var col = minorDiagonalColumnIndexAtFirstRow, count = 0, row = 0;
      while (row < this.get('n') && col >= 0) {
        count += this.get(row)[col];
        row++;
        col--;
      }
      return count > 1;
=======
      var counter = 0;
      var col = minorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      while(col >= 0 && row < this.get('n')){
        counter += this.get(row)[col];
        row++;
        col--;
      }
      return counter > 1;
>>>>>>> 2586bef9a3e411143f54679360ae1aa79f0890b5
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
