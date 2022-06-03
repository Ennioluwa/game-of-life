import { useCallback, useEffect, useState } from "react";
import useInterval from "./useInterval";
import { columnNumber, getCells, positions, rowNumber } from "./utils";
const HomeGrid = () => {
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

  return (
    <div className=" relative bg-gray-100 min-h-screen w-full p-5 overflow-auto">
      <div className="gap-2 opacity-85 sticky top-2 left-0 sm:gap-5 bg-blue-100 p-2 sm:p-5 w-fit rounded mx-auto  flex items-center justify-between">
        <button
          onClick={handleStart}
          className=" bg-white font-semibold hover:bg-blue-50 px-4 py-2 rounded text-blue-600 cursor-pointer"
        >
          {!running ? "Start" : "Stop"}
        </button>
        <button
          disabled={running}
          onClick={handleRandom}
          className=" bg-white font-semibold hover:bg-blue-50 px-4 py-2 rounded text-blue-600 cursor-pointer"
        >
          Random
        </button>
        <button
          disabled={running}
          onClick={handleReset}
          className=" bg-white font-semibold hover:bg-blue-50 px-4 py-2 rounded text-blue-600 cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={handleNext}
          className=" bg-white font-semibold hover:bg-blue-50 px-4 py-2 rounded text-blue-600 cursor-pointer"
        >
          Next
        </button>
        <div className=" text-center text-blue-600">
          <span>Interval: </span>
          <input
            className=" text-blue-600 font-semibold focus:ring focus:ring-blue-300 w-20 p-1 rounded bg-white focus:outline-none border border-blue-300"
            type="number"
            value={intervalNo}
            onChange={(e) => setIntervalNo(e.target.value)}
            step={50}
            min={0}
          />
        </div>
        <div className=" font-semibold text-blue-500 shrink-0 w-24">
          <span>Steps: </span>
          <span>{count}</span>
        </div>
      </div>
      <div className=" border border-blue-100 shadow w-fit mx-auto m-10">
        {grid.map((rows, i) => (
          <div key={i} className=" flex">
            {rows.map((col, j) => (
              <button
                key={j}
                onClick={() => {
                  let newGrid = JSON.parse(JSON.stringify(grid));
                  newGrid[i][j] = grid[i][j] ? 0 : 1;
                  setGrid(newGrid);
                  setCount(0);
                }}
                disabled={running}
                className={` w-8 h-8 cursor-pointer border border-blue-100 ${
                  col ? " bg-black" : " bg-white"
                }`}
              ></button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeGrid;
