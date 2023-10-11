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
  console.log(x1, y1);
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
  for (var k = 0; k < 3; k++) {
    for (var i = 1; i < 4 - k; i++) {
      for (var j = 0; j < 4; j++) {
        moveInto(i, j, i - 1, j);
      }
    }
  }
  advanceGame();
}

function moveDown() {
  for (var k = 0; k < 3; k++) {
    for (var i = 2; i >= k; i--) {
      for (var j = 0; j < 4; j++) {
        moveInto(i, j, i + 1, j);
      }
    }
  }
  advanceGame();
}
function moveLeft() {
  for (var k = 0; k < 3; k++) {
    for (var j = 1; j < 4 - k; j++) {
      for (var i = 0; i < 4; i++) {
        moveInto(i, j, i, j - 1);
      }
    }
  }
  advanceGame();
}

function moveRight() {
  for (var k = 0; k < 3; k++) {
    for (var j = 2; j >= k; j--) {
      for (var i = 0; i < 4; i++) {
        moveInto(i, j, i, j + 1);
      }
    }
  }
  advanceGame();
}

function moveInto(i, j, di, dj) {
  var val = game_board[i][j];
  if (val == 0) return;

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
}

document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    moveLeft();
    e.preventDefault();
  } else if (e.key == "ArrowRight") {
    moveRight();
    e.preventDefault();
  } else if (e.key == "ArrowDown") {
    moveDown();
    e.preventDefault();
  } else if (e.key == "ArrowUp") {
    moveUp();
    e.preventDefault();
  }
});

start_game();
