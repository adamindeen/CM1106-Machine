var guyX, guyY;

var balancing = false,
	air = true;

function Guy() {
	
	//SETUP
	
	var guyBody = Bodies.rectangle(100, -50, 50, 67, {
		
		collisionFilter: {
			category: good
		},
		
		render: {
			sprite: {texture: 'img/guy.png'}
		}
	
	});
	
	var boot = new Audio('sound/startup.m4a');
	boot.volume = 0.5;
	
	title.addEventListener('ended', enter, false);
	
	function enter() {
		
		World.add(engine.world, guyBody);
		Body.setAngularVelocity(guyBody, 0.04)
		Body.applyForce (guyBody, guyBody.position, {x: 0.04, y: 0});
		boot.play();
	
	}

	//EVENT HANDLING
	
	//Automatic
	
	//Collision
	
	var grounded = false;
	var impactSound;
	var impact = new Audio(impactSound);
		impact.volume = 0.5;
	var delaySound = false;
	
	Events.on (engine, 'collisionStart', collide);
	
	function collide(event) {
		
		var pairs = event.pairs;

		for (var i = 0; i < pairs.length; i++) {
			
			var pair = pairs[i];
			
			if (pair.bodyA === guyBody || pair.bodyB === guyBody) {
				
				grounded = true;
				
				if (pair.bodyA.collisionFilter.category === bad || pair.bodyB.collisionFilter.category === bad) {
					
					balancing = true;
					
				}
				
				if (pair.bodyA.collisionFilter.category === wall || pair.bodyA.collisionFilter.category === wall) {
					
					//Aborts the game if Guy falls onto the taskbar before it starts
					
					if (gameOn == false) {
					
						air = false;
						balancing = false;
						ready.pause();
						ready.currentTime = 0;
						tutorialLoop.play();
						textBody.render.sprite.texture = 'img/text/instructions.png'
						
					}
					
					//Kills Guy if he does so after the game starts
					
					if (gameOn == true) {
						
						logic.die();
						
					}
					
				}
				
				//Game start
				
				if (balancing == true && air == true && gameOn == false) {
					
					tutorialLoop.pause();
					ready.play();
					textBody.render.sprite.texture = 'img/text/getReady.png'
					
				}
				
				//Collision sounds

				if (delaySound == false && pair.bodyA.collisionFilter.category !== bad && pair.bodyB.collisionFilter.category !== bad) {
				
					//Hard impacts
					
					if (guyBody.velocity.x > 3 || guyBody.velocity.y < -3 || guyBody.velocity.y > 3 || guyBody.velocity.y < -3) {
					
						impactSound = "sound/phys/guy/" + (4 + Math.floor(Math.random() * 4)) + ".wav";
						
					}
					
					//Soft impacts
					
					else {
						
						impactSound = "sound/phys/guy/" + (1 + Math.floor(Math.random() * 3)) + ".wav";
						
					}
					
					impact = new Audio(impactSound);
					impact.play();
					delaySound = true;
					setTimeout(function(){delaySound = false}, 200);
					
				}
				
			}
				
		}
			
	};
	
	//User input

	var left = false;
	var right = false;

	var delayMove = false;
	var angVel = 0;
	var counter = 0;
	
	window.addEventListener ("keydown", keyCheck, false);
	window.addEventListener ("keyup", function(){left = false; right = false}, false);

	function keyCheck (key) {

		if (key.keyCode == 68) {

			right = true;

		}

		if (key.keyCode == 65) {

			left = true;

		}

		move();

	}

	//Movement

	function move() {

		if (dead == false && grounded == true && delayMove == false) {

			if (left == true && right == false) {

				if (angVel > 0) {

					angVel = 0;

				}

				if (angVel <= 0 && angVel > -0.1) {

					angVel -= 0.02;

				}

				Body.setAngularVelocity (guyBody, angVel);
				Body.applyForce (guyBody, guyBody.position, {x: -0.02, y: -0.04});

			}

			if (right == true && left == false) {

				if (angVel < 0) {

					angVel = 0;

				}

				if (angVel >= 0 && angVel < 0.1) {

					angVel += 0.02;

				}

				Body.setAngularVelocity (guyBody, angVel);
				Body.applyForce (guyBody, guyBody.position, {x: 0.02, y: -0.04});

			}
			
			grounded = false;
			air = true;
			delayMove = true;
			setTimeout(function(){delayMove = false}, 200);

		}

		//Repeat delay bypass
		//Runs move() continuously while the key is pressed

		if (left == true || right == true) {

			setTimeout(move, 16);

		}

	}
	
	//Game loop
	
	var counter = 0;
	
	Events.on(engine, "beforeUpdate", loop);
	
	function loop() {
		
		//Kills Guy if he exceeds the screen boundaries
		
		if (guyBody.position.y > height) {
			
			logic.die();
			
		}
		
		//Makes Guy's position globally available
		
		guyX = guyBody.position.x, guyY = guyBody.position.y
		
		//Gradually reduces Guy's momentum to zero after key is released
		
		if (left == false && right == false) {

			counter += 1;

			if (angVel > 0) {

				if (counter >= 15) {

					angVel -= 0.02;
					counter = 0;

				}

			}

			if (angVel < 0) {

				if (counter >= 15) {

					angVel += 0.02;
					counter = 0;

				}

			}

		}

	}
	
}