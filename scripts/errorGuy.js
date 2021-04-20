function errorGuy() {
	
	//SETUP
	
	var errorguyBody = Bodies.circle(800, -50, 30, {
		
		collisionFilter: {
			category: bad
		},
		
		render: {sprite: {texture: 'img/badGuy/error.png'}},
	
	});
	
	//Adding body
	
	error = new Audio('sound/badGuy/chord.wav');
	
	title.addEventListener('ended', enter, false);
	
	function enter() {
		
		setTimeout(function() {
		
			World.add(engine.world, errorguyBody);
			error.play();
		
		}, 3000);
	
	}

	//EVENT HANDLING
	
	//Automatic
	
	//Collision
	
	var impactSound;
	var impact = new Audio(impactSound);
	impact.volume = 0.5;
	
	Events.on (engine, 'collisionStart', collide);
	
	function collide(event) {

		var pairs = event.pairs;

		for (var i = 0; i < pairs.length; i++) {

			var pair = pairs[i];

			if (pair.bodyA === errorguyBody || pair.bodyB === errorguyBody) {

				//Hard impacts

				if (errorguyBody.velocity.x > 3 || errorguyBody.velocity.y < -3 || errorguyBody.velocity.y > 3 || errorguyBody.velocity.y < -3) {
					
					impactSound = "sound/phys/wood/" + (4 + Math.floor(Math.random() * 3)) + ".wav";
					impact = new Audio(impactSound);
					impact.play();

				}

			}

		}

	};
	
	//Artificial intelligence

	var left = false;
	var right = false;
	var angVel = 0;
	
	//Target Guy
	
	Events.on(engine, "beforeUpdate", target);
	
	function target() {
		
		if (guyX < errorguyBody.position.x) {
			
			left = true, right = false;
			
		}
		
		if (guyX > errorguyBody.position.x) {
			
			right = true, left = false;
			
		}
		
		move();
		
	}
	
	//Movement

	function move() {

		if (left == true && right == false) {

			if (angVel > 0) {

				angVel = 0;

			}

			if (angVel <= 0 && angVel > -0.1) {

				angVel -= 0.02;

			}

			Body.setAngularVelocity (errorguyBody, angVel);

		}

		if (right == true && left == false) {

			if (angVel < 0) {

				angVel = 0;

			}

			if (angVel >= 0 && angVel < 0.1) {

				angVel += 0.02;

			}

			Body.setAngularVelocity (errorguyBody, angVel);

		}
			
	}

}