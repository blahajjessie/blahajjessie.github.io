
var maxh = ()=> Math.max(document.getElementById("noScroll").clientWidth, document.getElementById("noScroll").clientHeight)
var vmin =1000;

function setScale(){
    vmin = maxh();
    let ctx = document.getElementById("snakey").getContext("2d")
    ctx.canvas.width = vmin;
    ctx.canvas.height = vmin;
    console.log(vmin)
}
window.onload = setScale
window.setTimeout(setScale, 10)

window.onresize = setScale;
const squareSize = 25
const boardx = squareSize;
const boardy =  squareSize;
var board = []
var dead = false;

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
        this.olddir = upwards;
        this.timeout = false;
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
        return !(this.head.dot.x >= 0 && this.head.dot.x < boardx && this.head.dot.y >= 0 && this.head.dot.y < boardy);
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
        this.timeout = false;
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
        this.head = newhead;
        if (this.hitSelf()){
            return false;
        }
        // check if we eated
        if (this.head.dot.isApple){
            this.head.dot.isApple = false;
            this.len ++;
            
            // create a new apple
            makeApple();
            
        }
        else{
            // set the old tail
            this.tail.dot.isSnake = false;
            this.tail.prev.next = null;
            this.tail.prev.istail = true;
            this.tail = this.tail.prev;
        }
        this.olddir = this.direction;
        return true;
    }
    turn(direction){
        if (this.timeout){
            this.direction = this.olddir;
        }

        if (this.direction[0] == -1 * direction[0] || this.direction[1] == -1 * direction[1]){
            return;
        }
        this.direction = direction;
        this.timeout = true;
    }
}


function printBoard(gameboard, thisSnake){
    let canvas = document.getElementById("snakey").getContext("2d");
    const border = 10;
    canvas.clearRect(0, 0, maxh(), maxh());
    canvas.fillStyle="black"
    canvas.strokeRect(border, border, maxh() - 2 * border, maxh() - 2 * border)
    let realBoard = maxh() - border * 2
    let square = realBoard / (squareSize);
    // let str = "";
    // for (let i of gameboard){
    //     str+= "▄"
    // }
    // str += "\n"
    for (let i of gameboard){
        // str += "▎";
        // str += "\n";
        for (let j of i ){
            if(j.isApple){
                canvas.fillStyle="red"

                canvas.fillRect(border + square * j.y, border+ square * j.x, square, square)
                canvas.fillStyle="black"

            }
            else if (j.isSnake){

                if(j == thisSnake.head.dot){
                    canvas.fillRect(border + square * j.y, border +  square * j.x, square, square)

                    if (thisSnake.direction == upwards){
                        // str += "<"
                    }
                    if (thisSnake.direction == downwards){
                        // str += ">"
                    }
                    if (thisSnake.direction == left){
                        // str += "v"
                    }
                    if (thisSnake.direction == right){
                        // str += "^"
                    }
                }
                else{
                    canvas.fillRect(border + square * j.y, border +  square * j.x, square, square)
                }
            }
            else{
                // str += " ";
            }
        }

        // str += "▎\n";


    }
    // for (let i of gameboard){
    //     str += "▄"
    // }
    // str += "\n"
    // document.getElementById("gameboard").innerHTML = str;
    
    
}
var snek;

function createGame(){
    board = []
    for (let i = 0; i < boardx; i++){
        let row = []
        for (let j = 0; j < boardy; j++){
            row.push(new dot(i,j));
        }
        board.push(row)
    }
    snek = new snake(10, 4, 1)
    makeApple();

    return setInterval(()=>{
        res = snek.move();
        printBoard(board, snek);
        if (!res){
            // alert("game lost. Double tap to restart");
            document.getElementById("snakey").getContext("2d").font="48px sans-serif"

            document.getElementById("snakey").getContext("2d").fillStyle="blue"

            document.getElementById("snakey").getContext("2d").fillText("You lose. Press a key or swipe to restart.", 100,100, maxh()-200)
            stopgame();
            // clearInterval(runner);
            
        }
    }, 100);
    
}

var runner = createGame();
function restart(){
    if (dead){
        runner = createGame();
        dead = false;
    }
}

function stopgame(){
    console.log(runner);
    clearInterval(runner);
    dead = true;
}

addEventListener("keydown", (event)=>{
    if (dead){
        restart()
        return;
    }
    if(event.key == "ArrowUp"){
        snek.turn(left);
    }
    if(event.key == "ArrowDown"){
        snek.turn(right);
    }
    if(event.key == "ArrowLeft"){
        snek.turn(downwards);
    }
    if(event.key == "ArrowRight"){
        snek.turn(upwards);
    }
    printBoard(board, snek);
})

var center = NaN;
const swipeThreshold = 10;
// returns false if we shouldn t turn 
getSwipe = (start, event)=>{
    
    xdist = start[0] - event.clientX;
    ydist = start[1] - event.clientY;
    if (Math.abs(xdist) < swipeThreshold && Math.abs(ydist) < swipeThreshold){
        console.log("not far enough")
        return false;
    }

    // Not a steep angle 
    if (Math.abs(.636619 * Math.atan(Math.abs(xdist / ydist)) -.5) < .2 ){
        console.log(Math.abs(.636619 * Math.atan(Math.abs(xdist / ydist)) -.5))
        return false
    }

    distance = Math.sqrt(xdist ** 2 + ydist ** 2)
    // yes i know this is cursed
    dir = (xdist ** 2 > ydist ** 2)
    console.log(xdist, ydist)
    return [Math.sign(xdist) * dir, Math.sign(ydist) * (!dir)]
}



addEventListener("touchstart", (event) =>{
    center = [event.touches[0].clientX, event.touches[0].clientY];
});


addEventListener("touchend", (event) =>{
        if(event.touches.len >0 ){
            console.log("double touch")
            center = event.touches[0]
        }
        else{
            center = NaN;
        }


});

addEventListener("touchcancel", (event) =>{
    if(event.touches.len >0 ){
        center = event.touches[0]
        console.log("double")
    }
    else{
        center = NaN;
    }
});


addEventListener("touchmove", (event) =>{
    if (dead){
        restart();
        return;
    }
        var dir = getSwipe(center, event.touches[0])
        console.log(dir)

        if(dir + [] ==  [-1, 0]){
            snek.turn(upwards);
        }
        else if(dir  + [] == [1, 0]){
            snek.turn(downwards);
        }
        else if(dir + [] == [0,1]){
            snek.turn(left);
        }
        else if(dir + []  == [0,-1]){
            snek.turn(right);
        }
        else{
        }
        printBoard(board, snek);
});

