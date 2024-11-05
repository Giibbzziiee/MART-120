// Variables for moving shapes
let shapeX1 = 50,
  shapeX2 = 350;
let shapeY1 = 50,
  shapeY2 = 350;
let shapeDiagonalX = 100,
  shapeDiagonalY = 100;

let speedX1 = 2,
  speedX2 = 1.5;
let speedY1 = 1.8,
  speedY2 = 2.3;
let speedDiagonal = 2.5;

// Variables for title animation
let titleSize = 20;
let growing = true;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 225, 225);

  // Draw static portrait
  drawStaticPortrait();

  // Moving shapes
  moveShapes();

  // Animate the title
  animateTitle();
}

function moveShapes() {
  // x-axis
  fill(100, 150, 255);
  ellipse(shapeX1, 300, 30);
  shapeX1 = (shapeX1 + speedX1) % width;

  fill(255, 100, 150);
  rect(shapeX2, 250, 20, 20);
  shapeX2 = (shapeX2 + speedX2) % width;

  // y-axis
  fill(150, 255, 100);
  ellipse(100, shapeY1, 30);
  shapeY1 = (shapeY1 + speedY1) % height;

  fill(150, 50, 255);
  rect(300, shapeY2, 20, 20);
  shapeY2 = (shapeY2 + speedY2) % height;

  // diagonal
  fill(255, 200, 50);
  ellipse(shapeDiagonalX, shapeDiagonalY, 40);
  shapeDiagonalX = (shapeDiagonalX + speedDiagonal) % width;
  shapeDiagonalY = (shapeDiagonalY + speedDiagonal) % height;
}

function animateTitle() {
  textSize(titleSize);
  fill(0);
  text("P5 Self Image", 150, 350);

  // animate title size
  if (growing) {
    titleSize += 0.5;
    if (titleSize > 30) growing = false;
  } else {
    titleSize -= 0.5;
    if (titleSize < 20) growing = true;
  }
}

function drawStaticPortrait() {
  // Head
  fill(255, 224, 189);
  ellipse(200, 200, 150, 200);

  // Glasses
  noFill();
  stroke(0);
  strokeWeight(3);
  ellipse(160, 180, 60, 60);
  ellipse(240, 180, 60, 60);
  strokeWeight(4);
  line(190, 180, 210, 180); // Bridge of glasses

  // Eyes
  fill(50);
  ellipse(160, 180, 10, 15);
  ellipse(240, 180, 10, 15);

  // Nose
  noFill();
  strokeWeight(2);
  triangle(200, 190, 210, 240, 190, 240);

  // Mouth
  line(190, 260, 210, 260);

  // Beard
  strokeWeight(1);
  for (let i = 0; i < 100; i++) {
    point(random(160, 230), random(270, 295));
  }

  // Hair
  strokeWeight(2);
  for (let i = 160; i <= 240; i += 10) {
    line(i, 100 - (i % 20), i, 130 + (i % 10));
  }

  // Signature
  textSize(12);
  fill(0);
  text("Ethan Gibson", 300, 390);
}
