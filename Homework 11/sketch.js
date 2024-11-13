let player;
let obstacles = [];
let staticObstacle = null; 
let exitZone;
let winMessage = false;

function setup() {
  createCanvas(800, 600);
  
  // create player
  player = {
    x: 50,
    y: height / 2,
    size: 30,
    speed: 5
  };

  // random moving obstacles
  for (let i = 0; i < 2; i++) {
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

  // create exit zone
  exitZone = {
    x: width - 50,
    y: height / 2 - 25,
    w: 50,
    h: 50,
    color: 'green'
  };
}

function draw() {
  background(220);
  
  // draw and move player
  fill('blue');
  rect(player.x, player.y, player.size, player.size);
  handlePlayerMovement(); // Call movement function regardless of obstacle placement
  
  // ddraw exit zone
  fill(exitZone.color);
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);
  
  // draw and move obstacles
  for (let obs of obstacles) {
    fill(obs.color);
    rect(obs.x, obs.y, obs.w, obs.h);
    moveObstacle(obs);
  }

  // draw static obstacle
  if (staticObstacle !== null) {
    fill('red');
    rect(staticObstacle.x, staticObstacle.y, staticObstacle.w, staticObstacle.h);
  }

  // check for exit
  if (player.x > exitZone.x && player.y > exitZone.y && 
      player.x < exitZone.x + exitZone.w && player.y < exitZone.y + exitZone.h) {
    winMessage = true;
  }

  // win message
  if (winMessage) {
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text("You Win!", width / 2, height / 2);
    noLoop(); // stop game
  }
}

function handlePlayerMovement() {
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += player.speed;
  }
  if (keyIsDown(UP_ARROW)) {
    player.y -= player.speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.y += player.speed;
  }
  
  // wrap player around the screen
  if (player.x > width) player.x = 0;
  if (player.x < 0) player.x = width;
  if (player.y > height) player.y = 0;
  if (player.y < 0) player.y = height;
}

// obstacle movement
function moveObstacle(obs) {
  obs.x += obs.speedX;
  obs.y += obs.speedY;

  // wrap obstacles around the screen
  if (obs.x > width) obs.x = 0;
  if (obs.x < 0) obs.x = width;
  if (obs.y > height) obs.y = 0;
  if (obs.y < 0) obs.y = height;
}

// static obstacle on mouse click
function mousePressed() {
  staticObstacle = {
    x: mouseX,
    y: mouseY,
    w: random(40, 100),
    h: random(40, 100)
  };
}
