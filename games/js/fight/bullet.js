class Bullet {
	constructor(x, y, tx, ty) {
		this.size = 10;
		this.x = x;
		this.y = y;
		this.angle = atan2(ty - this.y, tx - this.x);
		this.target = createVectorDirection(tx, ty, x, y);

		this.speed = 10;
		this.damage = 1;
	}

	move() {
	    this.x += (this.target.x * this.speed);
	    this.y += (this.target.y * this.speed);
	    this.show();
	}

	show() {
		push();
		fill(0,255,0);
    	stroke(0);

		ellipse(this.x, this.y, this.size);
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

	outOfscreen() {
		if(this.x > width || this.x < 0 || this.y > height || this.y < 0) {
			return true;
		}
		return false;
	}

	hit() {
		for (var i = ants.length - 1; i >= 0; i--) {
		    // ants[i].x - ants[i].size để lấy body của kiến, bán kính sẽ bằng ants[i].size*2
		    if(collideCircleCircle(this.x, this.y, this.size, ants[i].x - ants[i].size, ants[i].y, ants[i].size*2)) {
		        text("Hit..", this.x, this.y)
		        ants[i].hp -= this.damage;
		        ants[i].damage = ants[i].hp;
		        return true;
		    }
		}
		return false;
	}
}
