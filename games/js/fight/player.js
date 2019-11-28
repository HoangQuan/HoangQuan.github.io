class Player {
	constructor() {
		this.h = 40;
		this.w = 30;
		this.x = width/2;
		this.y = height - this.h;

		this.speed = 2;
		this.level = 1;
		this.point = 0;

		this.delay_fight = 0.3;
		this.angle = 0;

		this.hp = 10;
	}

	move(mx, my) {
		if(abs(mx - this.x) > 4) {
			var target = createVectorDirection(mx, my, this.x, this.y);
		    this.x +=  (target.x * this.speed);
		    this.y +=  (target.y * this.speed);
		}
	}

	show() {
		fill(255);
		text(this.hp, this.x, this.y - this.h/2);
		push();
		this.angle = atan2(mouseY - this.y, mouseX - this.x);
		if(target)
			this.angle = atan2(target.y - this.y, target.x - this.x);
    	translate(this.x, this.y);
    	imageMode(CENTER);
    	rotate(this.angle + PI/2);
		image(tank_img, 0, 0, this.w, this.h);
		pop();

		// push();
		// var angle = atan2(mouseY - this.y, mouseX - this.x);
		// fill(255);
		// stroke(0);
		// translate(this.x, this.y);
		// rotate(angle);
		// imageMode(CENTER);
		// image(bullet_img, 0, 0, this.size + this.size*1.5, this.size);
		// pop();
	}

	dead() {
		return this.hp <= 0;
	}

	addPoint() {
		this.point += 1;
		this.levelUp();
	}

	levelUp() {
		if((floor(this.point/10) + 1) > this.level){
			this.level += 1;
			var p = plus_options[Math.floor(Math.random()*plus_options.length)];
			plus.push(new Plus(random(w), random(h), p.label, p.hp));
		}
	}
}
