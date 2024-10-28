function setup() {
  createCanvas(400, 400);
  background(0,225,225);

  // head
  fill(255, 224, 189);
  ellipse(200, 200, 150, 200);
  
  // glasses
  noFill();
  stroke(0);
  strokeWeight(3);
  ellipse(160, 180, 60, 60); 
  ellipse(240, 180, 60, 60); 
  
  strokeWeight(4);
  line(160 + 30, 180, 240 - 30, 180); // bridge of glasses

  // eyes
  fill(50);
  ellipse(160, 180, 10, 15); 
  ellipse(240, 180, 10, 15);
  
  // nose
  noFill();
  strokeWeight(2);
  triangle(200, 190, 210, 240, 190, 240);

  // mouth
  line(190, 260, 210, 260);

  // beard
  strokeWeight(1);
  for (let i = 0; i < 100; i++) {
    let x = random(160, 230);
    let y = random(270, 295);
    point(x, y);
  }

  // hair
  strokeWeight(2);
  line(160, 100, 160, 140);
  line(170, 100, 170, 130);
  line(180, 95, 180, 125); 
  line(190, 90, 190, 120); 
  line(200, 85, 200, 115); 
  line(210, 85, 210, 115); 
  line(220, 90, 220, 120); 
  line(230, 95, 230, 125); 
  line(240, 100, 240, 130); 
  line(250, 105, 250, 135); 
  line(150, 110, 160, 160);
  line(250, 110, 260, 160);
  
  // title/signature
  textSize(20);
  fill(0);
  text('P5 Self Image', 150, 350);
  textSize(12);
  text('Ethan Gibson', 300, 390);
}

function draw() {
  }
