//config
const showNumbers = false;

const game = document.getElementById('game');
const rows = 11;
const cols = 13;
let cells = [];
let playerPos = [1][1];

function createGrid() {
  let counter = 0;

  for (let row = 0; row < rows; row++) {
    const rowArray = [];

    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add(`r-${row}`, `c-${col}`);

      if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1 || row % 2 === 0 && col % 2 === 0) {
        cell.classList.add('wall');
      }

      if (showNumbers) {
        cell.innerText = counter;
      }

      game.appendChild(cell);
      rowArray.push(cell);
      counter++;
    }

    cells.push(rowArray);
  }


}

createGrid();
