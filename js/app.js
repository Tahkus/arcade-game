"use strict";

// Global variables
const popup = document.querySelector('.modal');

// Superclass of character
class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Enemy subclass
class Enemy extends Character {
    constructor(x, y, sprite = 'images/enemy-bug.png') {
        super(x, y);
        this.sprite = sprite;
        this.speed = Math.floor(Math.random() * Math.floor(300));
    }
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
    //Collision: reset player & remove life
    if (this.x < player.x + 80 &&
        this.x + 80 > player.x &&
        this.y < player.y + 70 &&
        this.y + 70 > player.y) {
            player.reset();
            allLives.pop();
            player.lives = player.lives - 1;
            gameOver();

    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player subclass
class Player extends Character {
    constructor(x, y, sprite = 'images/char-horn-girl.png') {
        super(x, y);
        this.lives = 5;
        this.gemCount = 0;
        this.sprite = sprite;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Add movement controls for player
Player.prototype.handleInput = function(allowedKeys) {
  switch(allowedKeys) {
    case 'left':
      if (this.x > 0) {
        this.x = this.x - 101;
        this.drown();
      }
      break;
    case 'up':
      if (this.y > 0) {
        this.y = this.y - 85;
        this.drown();
      }
      break;
    case 'right':
      if (this.x < 400) {
        this.x = this.x + 101;
        this.drown();
      }
      break;
    case 'down':
      if (this.y < 400) {
        this.y = this.y + 85;
        this.drown();
      }
      break;
  }
};

// Reset position of player 
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Player drowns if enters the water
Player.prototype.drown = function() {
    if (this.y < 50) {
        setTimeout (() => {
            this.reset();
            allLives.pop();
            this.lives = this.lives - 1;
            gameOver();
        }, 500);
    }
};

// Hearts (lives) subclass
class Life extends Character {
    constructor(x, y, sprite = 'images/Heart.png') {
        super(x, y);
        this.sprite = sprite;
    }
};

// Draw lives on screen
Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 30, 45);
};

// Gems for collection subclass
class Gem extends Character {
    constructor(x, y, sprite = 'images/Gem Blue.png') {
        super(x, y);
        this.sprite = sprite;
    }
};

// Update gems when collected by player
Gem.prototype.update = function() {
    if (player.x < this.x + 40 &&
        player.x + 101 > this.x &&
        player.y < this.y &&
        player.y + 85 > this.y) {
            allGems.splice(allGems.indexOf(this), 1);
            player.gemCount++;
            gemCounter();
            winGame();        }
};

// Draw gems on screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 50);
};

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

// Gem for score panel created
let gem16 = new Gem(360, 530);
let gem = [gem16];


// OTHER FUNCTION

// Game over 
function gameOver() {
    if (player.lives === 0) {
        let modal = document.createElement('p');
        let modalButton = document.createElement('button');
        modal.innerHTML = '<p><strong>GAME OVER!</strong><br>The bugs killed you too many times, or you drowned in the water!<br> Would you like to try again?</p>';
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
};

// Winning game 
function winGame() {
    if (player.gemCount === 15) {
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
};

// Reset the game 
function resetGame() {
    allLives = [life1, life2, life3, life4, life5];
    player.lives = 5;
    allGems = [gem1, gem2, gem3, gem4, gem5, gem6, gem7, gem8, 
              gem9, gem10, gem11, gem12, gem13, gem14, gem15];
    player.gemCount = 0;
    gemCounter();
    player.reset();
};

// Changes gem count text
function gemCounter() {
    let count = document.querySelector('.gems');
    count.textContent = player.gemCount;
};

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
