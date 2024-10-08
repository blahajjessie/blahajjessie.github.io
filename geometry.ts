
// How far under a line is still the same line? (for floating point reasons) 
// This should be pretty high, as the ball can move pretty fast in a single tick if we change its 
const epsilon = 1;

enum shapes{
    point,
    circle,
    line,
    rectangle,
    freeform
}



enum axis{
    xaxis = 0,
    yaxis
}

enum boadType{
    discrete,
    continous,
    console
}

function dynamic(object:Shape){
    ;
}

function fixed(object:Shape){
    return;
}
interface Shape{
    fixed:Function = ()=>{}
    shapetype:shapes;
    x:number;
    y:number;
    // fall into cursedness
    motion:(Shape) => void;

    hit(other:Shape):boolean;
    render(canvas:any)
}


// create a few movement styles



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

class Coord implements Shape{
    x:number;
    y:number;
    shapetype: shapes;
    movement: () => void;
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.shapetype = shapes.point;
    }
    render(canvas: any) {
        throw new Error("Method not implemented.");
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
    hit(other:Shape){
        if (this.shapetype < other.shapetype){
            return other.hit(this);
        }
        return false;
    }                                                                                                                                                 
    
}


class Vector{
    // How accurate should our trig be for rejecting non unit vectors
    static epsilon = .0001
    // x and y are always a unit vector. Magniutde takes care of the rest
    magnitude:number;
    direction:Coord;
    constructor(dir:coordinate, mag?){
        this.direction = coord(dir);
        this.normalize();
        if (mag){
            this.magnitude = mag;
        }
    }
    setDirection(p:coordinate){
        // make a normalized vector real quick
        let point = new Vector(coord(p).x, coord(p).y)
        // and then take its direction
        this.x = point.x;
        this.y = point.y;
    }
    setVector(p:coordinate){
        // take in a coordinate and turn it into another coordinate
        let point = coord(p);
        this.x = point.x;
        this.y = point.y;
        this.normalize();
    }
    // returns an angle in radians
    angle(){
        return Math.atan(this.y/this.x)
    }
    // normalizes x and y to be a unit vector and sets the magnitude accordinlgy
    normalize(){
        this.magnitude = (this.x**2 + this.y ** 2) ** .5
        this.x /=this.magnitude;
        this.y /=this.magnitude;
        
    }
    hit(other:Shape){
        return false;
    }
}

abstract class Box implements Shape{
    height: number;
    width:number;
    center:Coord;
    shapetype: shapes;

    top:Line;
    bottom:Line;
    left:Line;
    right:Line;
    hit(ball:Ball, l:Line){
        return;
    };
    constructor(center:coordinate, width:number, height:number){
        this.shapetype = shapes.rectangle
        this.center = coord(center);
        this.width = width;
        this.height = height;
    }    
}


class Line extends Vector{
    dir: axis;
    shapetype: shapes;
    val:number;
    start:number;
    end:number;
    startpoint = ()=> new Coord(this.val, this.start);
    endpoint = ()=> new Coord(this.val, this.end);
    constructor(dir:axis, val, start, end){
        this.shapetype = shapes.line
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



class Ball implements Shape{
    radius:number;
\
    speednum = 1;
    shapetype: shapes;
    x: number;
    y: number;
    movement: () => void;
    boundpoint=  (l:Line)=> {
        let c = coord(this.center.x, this.center.y);
        return c.add(l.dir, this.radius);
    }
    constructor(p:Coord, r:number){
        this.shapetype = shapes.circle
        this.radius = r;
    }

    hit(other: Shape): boolean {
        throw new Error("Method not implemented.");
    }
    render(canvas: any) {
        throw new Error("Method not implemented.");
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
            if (-Math.sqrt(this.radius + (p.x - this.center[axis.xaxis]) ** 2) < p.y && (p.y < this.center.y)){
                return true;
            }
        }
        // for any box
        if (side >=0){
            if (Math.sqrt(this.radius + (p.x - this.center[axis.xaxis]) ** 2) > p.y && (p.y > this.center.y)){
                return true;
            }
        }
    }
    
    // This should detect side hits and top hits on the bottom 
    touching_box(other:Box){
        
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


