Game of life by Arowo Enioluwa

This is a cellular automation that was devised by John Conway.
It can be interacted with by selecting an initial state or initial configuration and watching how it evolves.
At each step in time, the following rules apply:

1. Any live cell with fewer than two neighbours dies, as if by underpopulation
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation
4. Any dead cell with exactly three live neighbours dies, as if by overpopulation.

Mechanics

After creating the navigation bar, the number of rows and columns was determined.
Using the determined number of rows and columns, the grid was created.
The grid layout was created by using the for loop and creating a new array with a length of the number of columns on each iteration. By doing this, an array with a length of the number of rows was created and each member of this array contained another array with a length of the number of columns. All items in the array served as the cells and their default values were set to false.
The array was mapped over to create the grid rows and each item was iterated over and display of flex was used to ensure that each individual cell was created.
The default colour of each dead cell is white as specified.
The live cells have a colour black.
To select a paricular cell, the keys of each iteration was used and by conditional rendering, this key is given a value of 1 for alive and 0 for dead, depending on whether the cell is dead or alive.
By default, the cells aren't clickable when the array is running.

Random
To make the grid cell state random, the Math.random() function is used. Any random value above 0.6 is true. The cells with a random value above 0.6 is given a value of 1. This makes the cell alive.

Reset
To reset the cell, the grid is re-initialized and all values, set to the initial value.

Running the Simulation
To run the simulation, an array of each individual cell's possible neighbors is created.
This array is called the positions.
We map over the grid's rows and columns and calculate the number of neighbors each cell has.
If the number of neighbors is less than 2 or greater than 3, the cell is given a value of 0 as it has been killed by underpopulation or overpopulation.
If the number of neighbors is equal to 3, the cell is given a value of 1.
Deployed to:

https://game-of-life-nine-alpha.vercel.app/
