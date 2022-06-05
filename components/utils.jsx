import { useSelector, useDispatch } from "react-redux";

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

export const getCells = (rowNo, columnNo) => {
  const rows = [];
  for (let i = 0; i < rowNo; i++) {
    rows.push(Array.from(Array(columnNo), () => 0)); // returns a live cell 70% of the time
  }
  return rows;
};
