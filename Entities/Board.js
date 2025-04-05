import { Player } from "./Player.js";

export class Board{

constructor(rows,cols,isDebug){
    this.rows = rows,
    this.cols = cols,
    this.isDebug = isDebug
    this.cells = [],
    this.game = document.getElementById('game'),
    this.player = new Player(1,1)
    
    this.handleKeyPress = this.handleKeyPress.bind(this);
    document.addEventListener('keydown', this.handleKeyPress);
}

createGrid() {
  let counter = 0;

  for (let row = 0; row < this.rows; row++) {
    const rowArray = [];

    for (let col = 0; col < this.cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (row === 0 || row === this.rows - 1 || col === 0 || col === this.cols - 1 || row % 2 === 0 && col % 2 === 0) {
        cell.classList.add('wall');
      }

      if (this.isDebug) {
        cell.innerText = counter;
      }

      game.appendChild(cell);
      rowArray.push(cell);
      counter++;
    }

    this.cells.push(rowArray);
  }

  this.setPlayer();
}

//player actions
setPlayer() {
    this.cells[this.player.y][this.player.x].classList.add('player');
}

removePlayer(){
    this.cells[this.player.y][this.player.x].classList.remove('player');
}

isWalkable(x, y) {
    return !this.cells[y][x].classList.contains('wall')
}

handleKeyPress(e) {
    if(e.key != ' '){
        if(e.key === 'ArrowLeft' && this.isWalkable(this.player.x -1, this.player.y)){
            this.removePlayer();
            this.player.move(-1,0);
        } 
        if(e.key === 'ArrowRight' && this.isWalkable(this.player.x +1, this.player.y)){
            this.removePlayer();
            this.player.move(+1,0);
        }
        if(e.key === 'ArrowUp' && this.isWalkable(this.player.x , this.player.y-1)){
            this.removePlayer();
            this.player.move(0,-1);
        }
        if(e.key === 'ArrowDown'&& this.isWalkable(this.player.x , this.player.y+1)){
            this.removePlayer();
            this.player.move(0,+1);
        }
        this.setPlayer();
    }
}

}