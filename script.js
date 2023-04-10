const players = [
  { playerName: "player One", playerToken: "O" },
  { playerName: "player Two", playerToken: "X" },
];
// initialization of player
let activePlayer = players[0];
let noOfTurns = 0;

const GameBoard = (function () {
  let gameBoard = [];
  const rows = 3;
  const columns = 3;

  // for creating 2D array
  for (i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for (j = 0; j < columns; j++) {
      gameBoard[i].push(cell());
    }
  }

  function cell() {
    let cellToken = "";
    const addToken = (playerToken) => {
      cellToken = playerToken;
    };
    const getToken = () => cellToken;
    return { addToken, getToken };
  }
  const getBoard = () => gameBoard;

  const addTokenToGameBoard = (player, selectedCellIndices) => {
    //console.log(player, selectedCellIndices);
    if (
      gameBoard[selectedCellIndices.row][
        selectedCellIndices.column
      ].getToken() !== ""
    ) {
      return;
    }
    if (
      gameBoard[selectedCellIndices.row][
        selectedCellIndices.column
      ].getToken() === ""
    ) {
      gameBoard[selectedCellIndices.row][selectedCellIndices.column].addToken(
        player.playerToken
      );
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    /*console.log(selectedCellIndices);
    console.log(
      gameBoard[selectedCellIndices.row][selectedCellIndices.column].getToken()
    );*/
    putTokenFromGameBoardToScreen(selectedCellIndices);
    noOfTurns++;
  };

  function putTokenFromGameBoardToScreen(selectedCellIndices) {
    let boardOnScreen = document.getElementsByClassName("square");
    boardOnScreen = [...boardOnScreen];
    for (i = 0; i < boardOnScreen.length; i++) {
      if (
        boardOnScreen[i].getAttribute("data-row-number") ===
          selectedCellIndices.row &&
        boardOnScreen[i].getAttribute("data-column-number") ===
          selectedCellIndices.column
      ) {
        boardOnScreen[i].textContent =
          gameBoard[selectedCellIndices.row][
            selectedCellIndices.column
          ].getToken();
        return;
      }
    }
  }
  return { getBoard, addTokenToGameBoard };
})();
let result;
const DisplayController = () => {
  function returnPosition(target) {
    if (result) return;
    let row = target.getAttribute("data-row-number");
    let column = target.getAttribute("data-column-number");
    let selectedCellIndices = { row, column };
    result = GameLogic(selectedCellIndices);
  }
  function displayResult(result) {
    const resultContainer = document.querySelector(".resultContainer");
    if (result !== "Tie") {
      resultContainer.textContent = `${result.playerName} with token: (${result.playerToken}) won the match!`;
    } else {
      resultContainer.textContent = "Match ends at tie";
    }
  }
  return { returnPosition, displayResult };
};

const GameLogic = (selectedCellIndices) => {
  GameBoard.addTokenToGameBoard(activePlayer, selectedCellIndices);
  let board = GameBoard.getBoard();
  let result = returnWinnerObjectOrTie(board);
  function returnWinnerObjectOrTie(board) {
    const playerOneToken = players[0].playerToken;
    const playerTwoToken = players[1].playerToken;
    // check in rows
    for (row = 0; row < 3; row++) {
      if (
        board[row][0].getToken() === playerOneToken &&
        board[row][1].getToken() === playerOneToken &&
        board[row][2].getToken() === playerOneToken
      ) {
        return players[0];
      }
      if (
        board[row][0].getToken() === playerTwoToken &&
        board[row][1].getToken() === playerTwoToken &&
        board[row][2].getToken() === playerTwoToken
      ) {
        return players[1];
      }
    }
    // check in columns
    for (column = 0; column < 3; column++) {
      if (
        board[0][column].getToken() === playerOneToken &&
        board[1][column].getToken() === playerOneToken &&
        board[2][column].getToken() === playerOneToken
      ) {
        return players[0];
      }
      if (
        board[0][column].getToken() === playerTwoToken &&
        board[1][column].getToken() === playerTwoToken &&
        board[2][column].getToken() === playerTwoToken
      ) {
        return players[1];
      }
    }
    // check in diagonal cells
    if (
      board[0][0].getToken() === playerOneToken &&
      board[1][1].getToken() === playerOneToken &&
      board[2][2].getToken() === playerOneToken
    ) {
      return players[0];
    }
    if (
      board[0][0].getToken() === playerTwoToken &&
      board[1][1].getToken() === playerTwoToken &&
      board[2][2].getToken() === playerTwoToken
    ) {
      return players[1];
    }
    if (
      board[0][2].getToken() === playerOneToken &&
      board[1][1].getToken() === playerOneToken &&
      board[2][0].getToken() === playerOneToken
    ) {
      return players[0];
    }
    if (
      board[0][2].getToken() === playerTwoToken &&
      board[1][1].getToken() === playerTwoToken &&
      board[2][0].getToken() === playerTwoToken
    ) {
      return players[1];
    }
    if (noOfTurns === 9) return "Tie";
  }
  if (result) {
    DisplayController().displayResult(result);
  }
  return result;
};
