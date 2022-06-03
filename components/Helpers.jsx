import { useCallback, useEffect, useState } from "react";
import useInterval from "./useInterval";
import { columnNumber, getCells, positions, rowNumber } from "./utils";

const Helpers = () => {
  const [grid, setGrid] = useState(() => {
    return getCells();
  });
  const [permanent, setPermanent] = useState(true);
  const [running, setRunning] = useState(false);
  const [intervalNo, setIntervalNo] = useState(200);
  const [count, setCount] = useState(0);

  const runSimulation = useCallback((grid) => {
    let gridCopy = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < rowNumber; i++) {
      for (let j = 0; j < columnNumber; j++) {
        let neighbors = 0;

        positions.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;

          if (
            newI >= 0 &&
            newI < rowNumber &&
            newJ >= 0 &&
            newJ < columnNumber
          ) {
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
  }, []);
  const handleStart = () => {
    setPermanent(true);
    setRunning(!running);
    runSimulation(grid);
  };
  const handleReset = () => {
    setGrid(getCells());
    setCount(0);
  };
  const handleRandom = () => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid.forEach((item, i) => {
      newGrid[i] = newGrid[i].map(() => (Math.random() >= 0.6 ? 1 : 0));
    });
    setCount(0);
    setGrid(newGrid);
  };

  const handleNext = () => {
    if (!running) {
      setPermanent(false);
      setRunning(true);
      setCount(count + 1);
      runSimulation(grid);
    }
  };

  useEffect(() => {
    if (!permanent && running) {
      setRunning(false);
    }
  }, [permanent, running]);
  useInterval(() => {
    if (running && permanent) {
      runSimulation(grid);
      setCount(count + 1);
    }
  }, intervalNo);
  return {
    runSimulation,
    handleNext,
    handleRandom,
    handleReset,
    handleStart,
    setIntervalNo,
    running,
    grid,
    setCount,
    setGrid,
    setRunning,
    intervalNo,
    count,
  };
};

export default Helpers;
