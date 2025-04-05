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

//bomb actions
setBomb(){
    const bombX = this.player.x;
    const bombY = this.player.y;

    this.cells[this.player.y][this.player.x].classList.add('bomb');
    
    setTimeout(() => {
        this.cells[bombY][bombX].classList.remove('bomb');
    }, 2000);

    setTimeout(() => {
        this.setExplosion(bombX,bombY)
    }, 2000);
}

setExplosion(x,y){
    const locations = [{x:x, y:y}]
    
    for(let i = 1; i <= this.player.bomb.size; i++){
        if(this.isWalkable(x+i, y)) locations.push({x:x+i, y:y})
        else break;
    }
    for(let i = 1; i <= this.player.bomb.size; i++){
        if(this.isWalkable(x-i, y)) locations.push({x:x-i, y:y})
        else break;
    }
    for(let i = 1; i <= this.player.bomb.size; i++){
        if(this.isWalkable(x, y+i)) locations.push({x:x, y:y+i})
        else break;
    }
    for(let i = 1; i <= this.player.bomb.size; i++){
        if(this.isWalkable(x, y-i)) locations.push({x:x, y:y-i})
        else break;
    }

    for(let i = 0; i < locations.length; i++){
        if(this.cells[locations[i].y][locations[i].x]){
            this.cells[locations[i].y][locations[i].x].classList.add('explosion')
            setTimeout(() => {
                this.cells[locations[i].y][locations[i].x].classList.remove('explosion')
            }, 1000);
        }
    }
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

    if(e.key === ' '){
        this.setBomb();
    }
}

}