// Visualizery thingy

var origin;

var frame = 0;
var flyBoxCount = 20;
var flyBoxes = [];
var flyBoxPause = 200;
var flyBoxColors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  origin = createVector(windowWidth/2, windowHeight/2);
  
  for(i = -flyBoxCount/2; i < flyBoxCount/2; i++) {
    var box = createFlyBox(i);
    box.start();
    flyBoxes.push(box);
  }
  
  var getRandColor = () => {
    return color(random(100, 200), random(100, 200), random(100, 200));
  }

  flyBoxColors.push(color('#f2623a'));
  flyBoxColors.push(color('#3af262'));
  flyBoxColors.push(color('#623af2'));
  flyBoxColors.push(color('#f23a58'));
  flyBoxColors.push(color('#caf23a'));
}

function draw() {
  rectMode(CENTER);
  for(i = 0; i < flyBoxCount; i++) {
    var flyBox = flyBoxes[i];
    flyBox.draw();
  }
  
  // WIP
  stroke(0, 0, 0);
  strokeWeight(40);
  noFill();
  translate(origin.x, origin.y);
  rotate((sin(frame*0.02) + cos(frame*0.03))*PI);
  //rect(0, 0, 300, 300);
  
  frame += 1;
}

function createFlyBox(offset) {
  return {
    offset: offset,
    delay: 0,
    getRandomDelay: () => { return random(0, flyBoxCount) * 15; },
    steps: 0,
    directions: [createVector(-1, -1), createVector(-1, 1), createVector(1, -1), createVector(1, 1)],
    currentDirection: 0,
    iteration: 0,
    size: 80,
    start: function() {
      this.delay = this.getRandomDelay();
      this.steps = -this.delay;
    },
    draw: function() {
      this.steps += 20;
      
      if(this.steps < 0) {
        return;
      }
      
      fill(flyBoxColors[this.iteration]);
      noStroke();
      var dir = this.directions[this.currentDirection];
      rect(
        -dir.x*this.steps + origin.x + dir.x*origin.x - dir.x*this.offset * (this.size*0.75),
        -dir.y*this.steps + origin.y + dir.y*origin.y + dir.y*this.offset * (this.size*0.75),
        this.size, this.size);
      
      if(this.steps > max(windowWidth, windowHeight)) {
        var newDelay = this.getRandomDelay();
        this.steps = -flyBoxPause + this.delay - newDelay;
        this.delay = newDelay;
        this.currentDirection = (this.currentDirection + 1) % 4;
        this.iteration = (this.iteration + 1) % flyBoxColors.length;
      }
    }
  }
}