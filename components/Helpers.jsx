import { useCallback, useDeferredValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "usehooks-ts";
import { columnSet, rowSet } from "./state/gridSlice";
import { columnNumber, getCells, positions, rowNumber } from "./utils";

const Helpers = () => {
  const layout = useSelector((state) => state.grid);
  const [grid, setGrid] = useState([]);
  const [permanent, setPermanent] = useState(true);
  const [running, setRunning] = useState(false);
  const [intervalNo, setIntervalNo] = useState(200);
  const [count, setCount] = useState(0);
  const [rowNo, setRowNo] = useState(layout.rows);
  const [colNo, setColNo] = useState(layout.columns);
  const deferredRowInput = useDeferredValue(rowNo);
  const deferredColInput = useDeferredValue(colNo);
  const [step, setStep] = useState(0);
  const [newStep, setNewStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const runSimulation = useCallback(
    (grid) => {
      let gridCopy = JSON.parse(JSON.stringify(grid));
      for (let i = 0; i < deferredRowInput; i++) {
        for (let j = 0; j < deferredColInput; j++) {
          let neighbors = 0;

          positions.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;

            if (
              newI >= 0 &&
              newI < deferredRowInput &&
              newJ >= 0 &&
              newJ < deferredColInput
            ) {
              neighbors += grid[newI][newJ];
            } else {
              neighbors;
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
      if (loading) {
        let newGrid = JSON.parse(JSON.stringify(gridCopy));
        step !== 0 && newStep - 1 === count && setGrid(newGrid);
      } else {
        setGrid(gridCopy);
      }
    },
    [
      deferredRowInput,
      deferredColInput,
      loading,
      step,
      newStep,
      count,
      permanent,
    ]
  );
  const handleStart = () => {
    setPermanent(true);
    setRunning(!running);
    runSimulation(grid);
  };
  const handleReset = () => {
    setGrid(getCells(deferredRowInput, deferredColInput));
    setCount(0);
  };
  const handleStepInput = (number) => {
    setStep(Number(number || 0));
  };
  const handleStep = () => {
    if (step === 0) return;
    setNewStep(step + count);
    setPermanent(true);
    setRunning(true);
    setLoading(true);
  };
  const changeGridRows = (number) => {
    setCount(0);
    setStep(0);
    setNewStep(0);
    setRowNo(Number(number) || 20);
    dispatch(rowSet(Number(number) || 20));
  };
  const changeGridColumns = (number) => {
    setCount(0);
    setStep(0);
    setNewStep(0);
    setColNo(Number(number) || 20);
    dispatch(columnSet(Number(number) || 20));
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
    console.log("Line 118");
    if (!permanent && running) {
      setRunning(false);
    }
    setPermanent(true);
  }, [permanent, running]);
  useInterval(
    () => {
      console.log("Line 123");
      if (running && permanent) {
        console.log("Interval running");
        runSimulation(grid);
        setCount(count + 1);
        if (step !== 0 && newStep - 1 === count) {
          setRunning(false);
          setLoading(false);
          console.log(count, step);
        }
      }
    },
    running ? (loading ? 2 : intervalNo) : null
  );

  useEffect(() => {
    console.log("Line 144");
    const newGrid = getCells(deferredRowInput, deferredColInput);
    setGrid(newGrid);
  }, [deferredRowInput, deferredColInput]);
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
    changeGridRows,
    rowNo,
    setRowNo,
    changeGridColumns,
    colNo,
    step,
    handleStep,
    handleStepInput,
  };
};

export default Helpers;
