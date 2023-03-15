import React, { ChangeEvent } from "react";

type SudokuGridProps = {
  board: number[][];
  updateBoard: (row: number, col: number, value: number) => void;
};

const SudokuGrid: React.FC<SudokuGridProps> = ({ board, updateBoard }) => {
  const handleInputChange = (row: number, col: number, e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    const newValue = isNaN(inputValue) || inputValue < 1 || inputValue > 9 ? 0 : inputValue;
    updateBoard(row, col, newValue);

    // Move to the next cell
    if (newValue !== 0) {
      const nextCol = (col + 1) % 9;
      const nextRow = col === 8 ? (row + 1) % 9 : row;
      (document.querySelector(`[data-row="${nextRow}"][data-col="${nextCol}"]`) as HTMLInputElement)?.focus();
    }
  };

  const handleKeyDown = (row: number, col: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        if (row > 0) {
          e.preventDefault();
          (document.querySelector(`[data-row="${row - 1}"][data-col="${col}"]`) as HTMLInputElement)?.focus();
        }
        break;
      case "ArrowDown":
        if (row < 8) {
          e.preventDefault();
          (document.querySelector(`[data-row="${row + 1}"][data-col="${col}"]`) as HTMLInputElement)?.focus();
        }
        break;
      case "ArrowLeft":
        if (col > 0) {
          e.preventDefault();
          (document.querySelector(`[data-row="${row}"][data-col="${col - 1}"]`) as HTMLInputElement)?.focus();
        }
        break;
      case "ArrowRight":
        if (col < 8) {
          e.preventDefault();
          (document.querySelector(`[data-row="${row}"][data-col="${col + 1}"]`) as HTMLInputElement)?.focus();
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="sudoku-grid">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((value, colIndex) => (
            <input
              key={colIndex}
              className="cell"
              type="text"
              min="1"
              max="9"
              value={value || ""}
              onChange={(e) => handleInputChange(rowIndex, colIndex, e)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              data-row={rowIndex}
              data-col={colIndex}
              onKeyDown={(e) => handleKeyDown(rowIndex, colIndex, e)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
