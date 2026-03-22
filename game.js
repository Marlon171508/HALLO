// ========================
// DR. BOUNCE GAME
// ========================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// -------------------------
// DOM Elements
// -------------------------
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreText = document.getElementById("scoreText");
const highScoreText = document.getElementById("highScoreText");

// -------------------------
// Game Variables
// -------------------------
let player = { x: 50, y: canvas.height - 60, width: 40, height: 40, dy: 0 };
let gravity = 0.7;
let jumpForce = -12;
let obstacles = [];
let obstacleInterval = 1500;
let lastObstacleTime = 0;
let score = 0;
let highScore = localStorage.getItem("drBounceHighscore") || 0;
let gameSpeed = 3;
let gameRunning = false;

// Colors
const playerColor = "#ff6b6b";
const obstacleColor = "#1e90ff";

// -------------------------
// Event Listeners
// -------------------------
document.addEventListener("keydown", e => {
    if (e.code === "Space") jump();
});

canvas.addEventListener("click", jump);

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

// -------------------------
// Functions
// -------------------------
function startGame() {
    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    player.y = canvas.height - 60;
    player.dy = 0;
    obstacles = [];
    score = 0;
    gameSpeed = 3;
    obstacleInterval = 1500;
    lastObstacleTime = 0;
    gameRunning = true;
    requestAnimationFrame(gameLoop);
}

function jump() {
    if (player.y >= canvas.height - player.height) {
        player.dy = jumpForce;
    }
}

function createObstacle() {
    const height = 30 + Math.random() * 40;
    obstacles.push({ x: canvas.width, y: canvas.height - height, width: 20 + Math.random()*30, height: height });
}

function updateObstacles(deltaTime) {
    // create obstacles over time
    if (Date.now() - lastObstacleTime > obstacleInterval) {
        createObstacle();
        lastObstacleTime = Date.now();
    }

    for (let i = obstacles.length -1; i >=0; i--) {
        obstacles[i].x -= gameSpeed;
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i,1);
            score++;
            // increase difficulty gradually
            if(score % 5 === 0) gameSpeed += 0.2;
            if(score % 10 === 0 && obstacleInterval > 700) obstacleInterval -= 50;
        }
    }
}

function checkCollision() {
    for (let obs of obstacles) {
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
        ) {
            gameOver();
        }
    }
}

function gameOver() {
    gameRunning = false;
    scoreText.textContent = `Score: ${score}`;
    if(score > highScore){
        highScore = score;
        localStorage.setItem("drBounceHighscore", highScore);
    }
    highScoreText.textContent = `Highscore: ${highScore}`;
    gameOverScreen.style.display = "flex";
}

function updatePlayer() {
    player.dy += gravity;
    player.y += player.dy;

    if(player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
    }
}

function drawPlayer() {
    ctx.fillStyle = playerColor;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = obstacleColor;
    for(let obs of obstacles){
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }
}

function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 25);
    ctx.fillText(`Highscore: ${highScore}`, 10, 50);
}

let lastTime = 0;
function gameLoop(timestamp) {
    if(!gameRunning) return;

    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    updatePlayer();
    updateObstacles(deltaTime);
    checkCollision();

    drawPlayer();
    drawObstacles();
    drawScore();

    requestAnimationFrame(gameLoop);
}
