// Define canvas and context variables
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Define spaceship and asteroid variables
let spaceship = { x: 225, y: 450, width: 50, height: 50 };
let asteroids = [];

// Define score variable
let score = 0;

// Define game over variable
let gameOver = false;

// Add event listener for arrow key presses
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp" && spaceship.y > 0) {
    spaceship.y -= 10;
  } else if (event.code === "ArrowDown" && spaceship.y < 450) {
    spaceship.y += 10;
  } else if (event.code === "ArrowLeft" && spaceship.x > 0) {
    spaceship.x -= 10;
  } else if (event.code === "ArrowRight" && spaceship.x < 450) {
    spaceship.x += 10;
  }
});

function setupControls() {
  let keyLeftPressed = false;
  let keyRightPressed = false;
  
  window.addEventListener("keydown", event => {
    switch (event.keyCode) {
      case 37: // Left arrow
        if (!keyLeftPressed) {
          keyLeftPressed = true;
          spaceship.intervalLeft = setInterval(() => {
            spaceship.x -= 5;
          }, 10);
        }
        break;
      case 39: // Right arrow
        if (!keyRightPressed) {
          keyRightPressed = true;
          spaceship.intervalRight = setInterval(() => {
            spaceship.x += 5;
          }, 10);
        }
        break;
    }
  });
  
  window.addEventListener("keyup", event => {
    switch (event.keyCode) {
      case 37: // Left arrow
        keyLeftPressed = false;
        clearInterval(spaceship.intervalLeft);
        break;
      case 39: // Right arrow
        keyRightPressed = false;
        clearInterval(spaceship.intervalRight);
        break;
    }
  });
}



// Add function to create new asteroid
function createAsteroid() {
  if (Math.random() < 0.05) {
    let asteroid = {
      x: Math.random() * canvas.width,
      y: 0,
      radius: 25,
      speed: Math.random() * 5 + 2
    };
    asteroids.push(asteroid);
  }
}


// Add function to draw spaceship
function drawSpaceship() {
  context.fillStyle = "red";
  context.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

// Add function to draw asteroids
function drawAsteroids() {
  context.fillStyle = "gray";
  asteroids.forEach((asteroid) => {
    context.beginPath();
    context.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
    context.fill();
  });
}

// Add function to move asteroids
function moveAsteroids() {
  asteroids.forEach((asteroid) => {
    asteroid.y += 5;
  });
}

// Add function to check for collisions
function checkCollisions() {
  asteroids.forEach((asteroid) => {
    let distance = Math.sqrt(
      (asteroid.x - spaceship.x - spaceship.width / 2) ** 2 +
      (asteroid.y - spaceship.y - spaceship.height / 2) ** 2
      );
      if (distance < asteroid.radius + spaceship.width / 2) {
      gameOver = true;
      }
      });
      }
      
      // Add function to update score
      function updateScore() {
      score += 1;
      document.getElementById("score").textContent = score;
      }
      
      // Add function to reset game
      function resetGame() {
      spaceship = { x: 225, y: 450, width: 50, height: 50 };
      asteroids = [];
      score = 0;
      gameOver = false;
      document.getElementById("score").textContent = score;
      }
      
      // Add function to draw game over message
      function drawGameOver() {
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = "30px Arial";
      context.fillStyle = "red";
      context.textAlign = "center";
      context.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
      }
      
      // Add function to update game
      function update() {
      if (!gameOver) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      createAsteroid();
      drawSpaceship();
      drawAsteroids();
      moveAsteroids();
      checkCollisions();
      if (asteroids.length > 0 && asteroids[0].y > 500) {
      asteroids.shift();
      updateScore();
      }
      } else {
      drawGameOver();
      }
      }
      
      // Add event listener for play button
      document.getElementById("playButton").addEventListener("click", () => {
      resetGame();
      setInterval(update, 30);
      });