// TODO fic double stack bug

let game_board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

let CELLS = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];
for (let i = 0; i < 4; i++) {
  for (let f = 0; f < 4; f++) {
    CELLS[i][f] = document.getElementById(`cell-id-${i}${f}`);
  }
}

let divmod = (q, d) => [Math.floor(q / d), q % d];

function start_game() {
  var pos1 = Math.floor(Math.random() * 16);
  var pos2 = Math.floor(Math.random() * 16);
  while (pos1 == pos2) pos2 = Math.floor(Math.random() * 16);

  var [x1, y1] = divmod(pos1, 4);
  var [x2, y2] = divmod(pos2, 4);

  game_board[x1][y1] = 2;
  game_board[x2][y2] = 2;
  updateBoardVisual();
}

function updateBoardVisual() {
  for (let i = 0; i < 4; i++) {
    for (let f = 0; f < 4; f++) {
      var data = game_board[i][f];
      CELLS[i][f].innerHTML = data == 0 ? "" : data;
    }
  }
}

function generateNew() {
  var val = Math.random() > 0.25 ? 2 : 4;
  while (true) {
    var pos = Math.floor(Math.random() * 16);
    var [x, y] = divmod(pos, 4);
    if (game_board[x][y] == 0) {
      game_board[x][y] = val;
      return;
    }
  }
}

function isBoardFull() {
  for (let i = 0; i < 4; i++) {
    for (let f = 0; f < 4; f++) {
      if (game_board[i][f] == 0) return false;
    }
  }
  return true;
}

function advanceGame() {
  if (!isBoardFull()) generateNew();
  updateBoardVisual();

  if (isGameOver()) alert("you lost");
}

function isGameOver() {
  return false;
  // TODO
}

function moveUp() {
  var didMove = false;
  for (var k = 0; k < 3; k++) {
    for (var i = 1; i < 4 - k; i++) {
      for (var j = 0; j < 4; j++) {
        didMove = moveInto(i, j, i - 1, j) || didMove;
      }
    }
  }
  if (didMove) advanceGame();
}

function moveDown() {
  var didMove = false;
  for (var k = 0; k < 3; k++) {
    for (var i = 2; i >= k; i--) {
      for (var j = 0; j < 4; j++) {
        didMove = moveInto(i, j, i + 1, j) || didMove;
      }
    }
  }
  if (didMove) advanceGame();
}
function moveLeft() {
  var didMove = false;
  for (var k = 0; k < 3; k++) {
    for (var j = 1; j < 4 - k; j++) {
      for (var i = 0; i < 4; i++) {
        didMove = moveInto(i, j, i, j - 1) || didMove;
      }
    }
  }
  if (didMove) advanceGame();
}

function moveRight() {
  var didMove = false;
  for (var k = 0; k < 3; k++) {
    for (var j = 2; j >= k; j--) {
      for (var i = 0; i < 4; i++) {
        didMove = moveInto(i, j, i, j + 1) || didMove;
      }
    }
  }
  if (didMove) advanceGame();
}

function moveInto(i, j, di, dj) {
  var val = game_board[i][j];
  if (val == 0) return false;

  var dVal = game_board[di][dj];
  var moved = false;
  if (dVal == 0) {
    game_board[di][dj] = val;
    moved = true;
  } else if (dVal == val) {
    game_board[di][dj] = val * 2;
    moved = true;
  }
  if (moved) game_board[i][j] = 0;
  return moved;
}

document.addEventListener("keydown", (e) => {
  if (!e.key.startsWith("Arrow")) return;

  e.preventDefault();
  if (e.key == "ArrowLeft") moveLeft();
  else if (e.key == "ArrowRight") moveRight();
  else if (e.key == "ArrowDown") moveDown();
  else if (e.key == "ArrowUp") moveUp();
});

start_game();
