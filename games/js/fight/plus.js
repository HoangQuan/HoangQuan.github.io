var plus_options = [
	{ label: 'P', hp: 10 },
	{ label: 'H', hp: 100 }
];

class Plus {
	constructor(x, y, label, hp) {
		this.x = x,
		this.y = y,
		this.hp = hp,
		this.size = 30,
		this.label = label;
	}

	show() {
		var img = this.label == 'P' ? plus_img : hplus_img;
		image(img, this.x, this.y, this.size, this.size);
		this.eated();
		setTimeout(function() {
			plus = [];
		}, 10000);
	}

	eated() {
		if(dist(this.x, this.y, player.x, player.y) < player.w) {
			eat_plus_s.play();
	        if(this.label == 'P') {
	        	player.hp += this.hp;
	        } else {
	        	hamburger.hp += this.hp;
	        }
	        plus = [];
	    }
	}
}