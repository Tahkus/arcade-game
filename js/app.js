// Global variables
const popup = document.querySelector('.modal');
let lives = 5;

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
    // Collision: reset player & remove life
    if (this.x >= player.x - 50 &&
        this.x <= player.x + 50 &&
        this.y >= player.y - 50 &&
        this.y <= player.y + 50) {
          player.reset();
          allLives.pop();
          lives = lives - 1;
          gameOver();
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

// Hearts (lives)
var Life = function(x, y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
}

Life.prototype.update = function(dt) {
  //??
}

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 30, 45);
}

// Enemies & Player created
let enemy1 = new Enemy(-400, 50);
let enemy2 = new Enemy(-350, 130);
let enemy3 = new Enemy(-100, 220);
let enemy4 = new Enemy(-620, 90);
let enemy5 = new Enemy(-500, 170);
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
let player = new Player(200, 400);

// Hearts (lives) created
let life1 = new Life(5, 540);
let life2 = new Life(35, 540);
let life3 = new Life(65, 540);
let life4 = new Life(95, 540);
let life5 = new Life(125, 540);
let allLives = [life1, life2, life3, life4, life5];

// Other functions

function gameOver() {
    if (lives === 0) {
        let modal = document.createElement('p');
        let modalButton = document.createElement('button');
        modal.innerHTML = '<p><strong>Game Over!</strong><br>The bugs killed you too many times!<br> Would you like to try again?</p>';
        modal.classList.add('popup-text');
        modalButton.classList.add('play-button');
        modalButton.textContent = 'Try Again';
        popup.appendChild(modal);
        popup.appendChild(modalButton);
        modalButton.onclick = function(){
          popup.removeChild(modal);
          popup.removeChild(modalButton);
          resetGame();
        }
    }
}
 function resetGame() {
    allLives = [life1, life2, life3, life4, life5];
    lives = 5;
 }

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
