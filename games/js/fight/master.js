var player;
var w = window.innerWidth;
var h = window.innerHeight;
var bullets = [];
var ants = [];
var plus = [];


var hamburger_img;
var plus_img;

var maxAnt = 4;
// Game setup
var distance = 20;
var target;

// PoseNet setup
var video;
var flipVideo;
var poseNet;
var poses;
var ready = false;
var gameOver = false;

var wepon_status = 'fighted';
var bg;

// Sound
var eat_plus_s, gun_shot_s;

function preload() {
	hamburger_img = loadImage('/games/images/game/fight/hamburger.png');
	bullet_img = loadImage('/games/images/game/fight/bullet.png');
	tank_img = loadImage('/games/images/game/fight/tank.png');
	ant_img = loadImage('/games/images/game/fight/ant.png');
	red_ant_img = loadImage('/games/images/game/fight/ant2.png');
	bg = loadImage('/games/images/game/fight/background.jpg');
	plus_img = loadImage('/games/images/game/fight/plus.png');
	hplus_img = loadImage('/games/images/game/fight/hplus.png');
	eat_plus_s = loadSound('/games/sounds/games/fight/eat_plus.mp3');
	gun_shot_s = loadSound('/games/sounds/games/fight/gun_shot.mp3');
}

function setup() {
	createCanvas(w, h);
	player = new Player();
	ant = new Ant(0, 30, w, 30);
	hamburger = new Hamburger(hamburger_img, w/2, h-160, 60);

	// video = createCapture(VIDEO);
	// video.size(w, h);
	// video.hide();

	// flipVideo = ml5.flipImage(video);
	// poseNet = ml5.poseNet(video, {flipHorizontal: true, imageScaleFactor: 0.1}, modelReady());

	// poseNet.on('pose', function(results) {
	// 	ready = true;
	// 	poses = results;
	// });
}

function modelReady() {
	console.log('Model Ready');
}

function draw() {
	// background(255);
	image(bg, 0, 0, w, h);
	// flipVideo = ml5.flipImage(video);
	push();
	fill(255);
	textSize(20);
	text('Level: ' + player.level, 30, 40);
	text('Point: ' + player.point, 30, 70);
	pop();
    // image(flipVideo, w-100, h-100 , 70, 70)

    if(!hamburger.isAlive() || player.dead()) {
    	push();
    	textAlign(CENTER, CENTER);
    	fill(255);
    	textSize(50);
    	text("Game Over", w/2, 100);
    	pop();
    	$("#menu").show();
    	ready = false;
    	gameOver = true;
    }
	if(ready) {
		hamburger.show();

		// drawAndFight(poses);

		player.show();
		player.move(mouseX, mouseY);

		maxAnt = player.level * maxAnt;
		distance = distance - player.level;


		if(ants.length == 0 || ((ants[ants.length - 1].x < width - distance) && random(1) < 0.01*player.level && ants.length <= maxAnt)) {
			var  ran = [0, w][Math.floor(Math.random()*2)];
			
			if(player.level < 5) {
				ants.push(new Ant(ran, random(h-30), hamburger.x + hamburger.w/2, hamburger.y + hamburger.w/2, 'Ant'));
			} else {
				if(random(1) > 0.5) {
					ants.push(new Ant(ran, random(h-30), hamburger.x + hamburger.w/2, hamburger.y + hamburger.w/2, 'Ant'));
				} else {
					ants.push(new Ant(ran, random(h-30), player.x, player.y, 'RedAnt'));
				}
			}

		}

		// player.move();
		// console.log("bullets: ", bullets.length)
		// console.log("ants: ", ants.length)
		if(bullets.length > 0) {
			for (var i = 0; i < bullets.length; i++) {
				bullets[i].move();
				if (bullets[i].hit() || bullets[i].outOfscreen()) {
					bullets.splice(i, 1);
				}
			}
		}

		if(plus.length > 0) {
			for (var i = 0; i < plus.length; i++) {
				plus[i].show();
			}
		}

		if(ants.length > 0) {
			for (var i = 0; i < ants.length; i++) {
				ants[i].move();
				if (ants[i].dead() || ants[i].outOfscreen()) {
					ants.splice(i, 1);
				}
			}
		}
	}
}

function drawAndFight(poses) {
	try {
	  	if(poses) {
	  		var pose = poses[0].pose;
	  		target = pose.rightWrist;

	  		push();
	  		fill(255,0,0);
	  		ellipse(target.x, target.y, 10);
	  		// ellipse(pose.leftWrist.x, pose.leftWrist.y, 10);
	  		// ellipse(pose.nose.x, pose.nose.y, 10);
	  		// line(target.x, target.y, player.x + player.w/2, player.y);
	  		pop();

	  		if(wepon_status == 'fighted' && pose.leftWrist.y > pose.nose.y) {
	  			wepon_status = 'loading';
	  		}

	  		if (wepon_status == 'loading' && pose.leftWrist.y < pose.nose.y) {
	  			wepon_status = 'ready';
	  		}
	  		if(wepon_status == 'ready') {
	  			console.log('FIGHT');
		  		// if(bullets.length == 0 || bullets[bullets.length - 1].y < h - distance*7) {
		  			var bullet = new Bullet(player.x , player.y, target.x, target.y);
		  			bullets.push(bullet);
		  			wepon_status = 'fighted';
		  		// }
		  	}
	  	}
	}
	catch(err) {
	  console.log(err.message);
	}
}

// function mouseMoved() {
function mousePressed() {
	// player.move(mouseX, mouseY);
}

function keyPressed() {
	if(key == ' ') {
		var bullet = new Bullet(player.x, player.y, mouseX, mouseY);
		gun_shot_s.play();
		bullets.push(bullet);
	}
}

// Tao vector ở giữa vị trí con trỏ và vị trí vật
function createVectorDirection(mx, my, px, py){
    return createVector((mx-px),(my-py)).normalize();
}


