var ball = document.getElementById("ball");
var topB = document.getElementById("topBar");
var bottomB = document.getElementById("bottomBar");
var score = document.getElementById("score");

//variables that will change the coordinates
var l = 0; // Changes left coordinate of the ball
var up = 0; // Changes top coordinate of the ball
var setTop, setLeft;
var randomTopIntSet = false;
var randomLeftIntSet = false;
var hitBottom = false;
var hitRight = false;
var hitLeft = true;
var hitTop = true;
var bottomBarLeft = 500;
var topBarLeft = 500;
var currentScore = 0;

// get random number
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//function to update the value of top Coordinate of the ball
function changeTopCoordinate() {
  if (randomTopIntSet === false) {
    setTop = getRndInteger(6, 10);
    randomTopIntSet = true;
  }
  if (hitBottom === false && hitTop === true) {
    up += setTop;
  } else if (hitBottom === true) {
    up -= setTop;
  }
}

//function to update the value of left Coordinate of the ball
function changeLeftCoordinate() {
  setLeft = getRndInteger(6, 10);
  if (hitRight === false && hitLeft === true) {
    l += setLeft;
  } else if (hitRight === true) {
    l -= setLeft;
  }
}

function moveBall() {
  window.alert("Game is starting now!");
  var movingBall = setInterval(function moveNow() {
    // =============================The Logic below defines the movement of the ball======================================================

    var t = topB.getBoundingClientRect();
    var b = bottomB.getBoundingClientRect();
    var s = ball.getBoundingClientRect();

    if (s.top > window.innerHeight || s.bottom < 0) {
      clearInterval(movingBall);
      window.alert("Game Over!");
    }

    // The following 2 if conditions determine whether the ball will bounce back or not from left and right border
    if (l >= this.window.innerWidth - 70) {
      hitLeft = false;
      hitRight = true;
      randomLeftIntSet = false;
    }
    if (l < 1) {
      hitLeft = true;
      hitRight = false;
      randomLeftIntSet = false;
    }

    // The following 2 if conditions determine whether the ball will bounce back or not from top and bottom border
    if (s.top <= t.bottom && s.right <= t.right && s.left >= t.left) {
      hitTop = true;
      hitBottom = false;
      randomTopIntSet = false;
      currentScore += 10;
      score.innerHTML = currentScore;
    }

    if (s.bottom >= b.top && s.right <= b.right && s.left >= b.left) {
      hitTop = false;
      hitBottom = true;
      randomTopIntSet = false;
      currentScore += 10;
      score.innerHTML = currentScore;
    }

    changeTopCoordinate(); // Calling the function to update top coordinate
    changeLeftCoordinate(); // Calling the function to update left coordinate

    //changing the coordinates using javascript
    var leftCord = l + "px";
    var topCord = up + "px";
    ball.style.left = leftCord;
    ball.style.top = topCord;
  }, 20);
}
// ==================================Now we are making the two rods move============================================================
function moveRods(event) {
  // for moving Bars to the right
  if (event.key === "d") {
    if (bottomBarLeft <= this.window.innerWidth - 275) {
      bottomBarLeft += 25;
      var setBarLeft = bottomBarLeft + "px";
      bottomB.style.left = setBarLeft;
      topB.style.left = setBarLeft;
    }
  }
  // for moving Bars to the left
  if (event.key === "a") {
    if (bottomBarLeft > 0) {
      bottomBarLeft -= 25;
      var setBarRight = bottomBarLeft + "px";
      bottomB.style.left = setBarRight;
      topB.style.left = setBarRight;
    }
  }
}

window.addEventListener("click", moveBall); //Calling the function to move the ball
window.addEventListener("keydown", moveRods); //Calling the function to move the rods
