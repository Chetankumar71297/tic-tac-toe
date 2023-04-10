const players = [
  { playerName: "playerOne", playerToken: "O" },
  { playerName: "playerTwo", playerToken: "X" },
];
// initialization of player
let activePlayer = players[0];

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

const DisplayController = (() => {
  function returnPosition(target) {
    let row = target.getAttribute("data-row-number");
    let column = target.getAttribute("data-column-number");
    let selectedCellIndices = { row, column };
    Game(selectedCellIndices);
  }
  return { returnPosition };
})();

const Game = (selectedCellIndices) => {
  GameBoard.addTokenToGameBoard(activePlayer, selectedCellIndices);
};
