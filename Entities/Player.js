export class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.bomb = {quantity: 1, size: 3}
    }

    move(dx, dy){
        this.x += dx;
        this.y += dy;
    }
}