let canvas = document.getElementById("game-canvas");
let ctx = canvas.getContext("2d");
let scoreBoard = document.getElementById("score-board");

let score = 0;
scoreBoard.innerHTML = "SCORE: " + score;


let food = {
  x: 400,
  y: canvas.height - 200,
};

let nodeSize = 15;
let snake = {
  x: canvas.width * 0.5,
  y: canvas.height * 0.5,
};

let snakeNodes = [snake] 
snakeNodes.push({x: snake.x - nodeSize, y: snake.y})

let snakeSpeed = 2;
let snakeDirection = "right";

document.body.onkeyup = function (e) {
  switch (e.code) {
    case "ArrowLeft":
      snakeDirection = (snakeDirection !== "right")? "left" : "right";
      break;
    case "ArrowUp":
      snakeDirection = (snakeDirection !== "down")? "up" : "down";
      break;
    case "ArrowRight":
      snakeDirection = (snakeDirection !== "left")? "right" : "left";
      break;
    case "ArrowDown":
      snakeDirection = (snakeDirection !== "up")? "down" : "up";
      break;
    case "Space":
      growSnake();
      break;
  }
};
function spawnFood() {
  food.x = Math.random() * canvas.width;
  food.y = Math.random() * canvas.height;
}

function eatFoodCheck() {
  if (
    snakeNodes[0].x > food.x - nodeSize &&
    snakeNodes[0].x < food.x + nodeSize &&
    snakeNodes[0].y > food.y - nodeSize &&
    snakeNodes[0].y < food.y + nodeSize
  ) {
    growSnake();
    spawnFood();
    score += 1;
    scoreBoard.innerHTML = "SCORE: " + score;
  }
}

function collisionCheck() {
  //TODO
}

function growSnake() {
  lastNode = snakeNodes[snakeNodes.length-1]

  switch (snakeDirection) {
    case "left":
      snakeNodes.push({x: lastNode.x + nodeSize, y: lastNode.y})
      break;
    case "up":
      snakeNodes.push({x: lastNode.x, y: lastNode.y + nodeSize})
      break;
    case "right":
      snakeNodes.push({x: lastNode.x - nodeSize, y: lastNode.y})
      break;
    case "down":
      snakeNodes.push({x: lastNode.x, y: lastNode.y - nodeSize})
      break;
    default:
      break;
  }
}


function checkBoundaries(currentNode) {
  if (currentNode.x < 0) {
    currentNode.x = canvas.width;
  }
  if (currentNode.x > canvas.width) {
    currentNode.x = 0;
  }
  if (currentNode.y < 0) {
    currentNode.y = canvas.height;
  }
  if (currentNode.y > canvas.height) {
    currentNode.y = 0;
  }

  return [currentNode.x ,currentNode.y]
}
function moveSnake() {
  let tempSnake = [];
  for (let i = 0; i < snakeNodes.length; i++) {
    tempSnake[i] = {x: snakeNodes[i].x, y: snakeNodes[i].y}
  }
  for (let i = tempSnake.length - 1; i > 0; i--) {
    tempSnake[i].x = tempSnake[i-1].x;
    tempSnake[i].y = tempSnake[i-1].y;
  }
  switch (snakeDirection) {
    case "left":
      tempSnake[0].x = (tempSnake[0].x - snakeSpeed + canvas.width) % canvas.width;
      break;
    case "up":
      tempSnake[0].y = (tempSnake[0].y - snakeSpeed + canvas.height) % canvas.height;
      break;
    case "right":
      tempSnake[0].x = (tempSnake[0].x + snakeSpeed) % canvas.width;
      break;
    case "down":
      tempSnake[0].y = (tempSnake[0].y + snakeSpeed) % canvas.height;
      break;
    default:
      break;
  }
  snakeNodes = tempSnake;
}


function moveArr(arr) {
  firstNode = arr[0];
  arr[arr.length - 1] = arr[arr.length - 2];

  firstNode -= 1;

  arr.pop();
  arr = [firstNode, ...arr];
  return arr
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  snakeNodes.forEach( node => {
    ctx.fillRect(node.x, node.y, nodeSize, nodeSize)
  })

  ctx.fillRect(food.x, food.y, nodeSize, nodeSize)
}

function loop() {
  moveSnake();
  eatFoodCheck();
  draw()
  requestAnimationFrame(loop);
}
spawnFood();
loop();
