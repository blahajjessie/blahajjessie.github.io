const topSide = (150-112) *2
const leftSide = ( 262- 224) * 2
const width = 112*4
const height = 224*4
const midpoint = topSide + height / 2
const rightSide = leftSide + width;
const bottomSide = topSide + height;
const ballsize = 57.15 * 4 /20
const holesize = ballsize * 1.5
const tau = 6.28318530718
const cushions = 20;


class circle{
    
    

}

class hole extends circle{

}

class ball extends circle{

}


function drawBoard(){
    canvas = document.getElementById("board").getContext("2d")
    canvas.rect(topSide ,leftSide, width, height)

    canvas.stroke();
    canvas.beginPath();
    canvas.moveTo(leftSide, topSide);
    canvas.arc(leftSide , topSide ,holesize, tau,tau/4 )
    canvas.moveTo( rightSide, topSide);

    canvas.arc(rightSide ,topSide , holesize,  tau/4,  tau/2, false)
    canvas.moveTo(leftSide, bottomSide);

    canvas.arc(leftSide , bottomSide ,holesize, 3* tau / 4,tau)
    canvas.moveTo( rightSide, bottomSide);

    canvas.arc(rightSide ,bottomSide , holesize, tau/2 ,3 * tau/ 4 )

    // Side holes
    canvas.moveTo( rightSide, midpoint);

    canvas.arc(rightSide ,midpoint , holesize, tau/4 ,3 * tau/ 4 )
    canvas.moveTo( leftSide, midpoint);

    canvas.arc(leftSide ,midpoint , holesize ,3 * tau/ 4 , tau/4)

    canvas.fillStyle="red"
    canvas.fill()
    canvas.stroke()
    console.log("canvas")
}

window.addEventListener("load", (event) => {
    drawBoard()
  });