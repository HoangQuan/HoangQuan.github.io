$('#start_game').on('click', function(){
	console.log('clciked');
	ready = true;
	$("#menu").hide();
	if(gameOver) {
		bullets = [];
		ants = [];
		plus = [];
		gameOver = false;
		ready = true;
		setup();
		loop();
		redraw();
	}
});
