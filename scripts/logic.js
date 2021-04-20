var gameOn = false,
	time = 0,
	timing = false,
	dead = false;
	
var textBody;

function Logic() {
		
	//Audio events
		
	title.addEventListener('ended', opening, false);
	tutorialLoop.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	ready.addEventListener('ended', gameStart, false);
	loop.addEventListener('ended', function() { 
		this.currentTime = 0;
		this.play();
	}, false);
	
	//Introductory sequence
	
	var clicked = false;
	
	var titleBody = Bodies.rectangle(width / 2, height / 2, width, height, {
		isStatic: true,
		render: {sprite: {texture: 'img/text/click.png'}}
	});
	
	World.add(engine.world, titleBody);
	
	window.addEventListener("mousedown", titleSequence, false);
	
	function titleSequence() {
		
		if (clicked == false) {
			
			title.play();
			title.addEventListener('ended', opening, false);
			titleBody.render.sprite.texture = 'img/text/black.png';
			setTimeout(function() {
				titleBody.render.sprite.texture = 'img/text/title.png'}, 100);
			clicked = true;
			
		}
		
	}
	
	//Body containing text as images
	
	textBody = Bodies.rectangle(533, 300, 1, 1, {
		
		isStatic: true,
		collisionFilter: {mask: background},
		
		render: {fillStyle: 'transparent', strokeStyle: 'transparent'}
		
	});
	
	//Control granted to player
	
	function opening() {
		
		tutorialLoop.play();
		Body.setPosition(titleBody, {x: 3000, y: 0});
		World.add(engine.world, textBody);
		
	}
	
	//Game begins
	
	function gameStart() {
		
		gameOn = true;
		timing = true;
		tutorialLoop.currentTime = 0;
		loop.play();
		textBody.render.sprite.texture = null;
		
	}
	
	//Scoring mechanism
	
	Events.on(engine, 'afterUpdate', timer);
	
	function timer() {
		
		if (timing == true) {
			
			time = time + 1;
			
		}
		
	}
	
}

//Death

Logic.prototype.die = function() {
	
	dead = true;
	timing = false;
	loop.pause();
	tutorialLoop.play();
	
	if (time > 0) {
		var length = time / 12;
		var scoreBar = Bodies.rectangle(533, 300, length, 10, {
			isStatic: true,
			render: {fillStyle: 'white', strokeStyle: 'transparent'},
			collisionFilter: {category: wall}
		});
		World.add(engine.world, scoreBar);
		textBody.render.sprite.texture = 'img/text/death.png';
	}
	
	else {
		
		textBody.render.sprite.texture = 'img/text/fail.png';
		
	}
	
}