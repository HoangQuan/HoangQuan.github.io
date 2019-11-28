class Ant {
	constructor(x, y, tx, ty, label) {
		this.size = 6;
		this.x = x;
		this.y = y;
		this.w = 40;
		this.h = 30;
		this.target = createVectorDirection(tx, ty, x, y);
		this.hp = 2;
		this.angle = atan2(ty - this.y, tx - this.x);

		this.speed = 1;
		this.damage = 2;
		this.eating = false;
		this.eat_speed = 0.2;

		this.label = label;
	}

	move() {
		if(!this.eating) {
		    this.x += (this.target.x * this.speed);
		    this.y += (this.target.y * this.speed);
	    }

	    // Meet the hamburger
	    if(collideCircleCircle(this.x, this.y, this.size, hamburger.x + hamburger.w/2, hamburger.y + hamburger.w/2, hamburger.w)) {
	        this.eat();
	    }

	    // Meet the hamburger
	    if(collideCircleCircle(this.x, this.y, this.size, player.x + player.w/2, player.y + player.w/2, player.w)) {
	        this.knockBack();
	        player.hp -= this.damage;
	    }

	    this.show();
	}

	eat() {
		this.eating = true;

		hamburger.hp -= frameRate()/100 * this.damage*this.eat_speed;
	}

	knockBack() {
		this.x -= 10;
	}

	show() {
		    // i = i%255;
		    if(false) {
			    stroke(255);
				// fill(0);
			    fill(color(random(255),random(255),random(255)));
			    // noStroke();
				ellipseMode(CENTER);
			  	// this.pos.x, this.pos.y, 4, 4);
			  	var antX = this.x;
			  	var antY = this.y;
			  	var antC = this.size; //change this variable to scale ant
			  	var antL = antC * (2/3);

			    fill(0);
			    
			    //body
			    ellipse(antX-(antC*2),antY,antC,antC); //butt
			    ellipse(antX-antC,antY,antC,antC); //middle
			    ellipse(antX,antY,antC,antC); //head

			    //antenna
			    noFill();
			    arc(antX,antY-(antC/2),antC*1.5,antC,5.5,1);
			    arc(antX,antY+(antC/2),antC*1.5,antC,5.5,0.6);

			    
			    //straight butt leg
			    line(antX-(antC*2),antY+antC,antX-(antC*2),antY-antC);

			    //moving butt leg - forward slash
			    line(antX-(antC*2)-(antC/2),antY+antC,antX-(antC*2)+(antC/2),antY-antC);

			    //moving butt leg - back slash
			    line(antX-(antC*2)-(antC/2),antY-antC,antX-(antC*2)+(antC/2),antY+antC);

			    //straight middle leg
			    line(antX-antC,antY+antC,antX-antC,antY-antC);//middle leg
			  	
			    //moving middle - back slash
			    line(antX-(antC/2),antY+antC,antX-(antC*2)+(antC/2),antY-antC);

			    //moving middle - forward slash
			    line(antX-(antC*2)+(antC/2),antY+antC,antX-antC+(antC/2),antY-antC);
			    text(this.hp, this.x - this.size/2, this.y - this.size);
			}

			fill(255);
			text(this.hp, this.x, this.y - this.h/2)
			push();

			if(this.label == 'RedAnt') {
				translate(this.x, this.y);
				this.target = createVectorDirection(player.x, player.y, this.x, this.y);
				this.angle = atan2(player.y - this.y, player.x - this.x);
				rotate(this.angle + PI);
				imageMode(CENTER);
				image(red_ant_img, 0, 0, this.w, this.h)
			} else {
				translate(this.x, this.y);
				rotate(this.angle + PI/2);
				imageMode(CENTER);
				image(ant_img, 0, 0, this.w, this.h)
			}
			pop();
	}

	outOfscreen() {
		if(this.x > width || this.x < 0 || this.y > height || this.y < 0) {
			return true;
		}
		return false;
	}

	dead() {
		if(this.hp <= 0) {
			player.addPoint();
			return true;
		}
		return false;
	}
}
