/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require("prompt-sync")({ sigint: true });

let board = {
  1: " ",
  2: " ",
  3: " ",
  4: " ",
  5: " ",
  6: " ",
  7: " ",
  8: " ",
  9: " ",
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
  board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
  const display = [
    [board[1], board[2], board[3]],
    [board[4], board[5], board[6]],
    [board[7], board[8], board[9]],
  ];
  console.log(display[0]);
  console.log(display[1]);
  console.log(display[2]);
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
  if (position >= 1 && position <= 9 && board[position] === " ") {
    return true;
  } else {
    return false;
  }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
  let i = 0;
  let j = 0;
  while (i < 8) {
    while (board[winCombinations[i][j]] === player) {
      if (j === 2) {
        return true;
      } else {
        j++;
      }
    }
    j = 0;
    i++;
  }
  return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
  let i = 1;

  while (i < 10) {
    if (board[i] === " ") {
      return false;
    } else {
      i++;
    }
  }
  return true;
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************

// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
let winnerIdentified = false;
let currentTurnPlayer = "X";

// Automatically swap player after each successful turn
function swapPlayer() {
  if (currentTurnPlayer === "X") {
    currentTurnPlayer = "Y";
  } else {
    currentTurnPlayer = "X";
  }
}

// Receive, validate and print player's move
function playTurn(player) {
  console.log(`Player ${currentTurnPlayer} Turn`);
  const position = prompt("Please choose your position");

  if (validateMove(position) === true) {
    markBoard(position, player);
    printBoard();
  } else {
    console.log("Invalid input");
    swapPlayer();
  }
}

// Clear for new game
function clearBoard() {
  board[1] = " ";
  board[2] = " ";
  board[3] = " ";
  board[4] = " ";
  board[5] = " ";
  board[6] = " ";
  board[7] = " ";
  board[8] = " ";
  board[9] = " ";
}

function startGame() {
  // entry point of the whole program
  console.log(
    "Game started: \n\n" +
      " 1 | 2 | 3 \n" +
      " --------- \n" +
      " 4 | 5 | 6 \n" +
      " --------- \n" +
      " 7 | 8 | 9 \n"
  );

  while (!winnerIdentified) {
    playTurn(currentTurnPlayer);

    // Game results
    if (checkWin(currentTurnPlayer) === true) {
      console.log(`Player ${currentTurnPlayer} has won!`);
      winnerIdentified = true;
      break;
    }
    if (checkFull() === true) {
      console.log(`It's a draw!`);
      winnerIdentified = true;
    }
    swapPlayer();
    // feel free to add logic here if needed, e.g. announcing winner or tie
  }

  // Bonus Point: Implement the feature for the user to restart the game after a tie or game over
  const restart = prompt("Restart game? ('Y' or 'N')");
  if (restart === "Y" || restart === "y") {
    console.log("New game has started");
    winnerIdentified = false;
    clearBoard();
    startGame();
  } else if (restart === "N" || restart === "n") {
    console.log("Game has ended");
  } else console.log("Invalid input. Game has ended");
}
startGame();
