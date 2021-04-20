function Level() {
	
	//Defining objects
			
	var floorG = Bodies.rectangle(width / 2, height - 14, width, 28, {
		
		isStatic: true,
		collisionFilter: {
			category: wall,
			mask: good | bad
		},
		render: {sprite: {texture: 'img/desktop/taskbar.png'}}
		
	});
	
	var icons = Bodies.rectangle(77, 263, 154, 526, {
		
		isStatic: true,
		collisionFilter: {
			mask: undefined
		},
		render: {sprite: {texture: 'img/desktop/icons.png'}}
		
	});
	
	//Adding objects
	
	title.addEventListener('ended', enter, false);
	
	function enter() {
		
		World.add(engine.world, [floorG, icons]);
		render.options.background = '#008080'
	
	}
	
}