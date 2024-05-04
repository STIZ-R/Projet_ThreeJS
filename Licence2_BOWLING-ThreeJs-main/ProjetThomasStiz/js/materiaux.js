
//Piste

	const matPiste1 = new THREE.MeshPhongMaterial({
		color: "#F5F5DC",
		opacity: 1,
		transparent: false,
		wireframe: false,
		specular : 0x110011,
		side: THREE.DoubleSide
	});
	
	const matPiste2 = new THREE.MeshPhongMaterial({
		color: "#777777",
		opacity: 1,
		transparent: false,
		wireframe: false,
		side: THREE.DoubleSide
	});
	
	const matPiste3 = new THREE.MeshPhongMaterial({
		color: "#000000",
		opacity: 1,
		transparent: false,
		wireframe: false,
		side: THREE.DoubleSide
	});
				
	
	const materialFluo = new THREE.MeshLambertMaterial({
		color: 0xffffff,
		 emissive : 0xffffff		
	});
	
	const matLatte1 = new THREE.MeshLambertMaterial({
		color: 0xff7723	
	});
	
	const matLatte2 = new THREE.MeshLambertMaterial({
		color: 0xff9923,	
	});
	
//Boule
		
	const matPh1 = new THREE.MeshPhongMaterial({
		color: "#FFFFFF",
		emissive:0x000000,
		specular:0x220022, 
		flatShading: false,
		side: THREE.DoubleSide
	});
	
	const matPh2 = new THREE.MeshPhongMaterial({
		color: "#222222",
		emissive:0x000000,
		specular:0x220022, 
		flatShading: false,
		side: THREE.DoubleSide
	});

//Quilles

	const matPh3 = new THREE.MeshPhongMaterial({
		color: "#222222",
		emissive:0x000000,
		specular:0x220022, 
		flatShading: false,
	});
	
	//matPh2==matPh4 , mais on change la couleur de matPh2 en matPh1, donc on duplique le 
	//materiau pour les quilles ne changent pas de couleur
	const matPh4 = new THREE.MeshPhongMaterial({
		color: "#222222",
		emissive:0x000000,
		specular:0x220022, 
		flatShading: false,
		side: THREE.DoubleSide
	});

//Clelie sur la boule
	
		const mat1 = new THREE.LineBasicMaterial( { color: 0x000000 } );
		const mat2 = new THREE.LineBasicMaterial( { color: 0xffffff } );

	//Ligne Verticale RECTILIGNE

		const matLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );

	//Cbe Bezier 1 PLANE NON RECTILIGNE

		const matBez1 = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth : 20} );

	//Cbe Bezier 2 PLANE NON RECTILIGNE
	
		const matBez2 = new THREE.LineBasicMaterial( { color: 0x00ff00, linewidth : 20 } );


