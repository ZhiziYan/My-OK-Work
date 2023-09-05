
//let lightSize = 300;
let music, introMusic, sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9;
let rCol=50;
let gCol=50;
let bCol=50;

let rectImg, triImg, rectX, rectY, triX, triY;
let rectScore = 0, triScore = 0;
let valR, valG, valB;
let ellipses = [];
let step = 100;
let neonColor;
let lastColorChange = 0;
let colorChangeInterval = 3000; // Change color every 3 seconds
let targetColor;
let lerpAmount = 0;

function preload() {
  /////////////////////////////////HERE TO CHANGE IMAGE /////////////////
  rectImg = loadImage('img/Neto1.png');
  triImg = loadImage('img/Neto2.png');
  //soundFormats('wav');
  introMusic = loadSound('sounds/start.wav');
  music = loadSound('sounds/bgm.wav');
  sound1 = loadSound("sounds/ahhh.wav");
  sound2 = loadSound("sounds/bop.flac");
  sound3 = loadSound("sounds/bounce.wav");
  sound4 = loadSound("sounds/dudu.mp3");
  sound5 = loadSound("sounds/hee.wav");
  sound6 = loadSound("sounds/huh.wav");
  sound7 = loadSound("sounds/jump.wav");
  sound8 = loadSound("sounds/pewpew.wav");
  sound9 = loadSound("sounds/uhm.mp3");
}


function setup() {
  createCanvas(displayWidth, displayHeight);
  rectX = width / 2;
  rectY = height / 2;
  triX = width / 2;
  triY = height / 2;
  //music
  introMusic.play();
  introMusic.onended(() => {
    music.loop();
    music.setVolume(0.5);
  });
  //visual
  neonColor = color(0, 255, 255);
  targetColor = color(random(255), random(255), random(255));
  for (let i = 0; i < 5; i++) { /////////////////////////////HERE TO ADD BALLS!!!
    ellipses.push(createVector(random(width), random(height)));
  }
}

function draw() {
    background(0);
    noStroke();
    fill(rCol,gCol,bCol,1);
    //ellipse(width / 2, height / 2, lightSize);
  
    // Get the current music amplitude
    let musicAmp = music.getLevel();
    
    // Map the amplitude value to the range of light sizes you want to use
    let lightSize = map(musicAmp, 0, 1, 50, 500);
    
    // Check if it's time to change the grid color
    
   
    // Check if it's time to change the grid color
    if (millis() - lastColorChange > colorChangeInterval) {
      neonColor = color(random(255), random(255), random(255));
      lastColorChange = millis();
    }
    if (frameCount % (3 * 60) == 0) {
      targetColor = color(random(255), random(255), random(255));
    }
    // Lerp between current color and target color
    lerpAmount += 0.05;
    if (lerpAmount > 1) {
      lerpAmount = 0;
      neonColor = targetColor;
    }
    neonColor = lerpColor(neonColor, targetColor, lerpAmount);
    
    // Draw the glowing grid with moving stroke
    let maxDist = dist(width / 2, height / 2, width, height);
    for (let i = -frameCount; i <= width + frameCount; i += step) {
      for (let l = -frameCount; l <= height + frameCount; l += step) {
        let d = dist(i, l, width / 2, height / 2);
        let alpha = map(d, 0, maxDist, 255, 0);
        stroke(neonColor.levels[0], neonColor.levels[1], neonColor.levels[2], alpha);
        strokeWeight(5);
        if (i + step <= width) {
          line(i, l, i + step, l);
        }
        if (l + step <= height) {
          line(i, l, i, l + step);
        }
      }
    }
  // Draw the light circle with the updated size
  fill(0, 255, 255);
  ellipse(width / 2, height / 2, lightSize);


  //  //rect
  // fill(255, 0, 0); // red
  // stroke(0);
  // strokeWeight(0);
  // rect(rectX, rectY, 100, 100);
  // //tri
  // fill(0, 0, 255);
  // // stroke(0, 0, 255);
  // // strokeWeight(5);
  // triangle(triX - 50, triY + 50, triX + 50, triY + 50, triX, triY - 50);
  imageMode(CENTER);
  // display the rectangle image at rectX, rectY with width and height of 100
  image(rectImg, rectX + 100, rectY, 100, 100);
  // display the triangle image at triX, triY with width and height of 100
  image(triImg, triX - 100, triY , 100, 100);
  

  //ellipses
  fill('yellow');
  for (let i = ellipses.length - 1; i >= 0; i--) {
    const e = ellipses[i];
    ellipse(e.x, e.y, 20);
    e.x += random(-5, 5);
    e.y += random(-5, 5);
    if (dist(e.x, e.y, triX, triY) < 50) {
      triScore++;
      ellipses.splice(i, 1);
    } else if (dist(e.x, e.y, rectX, rectY) < 50) {
      rectScore++;
      ellipses.splice(i, 1);
    }
  }
  // check if all yellow ellipses are eaten
if (ellipses.length === 0) {
  let quote;
  if (triScore > rectScore) {
    quote = "Player 1 has eaten the most coins! Player 1 WINS!!";
  } else if (rectScore > triScore) {
    quote = "Player 2 has eaten the most coins! Player 2 WINS!!";
  } else {
    quote = "It's a tie! Both players have eaten the same number of ellipses.";
  }
  // display the quote on the canvas
  textSize(60);
  textAlign(CENTER);
  fill(255);
  text(quote, width/2, height/2);
}
  // Display score counters
  textSize(30);
  // textAlign(CENTER);
  /////////////////////////////////HERE TO CHANGE PLAYER NAMES /////////////////
  fill('blue');
  text(`SLEEPING NETO: ${triScore}`, 600, 40);
  fill('red');
  text(`HANSOME NETO: ${rectScore}`, 900, 40);

  // Update shape positions with arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    rectX -= 5;
    if (!sound9.isPlaying()) {
      sound9.play();
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    rectX += 5;
    if (!sound2.isPlaying()) {
      sound2.play();
    }
  } else if (keyIsDown(UP_ARROW)) {
    rectY -= 5;
    if (!sound3.isPlaying()) {
      sound3.play();
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    rectY += 5;
    if (!sound4.isPlaying()) {
      sound4.play();
    }
  }
  
  if (keyIsDown(65)) {
    triX -= 5;
    if (!sound5.isPlaying()) {
      sound5.play();
    }
  } else if (keyIsDown(68)) {
    triX += 5;
    if (!sound6.isPlaying()) {
      sound6.play();
    }
  } else if (keyIsDown(87)) {
    triY -= 5;
    if (!sound7.isPlaying()) {
      sound7.play();
    }
  } else if (keyIsDown(83)) {
    triY += 5;
    if (!sound8.isPlaying()) {
      sound8.play();
    }
  }
  
 
}
/////////////////////////////////PRESS SPACE BAR TO MUTE /////////////////
function keyPressed() {
  if (keyCode === 32) { // spacebar
    if (music.isPlaying()) {
      music.pause();
    } else {
      music.loop();
    }
  }
}