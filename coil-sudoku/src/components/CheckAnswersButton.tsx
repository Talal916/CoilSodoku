import React from "react";

type CheckAnswersButtonProps = {
  board: number[][];
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
};

const correctBoard: number[][] = [
  [4, 3, 5, 2, 6, 9, 7, 8, 1],
  [6, 8, 2, 5, 7, 1, 4, 9, 3],
  [1, 9, 7, 8, 3, 4, 5, 6, 2],
  [8, 2, 6, 1, 9, 5, 3, 4, 7],
  [3, 7, 4, 6, 8, 2, 9, 1, 5],
  [9, 5, 1, 7, 4, 3, 6, 2, 8],
  [5, 1, 9, 3, 2, 6, 8, 7, 4],
  [2, 4, 8, 9, 5, 7, 1, 3, 6],
  [7, 6, 3, 4, 1, 8, 2, 5, 9],
];

const CheckAnswersButton: React.FC<CheckAnswersButtonProps> = ({ board, setErrorMessage, setSuccessMessage }) => {
  const checkAnswers = () => {
    console.log("Checking answers...");

    const setMessage = (error?: string | null, success?: string) => {
      if (error) {
        setErrorMessage(error);
        setSuccessMessage("");
      } else if (success) {
        setSuccessMessage(success);
        setErrorMessage("");
      } else {
        setErrorMessage("");
        setSuccessMessage("");
      }
    };

    const hasDuplicates = (arr: number[]): boolean => {
      const seenValues = new Set<number>();
      for (const value of arr) {
        if (value !== 0 && seenValues.has(value)) return true;
        seenValues.add(value);
      }
      return false;
    };

    for (let i = 0; i < 9; i++) {
      const row = board[i];
      const column = board.map((row) => row[i]);
      if (hasDuplicates(row) || hasDuplicates(column)) {
        setMessage("There are duplicate numbers in a row or column.");
      }
    }

    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const subgrid = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            subgrid.push(board[row + i][col + j]);
          }
        }
        if (hasDuplicates(subgrid)) {
          setMessage("There are duplicate numbers in a 3x3 subgrid.");
        }
      }
    }

    if (board.toString() === correctBoard.toString()) {
      setMessage(null, "Completed!");
    } else if (board.toString().includes("")) {
      setMessage();
    }
  };

  return (
    <button className="check-answers-button" onClick={checkAnswers}>
      Check answers
    </button>
  );
};

export default CheckAnswersButton;
