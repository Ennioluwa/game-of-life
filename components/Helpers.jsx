import React from "react";

const Helpers = () => {
  const initialize = useCallback(() => {
    const cells = getCells(25);
    setGrid(cells);
    setCount(0);
  }, []);
  const randomizeGrid = (grid) => {
    let randomGrid = {};

    Object.keys(grid).forEach((item) => {
      randomGrid[item] = grid[item].map(() => Math.random() >= 0.6);
    });
    setCount(0);
    return randomGrid;
  };
  const handleCell = useCallback(
    (column, rowIndex, cell) => {
      if (running) return;
      const currentCell = !cell;
      let newOb = { ...grid };
      newOb[column][rowIndex] = currentCell;
      setGrid(newOb);
      setCount(0);
    },
    [grid, liveCellsPos]
  );
  return <div>Helpers</div>;
};

export default Helpers;
