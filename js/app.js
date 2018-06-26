// Enemy class
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * Math.floor(300));
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Set speed of enemy movement
    this.x = this.x + this.speed * dt;
    // Reset enemy position if moved off canvas
    if (this.x > 600) {
      this.x = -100;
      this.x = this.x + this.speed * dt;
    }
    // Collision
    if (this.x >= player.x - 50 &&
        this.x <= player.x + 50 &&
        this.y >= player.y - 50 &&
        this.y <= player.y + 50) {
          player.reset();
        }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
}

Player.prototype.update = function(dt) {
    // ??
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(allowedKeys) {
  switch(allowedKeys) {
    case 'left':
      if (this.x > 0) {
        this.x = this.x - 101;
      }
      break;
    case 'up':
      if (this.y > 0) {
        this.y = this.y - 85;
      }
      break;
    case 'right':
      if (this.x < 400) {
        this.x = this.x + 101;
      }
      break;
    case 'down':
      if (this.y < 400) {
        this.y = this.y + 85;
      }
      break;
  }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(-400, 50);
let enemy2 = new Enemy(-350, 130);
let enemy3 = new Enemy(-100, 220);
let enemy4 = new Enemy(-620, 90);
let enemy5 = new Enemy(-500, 170);
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
let player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
