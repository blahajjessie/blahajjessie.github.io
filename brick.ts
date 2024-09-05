const paddleheight = 5;
const paddlewidth = 20;
const brickwidth = 10;
const wallheight = 100;
const wallwidth = 100;
const brickheight = 10;
const ballRad = 10;

var bricks = []

// How far under a line is still the same line? (for floating point reasons) 
// This should be pretty high, as the ball can move pretty fast in a single tick if we change its 
const epsilon = 1;

enum axis{
    xaxis = 0,
    yaxis
}

function coord(x:number, y:number):Coord;
function coord(arr:[number,number]):Coord
function coord(Coord):Coord;
function coord(x:number | [number, number], y?:number):Coord
{  
    if (y){
        return new Coord(x, y)
    }
    else if (x[0]){
        return new Coord(x[0], x[1]);
    }
    else{
        return x as unknown as Coord;
    }
}
type coordinate = [number, number] | Coord;

class Coord{
    x:number;
    y:number;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    set(o:coordinate){
        let other = coord(o);
        this.x = other.x;
        this.y = other.y;
    }
    get(a:axis){
        return [this.x, this.y][a];
    }
    add(dir:axis, num:number);
    add(p:coordinate);
    add(p, y?:number){
        if (y){
            [this.x, this.y][p] += y;
        }
        else{
            let point = coord(p);
            this.x += point.x;
            this.y += point.y;
        }
    }
    bounce(dir:axis){
        [this.x, this.y][dir] *= -1

    }

}


abstract class Box{
    height: number;
    width:number;
    center:Coord;

    top:Line;
    bottom:Line;
    left:Line;
    right:Line;
    hit(ball:Ball, l:Line){
        return;
    };
    constructor(center:coordinate, width:number, height:number){
        this.center = coord(center);
        this.width = width;
        this.height = height;
    }    
}
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





class Line{
    dir: axis;
    val:number;
    start:number;
    end:number;
    startpoint = ()=> new Coord(this.val, this.start);
    endpoint = ()=> new Coord(this.val, this.end);
    constructor(dir:axis, val, start, end){
        this.dir = dir;
        this.start = start;
        this.end = end;
        this.val = val;
    }

    // How far along the line is the ball
    hit_pos(b:Ball){
        // Approximation for the angle if its an edge hit? just round it to the size
        if (b.boundpoint(this)> this.end) return this.end - this.start;
        if (b.boundpoint(this) < this.start) return 0;

        // otherwise just give the location
        return b.boundpoint(this) - this.start

    }
}

// Create paddle

var playerpaddle = new Paddle(wallwidth/2)
// Create Walls
var board = new Board([0,0], wallwidth,wallheight);
// Create bricks


class Ball{
    center:Coord;
    radius:number;
    speedvect: Coord;
    speednum = 1;
    boundpoint=  (l:Line)=> {
        let c = coord(this.center.x, this.center.y);
        return c.add(l.dir, this.radius);
    }
    constructor(p:Coord){
        this.radius = ballRad;
    }
    // change the location of the center of the circle
    move(){
        this.center.add(this.speedvect);
    }
    bounce(direction:axis){
        this.speedvect.bounce(direction);
    }
    touching_point(p:Coord, side= 0){
        // The only thing we do for the paddle, triggers for -1
        if (side <=0 ){
            if (Math.sqrt(this.radius + (p.x - this.center[axis.xaxis]) ** 2) > p.y){

            }
        }
        // for any box
        if (side >=0){

        }
    }
    
    // This should detect side hits and top hits on the bottom 
    touching_brick(other:Box){
        
    }
    // return the point where the circle intersects the line
    hit_line(l:Line){
        
        if (l.start < this.boundpoint(l) && this.boundpoint(l) < l.end){
            this.bounce(l.dir);
            return true;
        }
        return NaN;
    }

    setDir(angle:number){
        // normalize the speed and then multiply by the current speed.
        this.speedvect = coord(this.speednum * Math.cos(angle),this.speednum*  Math.sin(angle))
    }

}
