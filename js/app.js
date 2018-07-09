// Global variables
const popup = document.querySelector('.modal');
let lives = 5;
let gemCount = 0;

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

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 30, 45);
}

// Gems for collection
var Gem = function(x, y) {
    this.sprite = 'images/Gem Blue.png';
    this.x = x;
    this.y = y;
}

Gem.prototype.update = function(dt) {
  // Collect gem
    if (player.x < this.x + 40 &&
        player.x + 101 > this.x &&
        player.y < this.y &&
        player.y + 85 > this.y) {
          allGems.splice(allGems.indexOf(this), 1);
          gemCount++;
          gemCounter();
          winGame();        }
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 50);
}

// Create gem collection counter


// Gems created
let gem1 = new Gem(30, 140);
let gem2 = new Gem(30, 225);
let gem3 = new Gem(30, 308);
let gem4 = new Gem(130, 140);
let gem5 = new Gem(130, 225);
let gem6 = new Gem(130, 308);
let gem7 = new Gem(230, 140);
let gem8 = new Gem(230, 225);
let gem9 = new Gem(230, 308);
let gem10 = new Gem(330, 140);
let gem11 = new Gem(330, 225);
let gem12 = new Gem(330, 308);
let gem13 = new Gem(430, 140);
let gem14 = new Gem(430, 225);
let gem15 = new Gem(430, 308);
let allGems = [gem1, gem2, gem3, gem4, gem5, gem6, gem7,
                gem8, gem9, gem10, gem11, gem12, gem13,
                gem14, gem15];

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

// Gem for score panel
let gem16 = new Gem(360, 530);
let gem = [gem16];


// Other functions

function gameOver() {
    if (lives === 0) {
        let modal = document.createElement('p');
        let modalButton = document.createElement('button');
        modal.innerHTML = '<p><strong>GAME OVER!</strong><br>The bugs killed you too many times!<br> Would you like to try again?</p>';
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

function winGame() {
    if (gemCount === 15) {
        let modal = document.createElement('p');
        let modalButton = document.createElement('button');
        modal.innerHTML = '<p><strong>CONGRATULATIONS, YOU WON!</strong><br>You outsmarted the beetles and collected all the gems! Would you like to play again?</p>';
        modal.classList.add('popup-text');
        modalButton.classList.add('play-button');
        modalButton.textContent = 'Play Again';
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
    allGems = [gem1, gem2, gem3, gem4, gem5, gem6, gem7,
                    gem8, gem9, gem10, gem11, gem12, gem13,
                    gem14, gem15];
    gemCount = 0;
    gemCounter();
    player.reset();
 }

 function gemCounter() {
    let count = document.querySelector('.gems');
    count.textContent = gemCount;
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
