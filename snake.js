<<<<<<< HEAD
=======


>>>>>>> d8b736f (snake works)
var boardx = 20;
var boardy = 50;
var board = []

class snakepart{
    constructor(dotvar, ishead, istail){
        this.dot = dotvar;
        this.next = null;
        this.prev = null;
        this.ishead = ishead;
        this.istail = istail;
    }
}
class dot{
    constructor(x, y){
        this.x = x;
        this.y=y;
        this.isApple = false;
        this.isSnake = false;
    }
}

for (let i = 0; i < boardx; i++){
    let row = []
    for (let j = 0; j < boardy; j++){
        row.push(new dot(i,j));
    }
    board.push(row)
}

const upwards = [0,1];
const downwards = [0,-1];
const right = [1,0];
const left = [-1, 0];

function gen(max) {
    return Math.floor(Math.random() * max);
}

function makeApple(){
    let newx;
    let newy;
    do{
        newx = gen(boardx);
        newy = gen(boardy);
    }
    while (board[newx][newy].isApple || board[newx][newy].isSnake );
    
    board[newx][newy].isApple = true;
}
const directions = [upwards, downwards, left, right];

class snake{
    constructor(x, y, len){
        this.direction = upwards;
        this.len = len;
        this.head = new snakepart(board[x][y], true, false);
        let curr = this.head;
        this.head.prev = null;
        // Generate len pieces after the snake, with the last one being the tail
        for (let i = 0; i <= len; i++){
            curr.next = new snakepart(board[curr.dot.x - this.direction [0]][curr.dot.y - this.direction[1]], false, i == len)
            curr.dot.isSnake = true;
            
            curr.next.prev = curr;
            console.log(curr);

            curr = curr.next;

        }
        this.tail = curr;
        this.tail.next = null;
        this.myinterval = null;
    }
    hitWall(){
        return !(this.head.dot.x > 0 && this.head.dot.x < boardx && this.head.dot.y >0 && this.head.dot.y < boardy);
    }

    hitSelf(){
        let headx = this.head.dot.x;
        let heady = this.head.dot.y;
        let piece = this.head.next;
        while (piece && piece !== null ){
            if (piece.dot.x == headx && piece.dot.y == heady){
                return true;
            }
            piece = piece.next;
        }
        return false;
    }
    move(){
        let nextx = this.head.dot.x + this.direction[0]
        let nexty = this.head.dot.y + this.direction[1]
        if (nextx >= boardx || nexty >=boardy || nextx <0 || nexty <0) {
            console.log("loss");
            return false;
        }

        let nextdot = board[nextx][nexty]

        if (typeof nextdot === "undefined" || this.hitWall()) return false;

        let newhead = new snakepart(nextdot, true, false);
        newhead.next = this.head;
        newhead.prev = null;
        newhead.dot.isSnake = true;

        // Update the old head
        this.head.ishead = false;
        this.head.prev = newhead;
        
        // update the snake
<<<<<<< HEAD
        this.head = newhead;
=======

        this.head = newhead;
        
>>>>>>> d8b736f (snake works)

        // check if we eated
        if (this.head.dot.isApple){
            this.head.dot.isApple = false;
            this.len ++;
            
            // create a new apple
            makeApple();
<<<<<<< HEAD
=======

            
>>>>>>> d8b736f (snake works)
        }
        else{
            // set the old tail
            this.tail.dot.isSnake = false;
            this.tail.prev.next = null;
            this.tail.prev.istail = true;
            this.tail = this.tail.prev;
<<<<<<< HEAD
        }
        return true;
=======

        }
        return true;
        
>>>>>>> d8b736f (snake works)
    }
    turn(direction){
        if (this.direction[0] == -1 * direction[0] || this.direction[1] == -1 * direction[1]){
            return;
        }
        this.direction = direction;
<<<<<<< HEAD
    }
}

=======

    }

}



>>>>>>> d8b736f (snake works)
function printBoard(gameboard, thisSnake){

    let str = "";
    for (let i of gameboard){
<<<<<<< HEAD
        str += "|";
        for (let j of i ){
=======
        str += "|"

        for (let j of i ){
            
>>>>>>> d8b736f (snake works)
            if(j.isApple){
                str += "○";
            }
            else if (j.isSnake){
                if(j == thisSnake.head.dot){
                    str += "<"
                }
                else{
                    str += "="
                }
            }
            else{
                str += " ";
            }
        }
        str += "|\n";

    }
    document.getElementById("gameboard").innerHTML = str;
}
<<<<<<< HEAD
=======

>>>>>>> d8b736f (snake works)
var snek = new snake(4, 4, 3)

makeApple();
var runner = setInterval(()=>{
    res = snek.move();
    printBoard(board, snek);
    if (!res){
        alert("game lost");
        stopgame();
<<<<<<< HEAD
=======
        // clearInterval(runner);
        
>>>>>>> d8b736f (snake works)
    }
}, 100);

function stopgame(){
    console.log(runner);
    clearInterval(runner);
}

addEventListener("keydown", (event)=>{
    if(event.key == "ArrowUp"){
        snek.turn(left);
<<<<<<< HEAD
    }
    if(event.key == "ArrowDown"){
        snek.turn(right);
    }
    if(event.key == "ArrowLeft"){
        snek.turn(downwards);
    }
    if(event.key == "ArrowRight"){
        snek.turn(upwards);
=======
        // console.log ("up");

    }
    if(event.key == "ArrowDown"){
        snek.turn(right);
        // console.log ("down");


    }
    if(event.key == "ArrowLeft"){
        snek.turn(downwards);
        // console.log ("left");


    }
    if(event.key == "ArrowRight"){
        snek.turn(upwards);
        // console.log ("right");


>>>>>>> d8b736f (snake works)
    }
})

