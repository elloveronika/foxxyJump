//calling on the canvas from the html file by the element
const canvas = document.querySelector("canvas");

//here we are saying that we are creating a 2d animation
const ctx = canvas.getContext("2d");
//here we are accessing the entire width of the window you dont need the window property to call it
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//this is a global gravity,, gravity is an acceleration to our velocity y axis
const gravity = 0.5;

//using class to define a player
//whenever we create a player this player method will fire off
class Player {
  constructor() {
    //these are properties on the x and y axis position
    this.position = {
      x: 100,
      y: 100,
    };
    // the measurement that will move our player around
    //the y velocity will be pushing our player down
    this.velocity = {
      x: 0,
      y: 0,
    };
    //we need a width and height in order to create a square
    this.width = 30;
    this.height = 30;
  }
  //an arbitrary method, this is where we will draw out our player
  draw() {
    ctx.fillStyle = "purple";
    //we are defining what our player is actually going to look like
    //we are calling our canvas method fillrect, we are referncing the above positionto fill in
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
class Platform {
  constructor() {
    this.position = {
      x: 400,
      y: 400,
    };
    this.width = 200;
    this.height = 20;
  }
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

//here we implement a new player
const player = new Player();
const platform = new Platform();
//here we calll the draw method on the player
player.update();

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  //calling this recursive loop so it can keep calling animate over and over again over time
  requestAnimationFrame(animate);
  //clears the trailing of the player by clearing as the player scrolls
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update();
  platform.draw();

  keys.right.pressed ? (player.position.x += 5) : (player.velocity.x = 0);
  keys.left.pressed ? (player.velocity.x = -5) : (player.velocity.x = 0);

  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >= platform.position.y
  ) {
    player.velocity.y = 0;
  }else{
    
  }
}
animate();

window.addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("a: left");
      keys.left.pressed = true;
      break;
    case 87:
      console.log("w: up");
      player.position.y -= 400;
      break;
    case 83:
      console.log("s: down");
      break;
    case 68:
      console.log("d: right");
      keys.right.pressed = true;
      break;
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  // console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("a: left");
      keys.left.pressed = false;
      break;
    case 87:
      console.log("w: up");
      break;
    case 83:
      console.log("s: down");
      break;
    case 68:
      console.log("d: right");
      keys.right.pressed = false;
      break;
  }
});
