const paddleheight = 5;
const paddlewidth = 20;
const brickwidth = 10;
const wallheight = 100;
const wallwidth = 100;
const brickheight = 10;
const ballRad = 10;

var bricks = []



class Paddle extends Box{
    speed:number = 1;
    constructor(center:number){
        super([0,center], paddlewidth, paddleheight )
    }
    move(forward:boolean){
        this.center.add(this.speed * (forward? 1:-1), axis.xaxis)
    }
    // hit position
    hit(ball:Ball, l:Line){
        // Where did it hit on the paddle?
        let point = l.hit_pos(ball);

        // Divide it by the size of the paddle
        point = 2 * point / this.width
        // Should now be bounded betwen 0 and 2

        // subtract from the middle point (but its normalized already)
        point = point -1
        // should be between -1 and 1 now!

        // Multiply it so a 180 degree bounce isnt possible
        point *= .9;
        // use the arccos of the normalized difference as the new angle of the ball
        ball.setDir(Math.acos(point));
    }

    
    changeWidth(ammount:number){
        this.width = this.width + ammount
    }

}

class Brick extends Box{
    weakness:number;
    constructor(center:Coord){
        super(center, brickheight, brickwidth);
    }
    hit(ball:Ball, l:Line){
        this.weakness --;
        ball.bounce(l.dir);
    }

}

// Silly goofy magic
class Board extends Box{
    top = new Line(axis.xaxis, wallheight, 0, wallwidth);
    left = new Line(axis.yaxis, 0, 0, wallheight);
    right = new Line(axis.yaxis, wallwidth, 0, wallheight);
    

    // Is a board anything like a box? no. Do I care? no.
    hit(ball:Ball, l:Line){
        ball.bounce(l.dir);
    }
}



// Create paddle

var playerpaddle = new Paddle(wallwidth/2)
// Create Walls
var board = new Board([0,0], wallwidth,wallheight);
// Create bricks

class Shot extends Ball{
    
}