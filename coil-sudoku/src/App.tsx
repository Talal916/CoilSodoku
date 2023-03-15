import React, { useState } from "react";
import "./App.css";
import SudokuGrid from "./components/SudokuGrid";
import CheckAnswersButton from "./components/CheckAnswersButton";

const startingBoard: number[][] = [
  [0, 0, 0, 2, 6, 0, 7, 0, 1],
  [6, 8, 0, 0, 7, 0, 0, 9, 0],
  [1, 9, 0, 0, 0, 4, 5, 0, 0],
  [8, 2, 0, 1, 0, 0, 0, 4, 0],
  [0, 0, 4, 6, 0, 2, 9, 0, 0],
  [0, 5, 0, 0, 0, 3, 0, 2, 8],
  [0, 0, 9, 3, 0, 0, 0, 7, 4],
  [0, 4, 0, 0, 5, 0, 0, 3, 6],
  [7, 0, 3, 0, 1, 8, 0, 0, 0],
];

// Comment above startingBoard and uncomment below to test with correct board.

// const startingBoard: number[][] = [
//   [4, 3, 5, 2, 6, 9, 7, 8, 1],
//   [6, 8, 2, 5, 7, 1, 4, 9, 3],
//   [1, 9, 7, 8, 3, 4, 5, 6, 2],
//   [8, 2, 6, 1, 9, 5, 3, 4, 7],
//   [3, 7, 4, 6, 8, 2, 9, 1, 5],
//   [9, 5, 1, 7, 4, 3, 6, 2, 8],
//   [5, 1, 9, 3, 2, 6, 8, 7, 4],
//   [2, 4, 8, 9, 5, 7, 1, 3, 6],
//   [7, 6, 3, 4, 1, 8, 2, 5, 9],
// ];

function App() {
  const [board, setBoard] = useState(startingBoard);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateBoard = (row: number, col: number, value: number) => {
    const newBoard = board.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? value : c))
    );
    setBoard(newBoard);
  };

  return (
    <div className="App">
      <header className="App-header">
        <SudokuGrid board={board} updateBoard={updateBoard} />
        <CheckAnswersButton board={board} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </header>
    </div>
  );
}

export default App;
