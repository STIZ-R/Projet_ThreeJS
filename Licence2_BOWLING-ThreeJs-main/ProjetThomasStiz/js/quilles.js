
// creation des box et de leurs proprietes
	
	let box1 = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.05,0.05),matPh1);
	box1.receiveShadow = true;
	box1.castShadow = true;
	let posBox1 = new THREE.Vector3( 19 , 0.1 , -1.93);
	
	let box2 = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.05,0.05),matPh1);
	box2.receiveShadow = true;
	box2.castShadow = true;
	let posBox2 = new THREE.Vector3( 19 , 0.35 , -1.93);
	
	let box3 = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.05,0.05),matPh1);
	box3.receiveShadow = true;
	box3.castShadow = true;
	let posBox3 = new THREE.Vector3( 19 , 0.65 , -1.93);
	
	let box4 = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.05,0.05),matPh1);
	box4.receiveShadow = true;
	box4.castShadow = true;
	let posBox4 = new THREE.Vector3( 19 , 0.95 , -1.93);
	
	let box5 = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.05,0.05),matPh1);
	box5.receiveShadow = true;
	box5.castShadow = true;
	let posBox5 = new THREE.Vector3( 18.75 , 0.23  , -1.93);
	
	let box6 = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.05,0.05),matPh1);
	box6.receiveShadow = true;
	box6.castShadow = true;
	let posBox6 = new THREE.Vector3( 18.75 , 0.5   , -1.93);
	
	let box7 = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.05,0.05),matPh1);
	box7.receiveShadow = true;
	box7.castShadow = true;
	let posBox7 = new THREE.Vector3( 18.75 , 0.78  , -1.93);
	
	let box8 = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.05,0.05),matPh1);
	box8.receiveShadow = true;
	box8.castShadow = true;
	let posBox8 = new THREE.Vector3( 18.5 , 0.35 , -1.93);
	
	let box9 = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.05,0.05),matPh1);
	box9.receiveShadow = true;
	box9.castShadow = true;
	let posBox9 = new THREE.Vector3( 18.5 , 0.65 , -1.93);
	
	let box10 = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.05,0.05),matPh1);
	box10.receiveShadow = true;
	box10.castShadow = true;
	let posBox10 = new THREE.Vector3(18.25 , 0.5 , -1.93);

// Fonction pour regarder si collision
	function collisionQuille(sphere, quilleTouche){
		hitbox1 = new THREE.Box3().setFromObject(sphere);
		hitbox2 = new THREE.Box3().setFromObject(quilleTouche);
		return hitbox1.intersectsBox(hitbox2);
	}
	
//fonction pour placer la box si disparition de quille	
	
	function placeBox(p_name,p_pos,p_box){
		if(scene.getObjectByName(p_name)){
			p_box.position.set(p_pos.x,p_pos.y,p_pos.z);
			scene.add(p_box);
			scene.remove(scene.getObjectByName(p_name));	
		}
	}

// Fonction pour faire disparaitre les quilles

	function disparition(p_objet){
		
		switch(p_objet.name){
			
			case "Quille1":
				placeBox("Quille1",posBox1,box1);
				break;
			case "Quille2":
				placeBox("Quille2",posBox2,box2);
				break;
			case "Quille3":
				placeBox("Quille3",posBox3,box3);
				break;
			case "Quille4":
				placeBox("Quille4",posBox4,box4);
				break;
			case "Quille5":
				placeBox("Quille5",posBox7,box5);
				break;
			case "Quille6":
				placeBox("Quille6",posBox6,box6);
				break;
			case "Quille7":
				placeBox("Quille7",posBox5,box7);
				break;
			case "Quille8":
				placeBox("Quille8",posBox9,box8);
				break;
			case "Quille9":
				placeBox("Quille9",posBox8,box9);
				break;
			case "Quille10":
				placeBox("Quille10",posBox10,box10);
				break;
		}
	}

// courbes de beziers + points

	let P0 = new THREE.Vector3(0.6/15,3/15,0);//rouge
	let P1 = new THREE.Vector3(0.1/15,2/15,0);//blanc
	let P2 = new THREE.Vector3(0.9/15,1.5/15,0);//bleu
	let P3 = new THREE.Vector3(1/15,1/15,0);//magenta

	let M0 = new THREE.Vector3(P3.x,P3.y,0);
	let M1 = new THREE.Vector3(0,0,0);
	let M2 = new THREE.Vector3(1.3/15,-2.5/15,0);
	let M3 = new THREE.Vector3(0,-2/15,0);

	let vP2P3 = new THREE.Vector3(0,0,0);
	let vTan2Q = new THREE.Vector3(0,0,0);

	vP2P3.subVectors(P3,P2);//P3-P2

	let dot1Q = P2.dot(P3);
	let dot2Q = P3.dot(M0);

	let coefQ = dot1Q/dot2Q;

	vTan2Q.addScaledVector(vP2P3,coefQ);
	M1.addVectors(M0,vTan2Q);
				
	let cbeBez2 = TraceBezierCubique(P0, P1, P2, P3,10,"#FF00FF",5);
	let cbeBez1 = TraceBezierCubique(M0, M1, M2, M3,10,"#FFFF00",5);
	// quand l'objet est petit ( = ici ) , les courbes de bezier ne s'affichent pas
	
	
//lathes

	let lathe1 = latheBez3(30,45,P0,P1,P2,P3,matPh1);
	let lathe2 = latheBez3(30,45,M0,M1,M2,M3,matPh4);
	lathe1.translateX(19);
	lathe1.translateY(0.1);
	lathe1.translateZ(-1.81);
	lathe1.rotateX(Math.PI/2);

	lathe2.translateX(19);
	lathe2.translateY(0.1);
	lathe2.translateZ(-1.81);
	lathe2.rotateX(Math.PI/2);

	scene.add(lathe1);
	scene.add(lathe2);

//tete de la quille

	let sphQ = new THREE.SphereGeometry( 0.6445/15 , 35 , 30 , 0 , Math.PI * 2 , 1.2 , Math.PI );
	let sphereQuille = new THREE.Mesh(sphQ, matPh3);
	sphereQuille.position.set( 19 , 0.1 , -1.5958 );
	sphereQuille.rotateX(-Math.PI/2);

	scene.add(sphereQuille);

//constitution du groupe pour le clonage 

	const quille1 = new THREE.Group();
	quille1.add(lathe1,lathe2,sphereQuille);
	quille1.name = 'Quille1';
	quille1.receiveShadow = true;
	quille1.castShadow = true;
	scene.add(quille1);
	
	let quille2 = quille1.clone(true);
	quille2.translateY(0.25);
	quille2.name = 'Quille2';
	quille2.receiveShadow = true;
	quille2.castShadow = true;
	scene.add(quille2);

	let quille3 = quille2.clone(true);
	quille3.translateY(0.30);
	quille3.name = 'Quille3';
	quille3.receiveShadow = true;
	quille3.castShadow = true;
	scene.add(quille3);
		
	let quille4 = quille3.clone(true);
	quille4.translateY(0.23);
	quille4.name = 'Quille4';
	quille4.receiveShadow = true;
	quille4.castShadow = true;
	scene.add(quille4);
	
	let quille5 = quille4.clone(true);
	quille5.translateX(-0.25);
	quille5.translateY(-0.12);
	quille5.name = 'Quille5';
	quille5.receiveShadow = true;
	quille5.castShadow = true;
	scene.add(quille5);
	
	let quille6 = quille4.clone(true);
	quille6.translateX(-0.25);
	quille6.translateY(-0.38);
	quille6.name = 'Quille6';
	quille6.receiveShadow = true;
	quille6.castShadow = true;
	scene.add(quille6);
		
	let quille7 = quille4.clone(true);
	quille7.translateX(-0.25);
	quille7.translateY(-0.66);
	quille7.name = 'Quille7';
	quille7.receiveShadow = true;
	quille7.castShadow = true;
	scene.add(quille7);
	
	let quille8 = quille5.clone(true);
	quille8.translateX(-0.25);
	quille8.translateY(-0.10);
	quille8.name = 'Quille8';
	quille8.receiveShadow = true;
	quille8.castShadow = true;
	scene.add(quille8);
		
	let quille9 = quille5.clone(true);
	quille9.translateX(-0.25);
	quille9.translateY(-0.42);
	quille9.name = 'Quille9';
	quille9.receiveShadow = true;
	quille9.castShadow = true;
	scene.add(quille9);
	
	let quille10 = quille8.clone(true);
	quille10.translateX(-0.25);
	quille10.translateY(-0.16);
	quille10.name = 'Quille10';
	quille10.receiveShadow = true;
	quille10.castShadow = true;
	scene.add(quille10);
		
	function resetQuilles(){
		
		scene.remove(box1);
		scene.remove(box2);
		scene.remove(box3);
		scene.remove(box4);
		scene.remove(box5);
		scene.remove(box6);
		scene.remove(box7);
		scene.remove(box8);
		scene.remove(box9);
		scene.remove(box10);
		
		scene.add(quille1);
		scene.add(quille2);
		scene.add(quille3);
		scene.add(quille4);
		scene.add(quille5);
		scene.add(quille6);
		scene.add(quille7);
		scene.add(quille8);
		scene.add(quille9);
		scene.add(quille10);
	}
		
		