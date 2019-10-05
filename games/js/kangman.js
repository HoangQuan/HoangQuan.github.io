function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ghosts = [];
var gameOver = false;
var score = 0;
var hight_score = 0;
var distance = 400;
var ding;
var ua;
var brick_gift = 1;
var house_gift = 1;
var line_floor = 50;
var x1 = 0;
var x2;
var scrollSpeed = 2;

function preload() {
  ding = loadSound('/games/sounds/games/ding.mp3');
  ua = loadSound('/games/sounds/emotions/ua.mp3');
  bg = loadImage('/games/images/game/background_dinosaur.jpg');
  playImg = loadImage('/games/images/game/background_dinosaur3.png');
  goshImg = loadImage('/games/images/game/p5_play/ghost_standing001.png');
  goshImg2 = loadImage('/games/images/game/car.png');
  bum = loadImage('/games/images/game/bum.png');
  house = loadImage('/games/images/game/house.png');
  small_house = loadImage('/games/images/game/small_house.png');
  brick = loadImage('/games/images/game/brick.png');
  gameOver = false;
  arrow_right_img = loadImage('/games/images/game/arrow_right.png');
  arrow_left_img = loadImage('/games/images/game/arrow_left.png');
  arrow_up_img = loadImage('/games/images/game/arrow_up.png');
  arrow_down_img = loadImage('/games/images/game/arrow_down.png');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  player = new Player();
  ghosts.push(new Ghost());
  arrow_right = new ToolControl(arrow_right_img, 'right', width - 70, height - line_floor - 150);
  arrow_left = new ToolControl(arrow_left_img, 'left', width - 170, height - line_floor - 150);
  tool_brick = new ToolControl(brick, 'brick', width - 120, height - line_floor - 200);
  tool_house = new ToolControl(small_house, 'house', width - 120, height - line_floor - 100);
  gameOver = false;
  x2 = width;
}

function touchStarted() {
  arrow_right.isPressed(mouseX, mouseY);
  arrow_left.isPressed(mouseX, mouseY);
  tool_brick.isPressed(mouseX, mouseY);
  tool_house.isPressed(mouseX, mouseY);

  if (mouseX < width - 200) {
    if (gameOver) {
      ghosts = [];
      gameOver = false;
      score = 0;
      distance = 400;
      brick_gift = 0;
      house_gift = 0;
      loop();
      redraw();
    } else {
      player.jumb();
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    if (gameOver) {
      ghosts = [];
      gameOver = false;
      score = 0;
      distance = 400;
      brick_gift = 0;
      house_gift = 0;
      loop();
      redraw();
    } else {
      player.jumb();
    }
  }

  if (key == 'ArrowRight') {
    player.moveR();
  }

  if (key == 'ArrowLeft') {
    player.moveL();
  }

  if (key == 'ArrowUp') {
    player.img = playImg;
    if (brick_gift > 0 && player.lable == 'brick') brick_gift -= 1;
    if (house_gift > 0 && player.lable == 'house') house_gift -= 1;
    player.lable = 'humman';
    player.jumb();
  }

  if (key == 'ArrowDown') {
    if (brick_gift > 0) {
      player.img = brick;
      player.lable = 'brick';
      brick_gift -= 1;
      setTimeout(function () {
        player.lable = 'humman';
        player.img = playImg;
      }, 3000);
    }

    player.down();
  }

  if (key == 'Shift') {
    if (house_gift > 0) {
      player.img = small_house;
      player.lable = 'house';
      house_gift -= 1;
      setTimeout(function () {
        player.lable = 'humman';
        player.img = playImg;
        player.r = 50;
      }, 3000);
    }

    player.down();
  }
}

function draw() {
  // background(bg);
  image(bg, x1, 0, width, height);
  image(bg, x2, 0, width, height);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width) {
    x1 = width;
  }

  if (x2 < -width) {
    x2 = width;
  } // Navigator


  arrow_right.show();
  arrow_left.show();
  brick_gift > 0 ? tool_brick.show() : tool_brick.hide();
  house_gift > 0 ? tool_house.show() : tool_house.hide();
  textSize(20);
  fill(0);
  score += 1;
  text('Score: ' + score, 5, 30);
  image(brick, width / 2 - 50, 13, 20, 20);
  text(' : ' + brick_gift, width / 2 - 20, 30);
  image(house, width / 2 + 50, 13, 20, 20);
  text(' : ' + house_gift, width / 2 + 80, 30);
  text('Hight Score: ' + hight_score, width - 200, 30);
  tool_house.instruction();
  player.show();
  player.down();
  ram = random(1);

  if (ghosts.length == 0) {
    ghosts.push(new Ghost());
  }

  if (ghosts[ghosts.length - 1].x < width - distance && random(1) < 0.01) {
    ghosts.push(new Ghost());
  }

  if (score > 200) {
    if (score % 2000 < 1) {
      ding.play();
      brick_gift += 1;
      distance -= 20;
    }

    if (score % 5000 < 1) {
      ding.play();
      house_gift += 1;
    }
  }

  for (var i = ghosts.length - 1; i >= 0; i--) {
    ghosts[i].show();
    ghosts[i].move();

    if (player.hit(ghosts[i])) {
      gameOver = true;
      textSize(35);
      ua.play();
      hight_score = hight_score > score ? hight_score : score;
      text('Game Over', width / 2 - 60, height / 2);
      noLoop();
    }
  }

  if (ghosts.length > 60) {
    ghosts.slide(0, 1);
  }
}

var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

    this.r = 50;
    this.x = this.r;
    this.y = height - this.r - line_floor;
    this.vy = 0;
    this.gravity = 1.5; // Suc nang cua vat - Trong luc

    this.img = playImg;
    this.lable = 'humman';
  }

  _createClass(Player, [{
    key: "jumb",
    value: function jumb() {
      if (this.y == height - this.r - line_floor) {
        this.vy = -20;
      }
    }
  }, {
    key: "down",
    value: function down() {
      this.y += this.vy;
      this.vy += this.gravity;
      this.y = constrain(this.y, 0, height - this.r - line_floor);
    }
  }, {
    key: "moveR",
    value: function moveR() {
      if (this.x <= this.r) {
        this.x += this.r;
      }
    }
  }, {
    key: "moveL",
    value: function moveL() {
      if (this.x >= this.r) this.x -= this.r;
    }
  }, {
    key: "show",
    value: function show() {
      // fill(111);
      image(this.img, this.x, this.y, this.r, this.r); // animation(ghost, this.x, this.y);
    }
  }, {
    key: "hit",
    value: function hit(ghost) {
      var px = this.x;
      var py = this.y;
      var gx = ghost.x;
      var gy = ghost.y;
      var hit = collideCircleCircle(px, py, this.r, gx, gy, 50);

      if (hit) {
        if (this.lable == 'humman' || this.lable == ghost.lable) {
          return true;
        }

        if (this.lable == 'brick' && ghost.lable == 'car') {
          ghost.y += this.r;
          return false;
        }

        if (this.lable == 'house' && ghost.lable == 'brick') {
          this.img = house;
          this.r += 20;
          return false;
        }

        return true;
      }
    }
  }]);

  return Player;
}();

var Ghost =
/*#__PURE__*/
function () {
  function Ghost() {
    _classCallCheck(this, Ghost);

    var ghostImgs = [brick, goshImg2];
    this.r = 60;
    this.x = width;
    var g = goshImg2;
    if (score > 2000) g = ghostImgs[floor(random(ghostImgs.length))];

    if (g == brick) {
      this.y = 0;
      this.lable = 'brick';
      this.speed = 12;
      var max = width,
          min = width - 200;
      this.x = Math.floor(Math.random() * (max - min)) + min;
    } else {
      this.lable = 'car';
      this.speed = 10;
      this.y = height - this.r - line_floor;
    }

    this.img = g;
  }

  _createClass(Ghost, [{
    key: "move",
    value: function move() {
      this.x -= this.speed;

      if (this.img == brick) {
        this.y += (height - line_floor) / (width / this.speed);
      }
    }
  }, {
    key: "show",
    value: function show() {
      image(this.img, this.x, this.y, 50, this.r);
    }
  }]);

  return Ghost;
}();

var ToolControl =
/*#__PURE__*/
function () {
  function ToolControl(img, lable, x, y) {
    _classCallCheck(this, ToolControl);

    this.img = img;
    this.r = 50;
    this.x = x;
    this.y = y;
    this.ry = y;
    this.lable = lable;
  }

  _createClass(ToolControl, [{
    key: "isPressed",
    value: function isPressed(mx, my) {
      var pressed = mx > this.x && mx < this.x + this.r && my > this.y && my < this.y + this.r;

      if (pressed) {
        if (this.lable == 'right') {
          player.moveR();
        }

        if (this.lable == 'left') {
          player.moveL();
        }

        if (this.lable == 'brick') {
          if (brick_gift > 0) {
            player.img = brick;
            player.lable = 'brick';
            brick_gift -= 1;
            setTimeout(function () {
              player.lable = 'humman';
              player.img = playImg;
            }, 3000);
          }
        }

        if (this.lable == 'house') {
          if (house_gift > 0) {
            player.img = small_house;
            house_gift -= 1;
            player.lable = 'house';
            setTimeout(function () {
              player.lable = 'humman';
              player.img = playImg;
              player.r = 50;
            }, 3000);
          }
        }
      }
    }
  }, {
    key: "show",
    value: function show() {
      image(this.img, this.x, this.ry, this.r, this.r);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.y = height + 10;
    }
  }, {
    key: "instruction",
    value: function instruction() {
      fill(255);
      textSize(25);
      text('Instructions:', 5, height / 2 - 80);
      textSize(17);
      text('Jumb: Mouse Press (or space press)', 5, height / 2 - 60);
      text('Tranfer to Brick: Arrow Down', 5, height / 2 - 40);
      text('Tranfer to House: Shift', 5, height / 2 - 20); // text('Kangman vs Car: Car win!!', 5, height/2);
      // text('Kangman vs Brick: Brick win!!', 5, height/2 + 20);
      // text('Brick vs Car: Brick win!!', 5, height/2 + 40);
      // text('House vs Car: House win!!', 5, height/2 + 60);
    }
  }]);

  return ToolControl;
}();
