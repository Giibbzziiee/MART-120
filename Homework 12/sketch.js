let player;
let obstacles = [];
let staticObstacle = null; // store object added by mouse click
let exitZone;
let winMessage = false;

function setup() {
  createCanvas(800, 600);
  createPlayer(); // create player
  createObstacles(2); // Create two obstacles
  createExit(); // Create exit zone
}

function draw() {
  background(220);
  drawBorder(); // Generate border
  drawPlayer(); // Draw and move player
  moveObstacles(); // Move obstacles
  drawStaticObstacle(); // Draw static obstacle if placed
  drawExit(); // Draw exit
  checkWinCondition(); // Check if player has won
  displayWinMessage(); // Display "You Win!" if player wins
}

// create player
function createPlayer() {
  player = {
    x: 50,
    y: height / 2,
    size: 30,
    speed: 5
  };
}

// draw and move player
function drawPlayer() {
  fill('blue');
  rect(player.x, player.y, player.size, player.size);
  movePlayer();
}

// move player using keyboard
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;

  // Wrap player around screen
  if (player.x > width) player.x = 0;
  if (player.x < 0) player.x = width;
  if (player.y > height) player.y = 0;
  if (player.y < 0) player.y = height;
}

// create obstacles
function createObstacles(num) {
  for (let i = 0; i < num; i++) {
    obstacles.push({
      x: random(width),
      y: random(height),
      w: random(40, 100),
      h: random(40, 100),
      color: color(random(255), random(255), random(255)),
      speedX: random(1, 3),
      speedY: random(1, 3)
    });
  }
}

// move obstacles randomly
function moveObstacles() {
  for (let obs of obstacles) {
    fill(obs.color);
    rect(obs.x, obs.y, obs.w, obs.h);
    obs.x += obs.speedX;
    obs.y += obs.speedY;

    // Wrap obstacles around screen
    if (obs.x > width) obs.x = 0;
    if (obs.x < 0) obs.x = width;
    if (obs.y > height) obs.y = 0;
    if (obs.y < 0) obs.y = height;
  }
}

// draw a static obstacle on mouse press
function drawStaticObstacle() {
  if (staticObstacle !== null) {
    fill('red');
    rect(staticObstacle.x, staticObstacle.y, staticObstacle.w, staticObstacle.h);
  }
}

// Add static obstacle on mouse click
function mousePressed() {
  staticObstacle = {
    x: mouseX,
    y: mouseY,
    w: random(40, 100),
    h: random(40, 100)
  };
}

// create exit zone
function createExit() {
  exitZone = {
    x: width - 50,
    y: height / 2 - 25,
    w: 50,
    h: 50,
    color: 'green'
  };
}

// draw exit zone
function drawExit() {
  fill(exitZone.color);
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);
}

// check if player has won
function checkWinCondition() {
  if (player.x > exitZone.x && player.y > exitZone.y && 
      player.x < exitZone.x + exitZone.w && player.y < exitZone.y + exitZone.h) {
    winMessage = true;
    noLoop(); // Stop game loop
  }
}

// display win message
function displayWinMessage() {
  if (winMessage) {
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text("You Win!", width / 2, height / 2);
  }
}

// draw a border around screen
function drawBorder() {
  stroke(0);
  noFill();
  rect(0, 0, width, height);
}
