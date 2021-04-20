function warningGuy(x, addDelay) {

	//SETUP

	var vertices = Vertices.fromPath('29, 0, 0, 60, 58, 60');

	var warningguyBody = Bodies.fromVertices(x, -50, vertices, {

		collisionFilter: {
			category: bad
		},

		render: {sprite: {texture: 'img/badGuy/warning.png'}},

	});
	
	//Adding body
	
	error = new Audio('sound/badGuy/chord.wav');
	
	ready.addEventListener('ended', enter, false);
	
	function enter() {
		
		setTimeout(function() {
			
			if (dead == false) {
		
				World.add(engine.world, warningguyBody);
				Body.setAngularVelocity(warningguyBody, Math.random()  - 0.5);
				error.play();
				
			}
		
		}, addDelay);
	
	}

	//EVENT HANDLING

	//Automatic

	//Collision

	var impactSound;
	var impact = new Audio(impactSound);
		impact.volume = 0.5;
	var delaySound = false;

	Events.on (engine, 'collisionStart', collide);

	function collide(event) {

		var pairs = event.pairs;

		for (var i = 0; i < pairs.length; i++) {

			var pair = pairs[i];

			if (pair.bodyA === warningguyBody || pair.bodyB === warningguyBody) {

				grounded = true;

				if (delaySound == false) {

					//Hard impacts

					if (warningguyBody.velocity.x > 3 || warningguyBody.velocity.y < -3 || warningguyBody.velocity.y > 3 || warningguyBody.velocity.y < -3) {

						impactSound = "sound/phys/wood/" + (4 + Math.floor(Math.random() * 3)) + ".wav";

					}

					//Soft impacts

					else {

						impactSound = "sound/phys/wood/" + (1 + Math.floor(Math.random() * 3)) + ".wav";

					}

					impact = new Audio(impactSound);
					impact.play();
					delaySound = true;
					setTimeout(function(){delaySound = false}, 200);

				}

			}

		}

	};

	//Artificial intelligence

	var left = false;
	var right = false;

	//Target Guy

	Events.on(engine, "beforeUpdate", target);

	function target() {

		if (guyX < warningguyBody.position.x) {

			left = true, right = false;

		}

		if (guyX > warningguyBody.position.x) {

			right = true, left = false;

		}

		move();

	}

	var grounded = false;
	var delayMove = false;
	var angVel = 0;

	//Movement

	function move() {

		if (grounded == true && delayMove == false) {

			if (left == true && right == false) {

				if (angVel > 0) {

					angVel = 0;

				}

				if (angVel <= 0 && angVel > -0.1) {

					angVel -= 0.02;

				}

				Body.setAngularVelocity (warningguyBody, angVel);
				Body.applyForce (warningguyBody, warningguyBody.position, {x: -0.01, y: -0.02});

			}

			if (right == true && left == false) {

				if (angVel < 0) {

					angVel = 0;

				}

				if (angVel >= 0 && angVel < 0.1) {

					angVel += 0.02;

				}

				Body.setAngularVelocity (warningguyBody, angVel);
				Body.applyForce (warningguyBody, warningguyBody.position, {x: 0.01, y: -0.02});

			}

			grounded = false;
			delayMove = true;
			setTimeout(function(){delayMove = false}, 200);

		}

	}

}
