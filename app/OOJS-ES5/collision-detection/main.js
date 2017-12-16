/**
 * Created by mahme4 on 12/13/2017.
 */

(function () {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d'); // context is like the paper

  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;

// function to generate random number
  function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
  }

  function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  function getRandomColor() {
    return 'rgb('+ random(0,255) + ',' + random(0,255) + ',' + random(0, 255) + ')';
  }

  Ball.prototype.draw = function () {
    ctx.beginPath(); // to state that we want to draw a shape on the paper.
    ctx.fillStyle = this.color; // define what color we want the shape to be

    // x, y position of the arc
    // radius of the arc
    // start and end in radians; 0 to 360 degree
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill(); // finish drawing the path we startted with begin path
  };

  Ball.prototype.update = function () {
    // check whether the x coordinate is greater than the width o the canvas
    if( (this.x + this.size) >= width ){
      this.velX = -(this.velX);
    }
    // check whether the x coordinate is smaller than 0
    if( (this.x - this.size) < 0 ){
      this.velX = -(this.velX);
    }
    // check to see whether the y coordinate is greater than the height of the canvas
    if( (this.y + this.size ) >= height) {
      this.velY = -(this.velY);
    }
    // check to see whether the y coordinate issmller than 0
    if( (this.y - this.size) < 0 ){
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;

  };


  Ball.prototype.collisionDetect = function (nextIndex) {
    if( nextIndex < ballList.length ){
      var dx = this.x - ballList[nextIndex].x;
      var dy = this.y - ballList[nextIndex].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if( distance < this.size + ballList[nextIndex].size ){
        this.color = getRandomColor();
        ballList[nextIndex].color = getRandomColor();
      }
    }
  };

  var ballList = [];

// render the result view on each frame od the animation

  function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);
    while( ballList.length < 25){
      var ball = new Ball(
        random(20, width - 20),
        random(20, height - 20),
        random(-5, 5),
        random(-5, 5),
        getRandomColor(),
        random(10, 20)
      );
      ballList.push(ball);
    }

    ballList.sort(function (a, b) {
      var dx = a.x - b.x;
      var dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    });

    for( var j = 0; j < ballList.length; j++ ){
      ballList[j].collisionDetect(j+1);
      ballList[j].update();
      ballList[j].draw();
    }

    // run the loop method a set number of times per second to create a smooth animation
    requestAnimationFrame(loop);
  }
  loop();
})();