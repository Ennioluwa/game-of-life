export const rowNumber = 30;
export const columnNumber = 30;

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
