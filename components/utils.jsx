import { useCallback } from "react";
import useInterval from "./useInterval";

const rowNumber = 25;
const columnNumber = 25;

export const positions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export const getCells = () => {
  const rows = [];
  for (let i = 0; i < rowNumber; i++) {
    rows.push(Array.from(Array(columnNumber), () => 0)); // returns a live cell 70% of the time
  }
  return rows;
};
export const runSimulation = (grid, permanent, setRunning, setGrid) => {
  console.log(grid, permanent);
  let gridCopy = JSON.parse(JSON.stringify(grid));
  for (let i = 0; i < rowNumber; i++) {
    for (let j = 0; j < columnNumber; j++) {
      let neighbors = 0;
      positions.forEach(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;
        if (newI >= 0 && newI < rowNumber && newJ >= 0 && newJ < columnNumber) {
          neighbors += grid[newI][newJ];
        }
      });
      if (neighbors < 2 || neighbors > 3) {
        gridCopy[i][j] = 0;
      } else if (grid[i][j] === 0 && neighbors === 3) {
        gridCopy[i][j] = 1;
      }
    }
  }
  !permanent && setRunning(false);
  setGrid(gridCopy);
};
