import { useState } from "react";
import InputSlider from "react-input-slider";
import Helpers from "./Helpers";

const HomeGrid = () => {
  const {
    count,
    handleNext,
    handleRandom,
    handleReset,
    handleStart,
    setIntervalNo,
    running,
    grid,
    setCount,
    setGrid,
    intervalNo,
    changeGridRows,
    rowNo,
    changeGridColumns,
    colNo,
    step,
    handleStep,
    handleStepInput,
  } = Helpers();

  return (
    <div className=" relative bg-gray-100 p-5 h-full">
      <div className=" border border-blue-100 flex flex-col shadow mx-auto h-full">
        {grid?.map((rows, i) => (
          <div key={i} className=" flex grow">
            {rows.map((cell, j) => (
              <button
                key={j}
                onClick={() => {
                  let newGrid = JSON.parse(JSON.stringify(grid));
                  newGrid[i][j] = grid[i][j] ? 0 : 1;
                  setGrid(newGrid);
                  setCount(0);
                }}
                disabled={running}
                className={`cursor-pointer border grow border-blue-100 ${
                  cell ? " bg-black" : " bg-white"
                }`}
              ></button>
            ))}
          </div>
        ))}
      </div>
      <div className="gap-2 z-30 opacity-95 fixed shadow top-32 right-0 left-0 mx-10 sm:gap-5 bg-blue-200 p-2 sm:p-5 rounded flex-wrap flex items-center justify-between">
        <button
          onClick={handleStart}
          className=" bg-white  font-semibold z-20 hover:bg-blue-50 px-4 py-2 rounded text-blue-600 cursor-pointer"
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

        <div className="text-blue-600 flex gap-2 items-center">
          <span>Skip to:</span>
          <input
            className=" text-blue-600 font-semibold focus:ring focus:ring-blue-300 w-20 px-3 py-2 rounded bg-white focus:outline-none border border-blue-300"
            type="number"
            disabled={running}
            value={step}
            onChange={(e) => handleStepInput(e.target.value)}
            min={0}
          />
          <button
            className=" py-2 px-3 bg-white rounded font-semibold"
            onClick={handleStep}
          >
            Skip
          </button>
        </div>

        <div className=" font-semibold text-blue-500 shrink-0 w-24">
          <span>Steps: </span>
          <span>{count}</span>
        </div>
      </div>
      <div className=" fixed shadow bottom-10 p-5 h-60 w-60 bg-blue-200 right-10 rounded">
        <div className="text-blue-600">
          <span>Column No: </span>
          <InputSlider
            axis="x"
            xstep={10}
            xmin={10}
            xmax={110}
            x={colNo}
            // onChange={(e) => setIntervalNo(e.target.value)}
            onChange={({ x }) => changeGridColumns(x)}
          />
        </div>
        <div className="text-blue-600">
          <span>Row No: </span>
          <InputSlider
            axis="x"
            xstep={10}
            xmin={10}
            xmax={110}
            x={rowNo}
            // onChange={(e) => setIntervalNo(e.target.value)}
            onChange={({ x }) => changeGridRows(x)}
          />
        </div>
        <div className="text-blue-600">
          <span>Interval NO: </span>
          <InputSlider
            axis="x"
            xstep={50}
            xmin={0}
            xmax={400}
            x={intervalNo}
            onChange={({ x }) => setIntervalNo(x)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeGrid;
