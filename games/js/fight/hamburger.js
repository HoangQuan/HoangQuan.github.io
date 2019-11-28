class Hamburger {
	constructor(img, x, y, w) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.img = img;

		this.hp = 100;
	};

	show() {
		image(this.img, this.x, this. y, this.w, this.w);
		text(abs(parseInt(this.hp)), this.x + this.w/2, this.y);
	};

	isAlive() {
		return this.hp > 0;
	}
}
