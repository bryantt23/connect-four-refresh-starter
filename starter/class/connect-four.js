const Screen = require('./screen');
const Cursor = require('./cursor');

class ConnectFour {
  constructor() {
    this.playerTurn = 'O';

    this.grid = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ];

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log('TEST COMMAND');
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    let allEmpty = true;
    for (const row of grid) {
      for (const r of row) {
        if (r !== ' ') {
          allEmpty = false;
        }
      }
    }

    for (const row of grid) {
      let xCount = 0,
        oCount = 0;
      for (const r of row) {
        if (r === 'X') {
          oCount = 0;
          xCount++;
          if (xCount === 4) {
            return 'X';
          }
        } else if (r === 'O') {
          xCount = 0;
          oCount++;
          if (oCount === 4) {
            return 'O';
          }
        }
      }
    }

    for (let j = 0; j < grid[0].length; j++) {
      let xCount = 0,
        oCount = 0;
      for (let i = 0; i < grid.length; i++) {
        const r = grid[i][j];
        if (r === 'X') {
          oCount = 0;
          xCount++;
          if (xCount === 4) {
            return 'X';
          }
        } else if (r === 'O') {
          xCount = 0;
          oCount++;
          if (oCount === 4) {
            return 'O';
          }
        }
      }
    }

    // down and right
    for (let j = 0; j < grid[0].length; j++) {
      let xCount = 0,
        oCount = 0;
      let row = 0,
        col = j;
      while (row < grid.length && col < grid[0].length) {
        const r = grid[row++][col++];
        if (r === 'X') {
          oCount = 0;
          xCount++;
          if (xCount === 4) {
            return 'X';
          }
        } else if (r === 'O') {
          xCount = 0;
          oCount++;
          if (oCount === 4) {
            return 'O';
          }
        }
      }
    }

    for (let i = 1; i < grid.length; i++) {
      let xCount = 0,
        oCount = 0;
      let row = i,
        col = 0;
      while (row < grid.length && col < grid[0].length) {
        const r = grid[row++][col++];
        if (r === 'X') {
          oCount = 0;
          xCount++;
          if (xCount === 4) {
            return 'X';
          }
        } else if (r === 'O') {
          xCount = 0;
          oCount++;
          if (oCount === 4) {
            return 'O';
          }
        }
      }
    }
    //down and right

    //down and left
    for (let j = 0; j < grid[0].length; j++) {
      let xCount = 0,
        oCount = 0;
      let row = 0,
        col = j;
      while (row < grid.length && col >= 0) {
        const r = grid[row++][col--];
        if (r === 'X') {
          oCount = 0;
          xCount++;
          if (xCount === 4) {
            return 'X';
          }
        } else if (r === 'O') {
          xCount = 0;
          oCount++;
          if (oCount === 4) {
            return 'O';
          }
        }
      }
    }

    for (let i = 1; i < grid.length; i++) {
      let xCount = 0,
        oCount = 0;
      let row = i,
        col = grid[0].length - 1;
      while (row < grid.length && col >= 0) {
        const r = grid[row++][col--];
        if (r === 'X') {
          oCount = 0;
          xCount++;
          if (xCount === 4) {
            return 'X';
          }
        } else if (r === 'O') {
          xCount = 0;
          oCount++;
          if (oCount === 4) {
            return 'O';
          }
        }
      }
    }
    //down and left

    if (allEmpty) {
      return false;
    }
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = ConnectFour;
