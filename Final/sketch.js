let player;
let platforms = [];
let obstacles = [];
let exit;

const platformHeightLevels = [450, 350, 250, 150, 50];
const platformSpacing = 250;
const gravity = 0.5;
const jumpStrength = 12;
const obstacleSpeed = 2;

function setup() {
  createCanvas(800, 600);

  // initialize player
  player = new Player(width / 2, platformHeightLevels[0] - 20);

  // create first platfor
  platforms.push(new Platform(0, platformHeightLevels[0], width));

  // create other offset platforms
  for (let i = 1; i < platformHeightLevels.length; i++) {
    let y = platformHeightLevels[i];
    let xOffset = (i % 2 === 0) ? platformSpacing / 4 : platformSpacing / 2;
    for (let x = xOffset; x < width; x += platformSpacing) {
      let randomWidth = random(80, 150);
      platforms.push(new Platform(x, y, randomWidth));
    }
  }

  // create obstacles
  for (let i = 1; i < platformHeightLevels.length; i++) {
    let y = platformHeightLevels[i] - 40;
    let x = random(100, width - 100);
    obstacles.push(new Obstacle(x, y, 50, 50));
  }

  // create exit
  exit = new Exit(width / 2 - 25, platformHeightLevels[platformHeightLevels.length - 1] - 60, 50, 50);
}

function draw() {
  background(200);

  // draw/update platforms
  for (let platform of platforms) {
    platform.show();
  }

  // draw/update obstacles
  for (let obstacle of obstacles) {
    obstacle.update();
    obstacle.show();
  }

  // draw/check exit
  exit.show();
  if (exit.checkWin(player)) {
    noLoop();
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }

  // draw/update player
  player.update();
  player.show();
}

function keyPressed() {
  if (key === ' ') {
    player.jump();
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.xSpeed = 5;
    this.ySpeed = 0;
    this.onGround = false;
  }

  update() {
    // horizontal movement
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.xSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.xSpeed;
    }

    // gravity
    this.ySpeed += gravity;
    this.onGround = false;

    // check collision with platforms
    for (let platform of platforms) {
      if (
        this.y + this.radius <= platform.y &&
        this.y + this.radius + this.ySpeed >= platform.y &&
        this.x + this.radius > platform.x &&
        this.x - this.radius < platform.x + platform.width
      ) {
        this.ySpeed = 0;
        this.y = platform.y - this.radius;
        this.onGround = true;
      } else if (
        this.y - this.radius < platform.y + platform.height &&
        this.y + this.radius > platform.y &&
        this.x + this.radius > platform.x &&
        this.x - this.radius < platform.x + platform.width
      ) {
        this.ySpeed = gravity; // Apply downward gravity instead of stopping
      }
    }

    this.y += this.ySpeed;

    // prevent player from falling off bottom
    if (this.y > height) {
      this.y = height - this.radius;
      this.ySpeed = 0;
      this.onGround = true;
    }

    // prevent player from going out of bounds
    this.x = constrain(this.x, 0, width);
  }

  jump() {
    if (this.onGround) {
      this.ySpeed = -jumpStrength;
    }
  }

  show() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.radius * 2);
  }
}

class Platform {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 10;
  }

  show() {
    fill(245, 222, 179);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.direction = 1;
  }

  update() {
    this.x += this.direction * obstacleSpeed;
    if (this.x < 0 || this.x + this.width > width) {
      this.direction *= -1;
    }

    // check collision with player
    if (
      player.x + player.radius > this.x &&
      player.x - player.radius < this.x + this.width &&
      player.y + player.radius > this.y &&
      player.y - player.radius < this.y + this.height
    ) {
      // reset player to starting position
      player.x = width / 2;
      player.y = platformHeightLevels[0] - 20;
      player.ySpeed = 0;
    }
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Exit {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  checkWin(player) {
    return (
      player.x + player.radius > this.x &&
      player.x - player.radius < this.x + this.width &&
      player.y + player.radius > this.y &&
      player.y - player.radius < this.y + this.height
    );
  }

  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}
