var endgame = false;
var newthing;
var board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
var score = 0;

console.log("Made by Jessie")
function movable(arr){

  if (!full(arr)){
    return true;
  }
  for (var i = 0; i<arr.length; i++){
    for (var j = 0; j<arr[1].length-1; j++){
      if (arr[i][j] == arr[i][j+1]){
        return true;
      }
    }
  }
  for (var i = 0; i<arr.length-1; i++){
    for (var j = 0; j<arr[1].length; j++){
      if (arr[i][j] == arr[i+1][j]){
        return true;
      }
    }
  }
  return false;
}

function update() {

  document.getElementById("title").innerHTML = score + "/2048";
  if(movable(board)){
    document.getElementById("game").innerHTML = "";
  }
  if (!movable(board)) {
    if (document.getElementById("game").innerHTML == ""){
      document.getElementById("game").innerHTML = "Game Over";
      endgame = false;
    }
    else if (document.getElementById("game").innerHTML == "You win"){
      document.getElementById("game").innerHTML = "You win Game Over";
            endgame = false;
    }
  }

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      document.getElementById("" + i + j).innerHTML = board[i][j];
      document.getElementById("" + i + j).setAttribute("class", "box n" + board[i][j])
      if (board[i][j] >2047){
        document.getElementById("game").innerHTML = "You win";      }
    }
  }
  if (newthing != null) {
    document.getElementById(newthing).classList.add("new" );
  }
}

function full(arr) {

  for (var i = 0; i < arr.length; i++)
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 0)
        return false;
    }
  return true;

}

function addBox() {

  if (full(board)) {
    return true;
  }

  var r1 = Math.floor(Math.random() * 4);
  var r2 = Math.floor(Math.random() * 4);
  while (board[r1][r2] != 0) {
    var r1 = Math.floor(Math.random() * 4);
    var r2 = Math.floor(Math.random() * 4);
  }
  var rand = Math.floor(Math.random() * 4)
  rand = rand == 1? 2:1;
  board[r1][r2] = Math.pow(2, rand);
  newthing = "" + r1 + r2;
}

function crush(arr, dir) {

  if (dir == "l" || dir == "u") {
    var lowest = 0;
    for (var i = 0; i < 4; i++) {
      if (arr[i] != 0) {
        arr[lowest] = arr[i];
        lowest++;
      }
    }
    for (var i = lowest; i < 4; i++) {
      arr[i] = 0;
    }
  }
  if (dir == "r" || dir == "d") {
    var lowest = 3;
    for (var i = 3; i >= 0; i--) {
      if (arr[i] != 0) {
        arr[lowest] = arr[i];
        lowest--;
      }
    }
    for (var i = 0; i <= lowest; i++) {
      arr[i] = 0;
    }
  }
  return arr;
}

function combine(arr, dir) {

  if (dir == "u" || dir == "l"){
  for (var i = 1; i < 4; i++) {
    if (arr[i - 1] == arr[i]) {
      arr[i] = 0;
      arr[i - 1] *= 2;
      score =  arr[i-1] > score ? arr[i-1]:score;
    }
  }
}
 if (dir =="d" || dir == "r"){

   for (var i = 2; i >=0; i--) {

     if (arr[i + 1] == arr[i]) {
       arr[i + 1]  *=2;
       arr[i ] = 0;
        score =  arr[i+1] > score ? arr[i+1]:score;
     }
   }
 }

  arr = crush(arr, dir);
  return arr;
}

function move(dir) {


  for (var i = 0; i < 4; i++) {

    if (dir == "l" || dir == "r") {
      current = crush(board[i], dir);
      current = combine(current, dir);
      board[i] = current;
    }

    if (dir == "u" || dir == "d") {
      current = [0, 0, 0, 0]

      for (var k = 0; k < 4; k++) {
        current[k] = board[k][i];
      }

      current = crush(current, dir);

      current = combine(current, dir);

      for (var k = 0; k < 4; k++) {
        board[k][i] = current[k];
      }

    }
  }

}

//swipes

window.onkeydown = function(key) {
  update();
    endgame = movable(board);
  var oldboard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  for (var i = 0; i<4; i++){
    for (var j = 0; j<4; j++){
      oldboard[i][j] = board[i][j];
    }
  }




  var dir = 0;
  if (key.key == "ArrowUp") {
    dir = "u"
  }
  if (key.key == "ArrowDown") {
    dir = "d"
  }
  if (key.key == "ArrowLeft") {
    dir = "l"
  }
  if (key.key == "ArrowRight") {
    dir = "r"
  }


  if (dir != 0){
  move(dir);
}

 var checkeq = true;
 for (var i = 0; i<4; i++){
   for (var j = 0; j<4; j++){
     if (oldboard[i][j] != board[i][j]){

       checkeq = false;
     }
   }
 }

if (!checkeq && dir != 0 ){
addBox();
}


  update();

};


document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches || // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};


// everything below this is for safari being a dumbass bitch with scrolling


function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }
  var dir = 0;
  var oldboard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  for (var i = 0; i<4; i++){
    for (var j = 0; j<4; j++){
      oldboard[i][j] = board[i][j];
    }
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      move('l');
      dir = 1;
    } else {
      move('r');
            dir = 1;
    }
  } else {
    if (yDiff > 0) {
      move('u');
            dir = 1;
    } else {
      move('d');
            dir = 1;
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;

  var checkeq = true;
  for (var i = 0; i<4; i++){
    for (var j = 0; j<4; j++){
      if (oldboard[i][j] != board[i][j]){
        checkeq = false;
      }
    }
  }

 if (!checkeq ){
addBox();
 }
   update();
};

function preventDefault(e) {
  e.preventDefault();
}

function disableScroll() {
  document.body.addEventListener('touchmove', preventDefault, {
    passive: false
  });
}

disableScroll();
addBox();
addBox();
update();

document.ontouchstart = (e) => {
  e.preventDefault();
};
