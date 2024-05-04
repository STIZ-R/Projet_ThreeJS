
//On definit ces variables en dehors de init : elles sont globales et on peut s'en servir dans d'autres fichiers

	let camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
	let rendu = new THREE.WebGLRenderer({ antialias: true });
	let scene = new THREE.Scene(); 	
	const borneVue=10;
	const loader = new THREE.TextureLoader();	
	var center = new THREE.Vector3( 0.5 , 0.5 , -1.85 );
	
	rendu.shadowMap.enabled = true;	
	rendu.shadowMap.type = THREE.PCFSoftShadowMap;
	
	rendu.setClearColor(new THREE.Color(0x444444));	
	rendu.setSize(window.innerWidth*.8, window.innerHeight*.9);	
		
	cameraLumiere(scene,camera);	
	lumiere(scene);

	camera.position.set( -0.3 , 0.5 , -1.3 );
	camera.lookAt(center);

//Fonction pour faire apparaitre la boule
	let moveB = false;
	
	function activateBoule(){
		moveB = true;	
	}
	
//Fonctions concernant le jeu en lui meme
	
		let tour = 1;
		let finG=false;		
			
	//fonction strike

		let nbQTbT  = 0;  // nb de quilles totales tombees 
		let nbQTb   = 0;  // nb de quilles tombees pdt le tour 
		
		function strike(tour){
			// si toutes les quilles sont tombees ET que on est au tour 1, 3, 5, 7 : strike 
			// ( aucune utilite d'appeller la fonction si on est au tour 2 ou 4... )
			return nbQTb==10 && ( tour==1 || tour==3 || tour==5 || tour==7 ) ? true : false ;  
		}

	//On compte les points

		function point(){
			//si strike, première case == 30 seconde == X et total == 30
			
				//si joueur 1 
				if(strike(tour) && tour==1){
					document.getElementById("tour1J1").innerHTML = "30";
					document.getElementById("tour2J1").innerHTML = "X";
					document.getElementById("totalJ1").innerHTML = "30";
				}
				// si joueur 2
				if(strike(tour) && tour==3){
					document.getElementById("tour1J2").innerHTML = "30";
					document.getElementById("tour2J2").innerHTML = "x";
					document.getElementById("totalJ2").innerHTML = "30";
				}
				if(strike(tour) && tour==5){
					document.getElementById("tour3J1").innerHTML = "30";
					document.getElementById("tour4J1").innerHTML = "x";
					document.getElementById("totalJ1").innerHTML += "30";
				}
				if(strike(tour) && tour==7){
					document.getElementById("tour3J2").innerHTML = "30";
					document.getElementById("tour4J2").innerHTML = "x";
					document.getElementById("totalJ2").innerHTML += "30";
				}
				
			//si !strike, 1ere case == nb quilles tombees 
				//si joueur 1 
				if(!strike(tour) && tour==1 ){
					document.getElementById("tour1J1").innerHTML = nbQTb;
					document.getElementById("totalJ1").innerHTML = nbQTb;
				}
				//si joueur 2 
				if(!strike(tour) && tour==3 ){
					document.getElementById("tour1J2").innerHTML = nbQTb;
					document.getElementById("totalJ2").innerHTML = nbQTb;
				}
				if(!strike(tour) && tour==5 ){
					document.getElementById("tour3J1").innerHTML = nbQTb;
					document.getElementById("totalJ1").innerHTML = parseInt(document.getElementById("totalJ1").innerHTML) + nbQTb;
				}
				if(!strike(tour) && tour==7){
					document.getElementById("tour3J2").innerHTML = nbQTb;
					document.getElementById("totalJ2").innerHTML = parseInt(document.getElementById("totalJ2").innerHTML) + nbQTb;
				}
				
			// 2e tour d'une mene == nb quilles tombees
				if(tour==2){
					document.getElementById("tour2J1").innerHTML = nbQTb;
					//si spare : pts == 15
					if(nbQTb + parseInt(document.getElementById("tour1J1").innerHTML)==10)
						document.getElementById("totalJ1").innerHTML = 15;
					else
						document.getElementById("totalJ1").innerHTML = nbQTb + parseInt(document.getElementById("tour1J1").innerHTML);		
				}
				if(tour==4){
					document.getElementById("tour2J2").innerHTML = nbQTb;
					//si spare : pts == 15
					if(nbQTb + parseInt(document.getElementById("tour1J2").innerHTML)==10)
						document.getElementById("totalJ2").innerHTML = 15;
					else
						document.getElementById("totalJ2").innerHTML = nbQTb + parseInt(document.getElementById("tour1J2").innerHTML);
				}
				if(tour==6){
					document.getElementById("tour4J1").innerHTML = nbQTb;
					
					//si spare : pts == 15
					if(nbQTb + parseInt(document.getElementById("tour3J1").innerHTML)==10)
						document.getElementById("totalJ1").innerHTML += 15  ;
					else
						document.getElementById("totalJ1").innerHTML = parseInt(document.getElementById("totalJ1").innerHTML) + nbQTb;
				}
				if(tour==8){
					document.getElementById("tour4J2").innerHTML = nbQTb;
					
					//si spare : pts == 15
					if(nbQTb + parseInt(document.getElementById("tour3J2").innerHTML)==10)
						document.getElementById("totalJ2").innerHTML += 15  ;
					else
						document.getElementById("totalJ2").innerHTML = parseInt(document.getElementById("totalJ2").innerHTML) + nbQTb; 

					if(parseInt(document.getElementById("totalJ1").innerHTML)>parseInt(document.getElementById("totalJ2").innerHTML))
						document.getElementById("gagnant").innerHTML = "Le gagnant est l'&eacute;quipe 1 !";
					else
						if(parseInt(document.getElementById("totalJ1").innerHTML)<parseInt(document.getElementById("totalJ2").innerHTML))
							document.getElementById("gagnant").innerHTML = "Le gagnant est l'&eacute;quipe 2 !";
						else
							document.getElementById("gagnant").innerHTML = "&Eacute;galit&eacute; !";

				}					
		}
	
//Fonction pour changer le point de vue
	
	// 1 == vue debut piste
	// 2 == vue milieu piste
	// 3 == vue quilles 
	
	let vueCam = 1;
	let autoCam = false;
	
	function changePtView(){
		
		vueCam+=1;
		
		if(autoCam){		
			if( sphere.position.x < 6 )
				vueCam = 1;
			if( sphere.position.x > 6 )
				vueCam = 2;
			if( sphere.position.x > 17.5 )
				vueCam = 3;
		}else{
		
			if(vueCam%3 == 1)
				vueCam = 1;
			if(vueCam%3 == 2)
				vueCam = 2;
			if(vueCam%3 == 0)
				vueCam = 3;
		}
		
		switch(vueCam){
			
			case 1:
				center = new THREE.Vector3( 0.5 , 0.5 , -1.85 );
				camera.position.set( -0.3 , 0.5 , -1.3 );
				camera.lookAt(center);
				break;
				
			case 2:
				center = new THREE.Vector3( 10 , 0.5 , -1.85 );
				camera.position.set( 10 , -2 , 0 );
				camera.lookAt(center);
				break;
				
			case 3:
				center = new THREE.Vector3( 19 , 0.5 , -1.85 );
				camera.position.set( 17.5 , 0.5 , -1.2 );
				camera.lookAt(center);
				break;
		}
	}

	
//Fonction globale
function init(){
		
	var stats = initStats();
		
	//************************************************************
	//
	//  	D E B U T     P A R T I E     G R A P H I Q U E
	//
	//************************************************************

	//Création de la boule, Bezier...
	
		//Clelie 
			
			let n = 4;
			let nb=55;
			let points = new Array(nb+1);
			let R = 0.09038;
			
			for(var k=0;k<=nb;k++){
				let t2=Math.PI*n*(-0.5+k/nb);
				t2=t2.toPrecision(PrecisionArrondi);
				let x0,y0,z0;
				with(Math){
					x0=R*cos(t2/n)*cos(t2);
					y0=R*cos(t2/n)*sin(t2);
					z0=R*sin(t2/n);
				}
				points[k] = new THREE.Vector3(x0,y0,z0);
			}
			
			let PtsCbePara = new THREE.BufferGeometry().setFromPoints(points);
			let courbePara = new THREE.Line( PtsCbePara, mat2 );
			
			courbePara.name = 'courbe';		
			scene.add(courbePara);
			scene.remove(scene.getObjectByName('courbe'));
			
		//Boule
			
			let spG = new THREE.SphereGeometry( 0.09 , 40 , 35 );
						
			sphere = new THREE.Mesh(spG, matPh2);

			sphere.position.set( 0.5 , 0.5 , -1.3 );

			sphere.receiveShadow = true;
			sphere.castShadow = true;

			scene.add(sphere);
		
		//Points de jonction G1
			
			//Position des points
			
				let x1 = 0.5;
				let y1 = 0.5;
				let z1 = -1.85;
				
				let x2 = 10;
				let y2 = 0.5;
				let z2 = -1.85;
			
			//jonction entre lineDown et bezier1
			
				let jonction1 = new THREE.Vector3(x1,y1,z1);
				
			//jonction entre bezier1 et bezier2
			
				let jonction21 = new THREE.Vector3(x2,y2,z2);
				let jonction22 = new THREE.Vector3(jonction21.x,jonction21.y,z2);
			
		//Ligne Verticale RECTILIGNE
		
			let ptBegin = new THREE.Vector3( 0.5 , y1 , -1.3 );
			
			const lineDown = new THREE.LineCurve3(
				ptBegin,
				jonction1
			);

			const pointsLine = lineDown.getPoints(10);
			const geomLine = new THREE.BufferGeometry().setFromPoints( pointsLine );
			const lineDownF = new THREE.Line( geomLine, matLine );
			lineDownF.name = 'lineDownF';
			
		//Cbe Bezier 1 PLANE NON RECTILIGNE
			
			let ptCtrl1 = new THREE.Vector3( 3, 0.5, -1.85 );
			let ptCtrl2 = new THREE.Vector3( 6, 0.5, -1.85 );
					
			const courbeBezier1 = new THREE.CubicBezierCurve3(
				jonction1,
				ptCtrl1,
				ptCtrl2,
				jonction21
			);
			
			const pointsB1 = courbeBezier1.getPoints(25);
			const geomBez1 = new THREE.BufferGeometry().setFromPoints( pointsB1 );
			const courbeBezF1 = new THREE.Line(geomBez1, matBez1);
			courbeBezF1.name = 'courbeBezierF1';
			scene.add(courbeBezF1);
			
		//Cbe Bezier 2 PLANE NON RECTILIGNE
		
			let ptCtrl3 = new THREE.Vector3( 13, 0.5, -1.85 );
			let ptCtrl4 = new THREE.Vector3( 16, 0.5, -1.85 );
			let ptCtrlEnd = new THREE.Vector3( 19.6, 0.5, -1.9 );
		
			let vecCt1J21 = new THREE.Vector3(0,0,0);
			let vTan2 = new THREE.Vector3(0,0,0);

			vecCt1J21.subVectors(jonction21,ptCtrl2);
			
			let dot1 = ptCtrl2.dot(jonction21);
			let dot2 = jonction21.dot(jonction22);
			
			let coef = dot1/dot2;
				
			vTan2.addScaledVector(vecCt1J21,coef);
			ptCtrl3.addVectors(jonction22,vTan2);
		
			const courbeBezier2 = new THREE.CubicBezierCurve3(
				jonction22,
				ptCtrl3,
				ptCtrl4,
				ptCtrlEnd
			);
				
			const pointsB2 = courbeBezier2.getPoints(25);
			const geomBez2 = new THREE.BufferGeometry().setFromPoints( pointsB2 );
			const courbeBezF2 = new THREE.Line( geomBez2, matBez2 );
			courbeBezF2.name = 'courbeBezierF2';
			scene.add(courbeBezF2);
		
		//************************************************************
		//
		//  		     P I S T E   B O W L I N G
		//
		//************************************************************
		
			//espace entre les points de la piste
			let espace_dot=0;

			//espace entre les lattes
			let espace = 0;

			//espace entre les premières fléches de la piste
			let espace_tri2=0;

			//espace entre les secondes flèches de la piste
			let espace_tri1=0;
			
			//Ajout de la ligne de faute
			var ligne_faute = new THREE.PlaneGeometry(0.01, 1.05, 1, 1);
			
			let faute = new THREE.Mesh(ligne_faute, materialFluo);
			faute.position.set( 1 ,0.515,-1.9476)
			scene.add(faute);


			//Une piste fait selon wikipédia 18.29m de long et est composé de 39 lattes, le tout sur 1.05m de large.
			//Soit 1.05/39~=0.027m
			//Les flèches (toujours selon wikipédia), sont situés à 4.7m de distance de la ligne de faute.
			//Création de la piste avec les lattes grâce à une boucle
			for(i=0; i<39; i++){
			  //Une latte de couleur claire
			  if(i%2==0){
				var mesh= new THREE.Mesh(
					new THREE.BoxGeometry(18.29,0.027,0.1),
					matLatte2
				)
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				mesh.position.set(10, espace, -2)
				scene.add(mesh)
				}
			  //Une latte de couleur foncé
			  else{
				var mesh= new THREE.Mesh(
				  new THREE.BoxGeometry(18.29,0.027,0.1),
				  matLatte1);
				  mesh.receiveShadow = true;
				  mesh.castShadow = true;
				  mesh.position.set(10, espace, -2)
				  scene.add(mesh)
			  }
			  
			  espace+=0.027;  //On décale les lattes au fur et à mesure

			  //Création des triangles côté montant toutes les 5 lattes
			  if(/*i%5==0 && i<3 && i==0*/ i==5 || i==10 || i==15 || i==20){ //On a fait ça à cause d'un problème bien que le mod5 fonctionne aussi
				//On définie 3 points afin de créer un triangle
				let geom = new THREE.Geometry();
				let v1 = new THREE.Vector3(4.7,-0.0135,0);
				let v2 = new THREE.Vector3(4.9,0,0);
				let v3 = new THREE.Vector3(4.7,0.0135,0);

				geom.vertices.push(v1);
				geom.vertices.push(v2);
				geom.vertices.push(v3);

				geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
				geom.computeFaceNormals();

				let triangle= new THREE.Mesh( geom,  materialFluo );
				triangle.position.set(0+espace_tri1,i/39,-1.94);
				

				scene.add(triangle)
				espace_tri1+=(0.027*5);
				//*5 car on le fait toutes les 5 lattes
			  }
			  //Création des triangles côté descandant toutes les 5 lattes
			  if(/*i%5==0 && i>=3*/i==25 || i==30 || i==35){    //Idem que plus haut

				//On définie 3 points afin de créer un triangle
				let geom = new THREE.Geometry();
				let v1 = new THREE.Vector3(4.7,-0.0135,0);
				let v2 = new THREE.Vector3(4.9,0,0);
				let v3 = new THREE.Vector3(4.7,0.0135,0);

				geom.vertices.push(v1);
				geom.vertices.push(v2);
				geom.vertices.push(v3);

				geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
				geom.computeFaceNormals();

				let triangle= new THREE.Mesh( geom, new THREE.MeshStandardMaterial({color: 0x000000, emissive : 0xffffff}) );
				triangle.position.set(espace_tri1-(0.027*10)-espace_tri2,i/39,-1.94);
				
				scene.add(triangle)
				espace_tri2+=(0.027*5);
				//*5 car on le fait toutes les 5 lattes
			  }
			  
			  //Ajout des points avant les repères au sol (triangles)
			  if(i%3==0 && i!=0 && i!=39)  {

				//Ce sont des petits carrés pour faire paraître à des points
				var dotGeometry = new THREE.PlaneGeometry(0.01, 0.01, 100, 100);
				let dot = new THREE.Mesh(dotGeometry, materialFluo);
				dot.position.set(4.5,0.08+espace_dot,-1.94)
				scene.add(dot);
				espace_dot+=0.08; //1,05m de large ; 39/3=13 ; 1,05/13 = 0,08
			  }
			}
			//Materiel de la gouttière
			
			//Cylindre qu'on coupe un peu plus qu'en 2 afin de créer les gouttières
			const gutter1 = new THREE.CylinderGeometry( 0.075, 0.075, 18.29, 30, 30, true, 2.3, 1.8);
			const cylinder3 = new THREE.Mesh( gutter1, matPiste2 );
			cylinder3.position.set(10, 1.095,-1.9);
			cylinder3.rotateZ(-Math.PI/2);
			cylinder3.receiveShadow = true;
			cylinder3.castShadow = true;
			scene.add( cylinder3 );

			const gutter2 = new THREE.CylinderGeometry( 0.075, 0.075, 18.29, 30, 30, true, 2.3, 1.8 );
			const cylinder2 = new THREE.Mesh( gutter2, matPiste2 );
			cylinder2.position.set(10, -0.0731, -1.906);
			cylinder2.rotateZ(-Math.PI/2);
			cylinder2.receiveShadow = true;
			cylinder2.castShadow = true;
			scene.add( cylinder2 );

			//Ajout de la séparation des terrains

			var terrain1= new THREE.Mesh(
			  new THREE.BoxGeometry(18.29,0.075,0.2),
			  matPiste2);
			
			terrain1.position.set(10, 1.05 + 0.04995+0.09, -1.94);
			terrain1.castShadow = true;
			terrain1.receiveShadow = true;
			scene.add(terrain1);


			var terrain2= new THREE.Mesh(
			  new THREE.BoxGeometry(18.29,0.07,0.2),
			  matPiste2);
			
			terrain2.position.set(10, -0.165, -1.94);
			terrain2.castShadow = true;
			terrain2.receiveShadow = true;
			scene.add(terrain2);

			//Gros cube du fond composé de 4 rectangles
			
				//haut
			
					var fond= new THREE.Mesh(
					  new THREE.BoxGeometry(1.5,1.423,0.3),
					 matPiste2);
					fond.receiveShadow = true;
					fond.castShadow = true;
					fond.position.set(19.5, 0.513, -0.75);

				//gauche
				
					var fond2= new THREE.Mesh(
					  new THREE.BoxGeometry(1.5,0.07,1.5),
					 matPiste2);
					fond2.receiveShadow = true;
					fond2.castShadow = true;
					fond2.position.set(19.5, 1.05 + 0.04995+0.09, -1.5);

				//droite
			
					var fond3= new THREE.Mesh(
					  new THREE.BoxGeometry(1.5,0.07,1.5),
					  matPiste2
					  );
					fond3.receiveShadow = true;
					fond3.castShadow = true;
					fond3.position.set(19.5, -0.165, -1.5);

				//fond
				
					var fond1= new THREE.Mesh(
					  new THREE.BoxGeometry(0.3,1.45,1.5),
					  matPiste2
					);
					fond1.receiveShadow = true;
					fond.castShadow = true;
					fond1.position.set(20.1, 0.513, -1.5);
					scene.add(fond, fond1, fond3, fond2);

				//sol
			
					var ground = new THREE.BoxGeometry(21.5, 2, 1);
				 
					let ground1 = new THREE.Mesh(ground, matPiste3);
					ground1.castShadow = true;
					ground1.receiveShadow = true;
					ground1.position.set(9.6,0.5,-2.5);
					scene.add(ground1);

				//Mur du fond (beige)
				
					var mur1= new THREE.Mesh(
						new THREE.BoxGeometry(0.33,2,2),
						matPiste1
					);
					mur1.receiveShadow = true;
					mur1.castShadow = true;
					mur1.position.set(20.185, 0.499 , -1.2);
					scene.add(mur1);

				
			//partie avant la piste
			var socle= new THREE.Mesh(
				new THREE.BoxGeometry(2,2,0.07),
				matPiste1
			);
			socle.receiveShadow = true;
			socle.castShadow = true;
			socle.position.set(-.143, 0.5, -1.985);
			scene.add(socle);
			
			//partie côté de la piste
			var barriere1= new THREE.Mesh(
				new THREE.BoxGeometry(19.2,0.33,0.07),
				matPiste1
			);
			barriere1.receiveShadow = true;
			barriere1.position.set(10.45, 1.335, -1.985);
			scene.add(barriere1);

			var barriere2= new THREE.Mesh(
				new THREE.BoxGeometry(19.2,0.33,0.07),
				matPiste1
			);
			barriere2.receiveShadow = true;
			barriere2.castShadow = true;
			barriere2.position.set(10.45, -0.335, -1.985);
			scene.add(barriere2);
			
			//lignes fluo blanches
			
				const pointsF1 = [];
				pointsF1.push( new THREE.Vector3( 0.85, 1.04, -1.949 ) );
				pointsF1.push( new THREE.Vector3( 19, 1.04, -1.949 ) );
				
				const geometry4 = new THREE.BufferGeometry().setFromPoints( pointsF1 );
				const line4 = new THREE.Line( geometry4, materialFluo );
				scene.add( line4 );

				const pointsF2 = [];
				pointsF2.push( new THREE.Vector3( 0.85, -0.013, -1.95 ) );
				pointsF2.push( new THREE.Vector3( 19, -0.013, -1.945 ) );
				
				const geometry5 = new THREE.BufferGeometry().setFromPoints( pointsF2 );
				const line5 = new THREE.Line( geometry5, materialFluo );
				scene.add( line5 );

	

	//************************************************************
	//
	//  		  F I N   P I S T E   B O W L I N G
	//
	//************************************************************

	//************************************************************
	//
	//  		D E B U T     M E N U     G U I
	//
	//************************************************************

		var gui = new dat.GUI();
		
		var parameters={
			ptOrigine   : 0.5,
			posPt1 		: 0.5,
			posPt2 		: 0.5,
			posPt3 		: 0.5,
			posPt4 		: 0.5,
			posPt5 		: 0.5,
			ptFin  		: 0.5,
			vueAuto     : false,
			reset: function() {  }
		};
	
		let guiCbeBez = gui.addFolder("Trajectoire");
			
		//changement de la jonction 1 et pos origine boule
		
		let origine = guiCbeBez.add(parameters,'ptOrigine').min(0).max(1.05).name('posPt1').listen();
			origine.onChange(function (e) {
				
				y1 = e;
				
				//lineDown
					
					if(scene.getObjectByName('lineDownF'))
						scene.remove(scene.getObjectByName('lineDownF'));
					
					ptBegin.set(0.5 , y1 , -1.3 );
					jonction1.set(x1,y1,z1);
					sphere.position.set(x1,y1,z1);
					
					const pointsLine = lineDown.getPoints(20);
					const geomLine = new THREE.BufferGeometry().setFromPoints( pointsLine );
					const lineDownFinale = new THREE.Line( geomLine, matLine );
					
				//cbe Bezier 1
				
					if(scene.getObjectByName('courbeBezierF1'))
						scene.remove(scene.getObjectByName('courbeBezierF1'));
					
					const pointsB1 = courbeBezier1.getPoints(25);
					const geomBez1 = new THREE.BufferGeometry().setFromPoints( pointsB1 );
					const courbeBezierFinale1 = new THREE.Line(geomBez1, matBez1);
					courbeBezierFinale1.name = 'courbeBezierF1';
					scene.add(courbeBezierFinale1);
					
			});
		
		// point de controle 1 de bezier 1
		
		let pos1 = guiCbeBez.add(parameters,'posPt1').min(0).max(1.05).name('posPt1').listen();
		pos1.onChange(function (e) {
				
				ptCtrl1.set( 3, e , -1.85 );
				
				//Cbe Bezier 1 PLANE NON RECTILIGNE	
					
					if(scene.getObjectByName('courbeBezierF1'))
						scene.remove(scene.getObjectByName('courbeBezierF1'));
				
					const pointsB1 = courbeBezier1.getPoints(25);
					const geomBez1 = new THREE.BufferGeometry().setFromPoints( pointsB1 );
					const courbeBezF1 = new THREE.Line(geomBez1, matBez1);
					courbeBezF1.name = 'courbeBezierF1';
					scene.add(courbeBezF1);
					
			});
			
		// point de controle 2 de bezier 1
		
		let pos2 = guiCbeBez.add(parameters,'posPt2').min(0).max(1.05).name('posPt2').listen();
			pos2.onChange(function (e) {
				
				ptCtrl2.set( 3, e , -1.85 );
				
				//Cbe Bezier 1 PLANE NON RECTILIGNE
				
					if(scene.getObjectByName('courbeBezierF1'))
						scene.remove(scene.getObjectByName('courbeBezierF1'));
				
					const pointsB1 = courbeBezier1.getPoints(25);
					const geomBez1 = new THREE.BufferGeometry().setFromPoints( pointsB1 );
					const courbeBezF1 = new THREE.Line(geomBez1, matBez1);
					courbeBezF1.name = 'courbeBezierF1';
					scene.add(courbeBezF1);
					
				//Cbe Bezier 2 PLANE NON RECTILIGNE
						
					if(scene.getObjectByName('courbeBezierF2'))
						scene.remove(scene.getObjectByName('courbeBezierF2'));
							
					let vecCt1J21 = new THREE.Vector3(0,0,0);
					let vTan2 = new THREE.Vector3(0,0,0);

					vecCt1J21.subVectors(jonction21,ptCtrl2);
					
					let dot1 = ptCtrl2.dot(jonction21);
					let dot2 = ptCtrl3.dot(jonction22);
					
					let coef = dot1/dot2;
						
					vTan2.addScaledVector(vecCt1J21,coef);
					ptCtrl3.addVectors(jonction22,vTan2);
										
					const pointsB2 = courbeBezier2.getPoints(25);
					const geomBez2 = new THREE.BufferGeometry().setFromPoints( pointsB2 );
					const courbeBezF2 = new THREE.Line( geomBez2, matBez2 );
					courbeBezF2.name = 'courbeBezierF2';
					scene.add(courbeBezF2);
			});
			
		//changement de la jonction 2
		
		let pos3 = guiCbeBez.add(parameters,'posPt3').min(0).max(1.05).name('posPt3').listen();
			pos3.onChange(function (e) {
				
				y2 = e;
				
				jonction21.set(x2,y2,z2);
				jonction22.set(jonction21.x,jonction21.y,z2);
				
				if(scene.getObjectByName('courbeBezierF1'))
					scene.remove(scene.getObjectByName('courbeBezierF1'));
				if(scene.getObjectByName('courbeBezierF2'))
					scene.remove(scene.getObjectByName('courbeBezierF2'));				
				
				//Cbe Bezier 1 PLANE NON RECTILIGNE
				
					const pointsB1 = courbeBezier1.getPoints(25);
					const geomBez1 = new THREE.BufferGeometry().setFromPoints( pointsB1 );
					const courbeBezF1 = new THREE.Line(geomBez1, matBez1);
					courbeBezF1.name = 'courbeBezierF1';
					scene.add(courbeBezF1);
					
				//Cbe Bezier 2 PLANE NON RECTILIGNE
								
					let vecCt1J21 = new THREE.Vector3(0,0,0);
					let vTan2 = new THREE.Vector3(0,0,0);

					vecCt1J21.subVectors(jonction21,ptCtrl2);
					
					let dot1 = ptCtrl2.dot(jonction21);
					let dot2 = ptCtrl3.dot(jonction22);
					
					let coef = dot1/dot2;
						
					vTan2.addScaledVector(vecCt1J21,coef);
					ptCtrl3.addVectors(jonction21,vTan2);
										
					const pointsB2 = courbeBezier2.getPoints(25);
					const geomBez2 = new THREE.BufferGeometry().setFromPoints( pointsB2 );
					const courbeBezF2 = new THREE.Line( geomBez2, matBez2 );
					courbeBezF2.name = 'courbeBezierF2';
					scene.add(courbeBezF2);
			});
		
		// point de controle 1 de bezier 2
		
		let pos4 = guiCbeBez.add(parameters,'posPt4').min(0).max(1.05).name('posPt4').listen();
			pos4.onChange(function (e) {
				
				ptCtrl3.set(13, e , -1.85 );
				
				if(scene.getObjectByName('courbeBezierF1'))
					scene.remove(scene.getObjectByName('courbeBezierF1'));
				if(scene.getObjectByName('courbeBezierF2'))
					scene.remove(scene.getObjectByName('courbeBezierF2'));				
				
				//Cbe Bezier 1 PLANE NON RECTILIGNE
				
					const pointsB1 = courbeBezier1.getPoints(25);
					const geomBez1 = new THREE.BufferGeometry().setFromPoints( pointsB1 );
					const courbeBezF1 = new THREE.Line(geomBez1, matBez1);
					courbeBezF1.name = 'courbeBezierF1';
					scene.add(courbeBezF1);
					
				//Cbe Bezier 2 PLANE NON RECTILIGNE
													
					let vecCt2J22 = new THREE.Vector3(0,0,0);
					let vTan2 = new THREE.Vector3(0,0,0);

					vecCt2J22.subVectors(jonction22,ptCtrl3);
					
					let dot1 = ptCtrl2.dot(jonction21);
					let dot2 = jonction21.dot(jonction22);
					
					let coef = dot1/dot2;
						
					vTan2.addScaledVector(vecCt2J22,coef);
					ptCtrl2.addVectors(jonction22,vTan2);
										
					const pointsB2 = courbeBezier2.getPoints(25);
					const geomBez2 = new THREE.BufferGeometry().setFromPoints( pointsB2 );
					const courbeBezF2 = new THREE.Line( geomBez2, matBez2 );
					courbeBezF2.name = 'courbeBezierF2';
					scene.add(courbeBezF2);
			});
			
		// point de controle 2 de bezier 2
			
		let pos5 = guiCbeBez.add(parameters,'posPt5').min(0).max(1.05).name('posPt5').listen();
			pos5.onChange(function (e) {
				
				ptCtrl4.set(13, e , -1.85 );
				
				//cbe Bezier 2
				
					if(scene.getObjectByName('courbeBezierF2'))
							scene.remove(scene.getObjectByName('courbeBezierF2'));
					
					jonction22.set( x2 , y2 , z2 );
											
					const pointsB2 = courbeBezier2.getPoints(25);
					const geomBez2 = new THREE.BufferGeometry().setFromPoints( pointsB2 );
					const courbeBezierFinale2 = new THREE.Line( geomBez2, matBez2 );
					courbeBezierFinale2.name = 'courbeBezierF2';
					scene.add(courbeBezierFinale2);
				
			});
			
		// fin de bezier 2	
			
		let posFin = guiCbeBez.add(parameters,'ptFin').min(0).max(1.05).name('ptFin').listen();
			posFin.onChange(function (e) {
				
				
				ptCtrlEnd.set(19.6, e , -1.85 );

				//cbe Bezier 2
				
					if(scene.getObjectByName('courbeBezierF2'))
							scene.remove(scene.getObjectByName('courbeBezierF2'));
																
					const pointsB2 = courbeBezier2.getPoints(25);
					const geomBez2 = new THREE.BufferGeometry().setFromPoints( pointsB2 );
					const courbeBezierFinale2 = new THREE.Line( geomBez2, matBez2 );
					courbeBezierFinale2.name = 'courbeBezierF2';
					scene.add(courbeBezierFinale2);
				
			});
			
		// changement auto point de vue	
					
		let vueAutoParam = gui.add(parameters,'vueAuto').listen();
			vueAutoParam.onChange(function (e) {
				autoCam = e ? true : false;
			});
			
	//************************************************************
	//
	// 				 F I N     M E N U     G U I
	//
	//************************************************************

	// ajoute le rendu dans l'element HTML
	document.getElementById("webgl").appendChild(rendu.domElement);

	// affichage de la scene
	rendu.render(scene, camera);
	
	function reAffichageClelie() {
			
		if(scene.getObjectByName('courbe'))
			scene.remove(scene.getObjectByName('courbe'));
		
		for(var k=0;k<=nb;k++){
			let t2=Math.PI*n*(-0.5+k/nb);
			t2=t2.toPrecision(PrecisionArrondi);
			let x0,y0,z0;
			with(Math){
				x0=R*cos(t2/n)*cos(t2);
				y0=R*cos(t2/n)*sin(t2);
				z0=R*sin(t2/n);
			}
			points[k] = new THREE.Vector3(x0,y0,z0);
		}
		
		let PtsCbePara = new THREE.BufferGeometry().setFromPoints(points);
		let courbePara = new THREE.Line( PtsCbePara, mat2 );
		
		courbePara.name = 'courbe';	
		courbePara.translateX(sphere.position.x);
		courbePara.translateY(sphere.position.y);
		courbePara.translateZ(sphere.position.z);
		
		scene.add(courbePara);
	}

	let j = 0;	
	let pasJ = 0.01;
	let posToSet;

	function spawnBoule(){
		
		j += pasJ ;
		
		if( j + pasJ > 1 ){
			j = 1;
			moveB = null;
		}
		
		if ( j > 0.1 && j < 0.2 )
			pasJ = 0.013; 
		if ( j > 0.2 && j < 0.3 )
			pasJ = 0.015; 
		if ( j > 0.3 && j < 0.4 )
			pasJ = 0.018; 
		if ( j > 0.4 && j < 0.5 )
			pasJ = 0.022; 
		if ( j > 0.5 && j < 0.6 )
			pasJ = 0.025; 
		if ( j > 0.6 && j < 1 )
			pasJ = 0.028; 
		
		posToSet = lineDown.getPointAt(j);
		sphere.position.set(posToSet.x,posToSet.y,posToSet.z);
	}

	//fonction animation pour faire bouger la boule selon les cbes de bezier
	
		let l = 0;
		let m = 0;
		let pasL = 0.01;
		let pasM = 0.005
		let nbTraj = 1;
		let traj = courbeBezier1;
		
		function reMoveBoule(){
						
			if( nbTraj == 1 ){
				
				l += pasL;
								
				if( l + pasL > 1 ){
					l = 1;
					nbTraj = 2;
				}
				if ( l > 0 && l < 0.3 ){
					pasL = 0.008; 
					nbP2 = 0.070;								
				}
				if ( l > 0.3 && l < 0.6 ){
					pasL = 0.008; 
					nbP2 = 0.065;
					if(autoCam)
						changePtView();
				}
				if ( l > 0.6 && l < 1 ){
					pasL = 0.007; 
					nbP2 = 0.060;				
				}			
				posToSet = traj.getPointAt(l);					
			}
			else{	
				if( l >= 1 )
					traj = courbeBezier2;
				
				m += pasM;
				
				if( m + pasM > 1 ){
					m = 1 ;
					nbP2 = 0;				
				}
				if ( m > 0 && m < 0.3 ){ 
					nbP2 = 0.045;				
				}
				if ( m > 0.3 && m < 0.6 ){
					pasM = 0.004; 
					nbP2 = 0.040;					
				}
				if ( m > 0.6 && m < 1 ){
					pasM = 0.003; 
					nbP2 = 0.030;				
				}	
				posToSet = traj.getPointAt(m);
			}
			sphere.position.set(posToSet.x,posToSet.y,posToSet.z);
			if(autoCam)
				changePtView();	
		}


	function resetBezGui(){
		//reinitialisation courbes bezier et gui
		//( car inutile de faire 2x le meme lancer )
			
			y1 = 0.5;	
			y2 = 0.5;
			
			ptBegin.set( 0.5 , 0.5 , -1.3 );
			ptCtrl1.set( 3, 0.5, -1.85 );
			ptCtrl2.set( 6, 0.5, -1.85 );
			
			ptCtrl3.set( 13, 0.5, -1.85 );
			ptCtrl4.set( 16, 0.5, -1.85 );
			ptCtrlEnd.set( 19.7, 0.5, -1.9 );
			
			parameters.ptOrigine  = 0.5;
			parameters.posPt1 	= 0.5;
			parameters.posPt2 	= 0.5;
			parameters.posPt3 	= 0.5;
			parameters.posPt4 	= 0.5;
			parameters.posPt5 	= 0.5;
			parameters.ptFin  	= 0.5;	
			
			stats.update()
			
			//lineDown
				
				if(scene.getObjectByName('lineDownF'))
					scene.remove(scene.getObjectByName('lineDownF'));
			
				jonction1.set(0.5,0.5,-1.85);
				sphere.position.set(0.5,0.5,-1.85);
				
				const pointsLine = lineDown.getPoints(20);
				const geomLine = new THREE.BufferGeometry().setFromPoints( pointsLine );
				const lineDownFinale = new THREE.Line( geomLine, matLine );
			
			//Cbe Bezier 1 PLANE NON RECTILIGNE
			
				if(scene.getObjectByName('courbeBezierF1'))
					scene.remove(scene.getObjectByName('courbeBezierF1'));
			
				jonction21.set(10,0.5,-1.85);
			
				const pointsB1 = courbeBezier1.getPoints(25);
				const geomBez1 = new THREE.BufferGeometry().setFromPoints( pointsB1 );
				const courbeBezF1 = new THREE.Line(geomBez1, matBez1);
				courbeBezF1.name = 'courbeBezierF1';
				scene.add(courbeBezF1);
			
			//Cbe Bezier 2 PLANE NON RECTILIGNE
				
				if(scene.getObjectByName('courbeBezierF2'))
					scene.remove(scene.getObjectByName('courbeBezierF2'));
				
				jonction22.set(10,0.5,-1.85);
				
				vecCt1J21.set(0,0,0);
				vTan2.set(0,0,0);

				vecCt1J21.subVectors(jonction21,ptCtrl2);
				
				dot1 = ptCtrl2.dot(jonction21);
				dot2 = ptCtrl3.dot(jonction22);
				
				coef = dot1/dot2;
					
				vTan2.addScaledVector(vecCt1J21,coef);
				ptCtrl3.addVectors(jonction22,vTan2);
									
				const pointsB2 = courbeBezier2.getPoints(25);
				const geomBez2 = new THREE.BufferGeometry().setFromPoints( pointsB2 );
				const courbeBezF2 = new THREE.Line( geomBez2, matBez2 );
				courbeBezF2.name = 'courbeBezierF2';
				scene.add(courbeBezF2);
	}

	//fonction qui sert à ramener la boule au point de départ
	function resetBoule(){	
		//on regarde s'il y a un strike et que tour est inférieur à 8 (tour max)
			if(strike(tour))
				tour++;		
		//si le nombre de tour max n'est pas franchit
			if(tour<=8){
				nbQTb = 0;
				
				finG=false;
				
				tour++

				sphere.position.set( 0.5 , 0.5 , -1.3 );
					
				//on regarde si la boule doit être noire ou blanche selon le nombre de tours
				
					if( tour==3 || tour==4 || tour==7 || tour==8 ){
						sphere.material.color.setHex(0xffffff);
						courbePara.material.color.setHex(0x222222);
					}
					else{
						sphere.material.color.setHex(0x222222);
						courbePara.material.color.setHex(0xffffff);
					}
					if(tour==3 || tour==5 || tour==7){
						resetQuilles();
					}
	
				// reinitialise les param pour les animations
	
					l = 0;
					j = 0;
					m = 0;
					pasL = 0.01;
					pasM = 0.005;
					nbTraj = 1;
					traj = courbeBezier1;
					moveB=false;
					vueCam = 1;
					center.set( 0.5 , 0.5 , -1.85 );
					camera.position.set( -0.3 , 0.5 , -1.3 );
					camera.lookAt(center);
				
				// reset boule 
					reBoule();
				// reset gui + bezier
					resetBezGui();	
			}
	}

	

	//Fonction fin partie, demande si on veut rejouer
	function fin(){
		if(finG==false)
			setTimeout(function () {
				answer = prompt("Voulez-vous rejouer? \n y - oui \n n - non");
				finG=true;
			}, 0);
		if(answer=="oui" || answer=="y"){
			tour=1;
			
			sphere.material.color.setHex(0x222222);
			courbePara.material.color.setHex(0xffffff);
			
			reBoule();
			
			document.getElementById("tour1J1").innerHTML = "-";
			document.getElementById("tour2J1").innerHTML = "-";
			document.getElementById("tour3J1").innerHTML = "-";
			document.getElementById("tour4J1").innerHTML = "-";
			document.getElementById("tour1J2").innerHTML = "-";
			document.getElementById("tour2J2").innerHTML = "-";
			document.getElementById("tour3J2").innerHTML = "-";
			document.getElementById("tour4J2").innerHTML = "-";
			
			document.getElementById("totalJ1").innerHTML = "-";
			document.getElementById("totalJ2").innerHTML = "-";
			
			document.getElementById("gagnant").innerHTML = "";
			
			
			resetBezGui();
			resetQuilles();
		}
		else
			tour = -1;
	}
	
	//fonction pour decider quelle fonction appeller
	function reBoule() {
		setTimeout(function () {

			//si moveB == null, on ne fait rien ( en attente d'un lancer | moins de calculs ! )
			if(moveB == null){}
			else // sinon si moveB == true, on lance la boule, sinon on la fait tomber
				moveB ? reMoveBoule() : spawnBoule();
				
			//Si la boule est en fin de piste && strike	
			if( sphere.position.x >= 19.55 && strike(tour) ){
				point();
				tour++
				resetBoule();
			}
			//Sinon, Si la boule est en fin de piste ( == !strike )
			else if(sphere.position.x>=19.55){
				point();
				resetBoule();	
			}
		}, 1000); 
		rendu.render(scene,camera);
	}
	
	renduAnim();

	function renduAnim() {
		stats.update();
		requestAnimationFrame(renduAnim);
		
		reAffichageClelie();
	
		if(sphere.position.x >= 17.6){
			if(collisionQuille(sphere,quille1)){			
				if(scene.getObjectByName("Quille1"))
					nbQTb++
				disparition(quille1);
			}
			if(collisionQuille(sphere,quille2)){				
				if(scene.getObjectByName("Quille2"))
					nbQTb++
				disparition(quille2);
			}
			if(collisionQuille(sphere,quille3)){				
				if(scene.getObjectByName("Quille3"))
					nbQTb++
				disparition(quille3);
			}
			if(collisionQuille(sphere,quille4)){				
				if(scene.getObjectByName("Quille4"))
					nbQTb++
				disparition(quille4);
			}
			if(collisionQuille(sphere,quille5)){				
				if(scene.getObjectByName("Quille5"))
					nbQTb++
				disparition(quille5);
			}
			if(collisionQuille(sphere,quille6)){				
				if(scene.getObjectByName("Quille6"))
					nbQTb++
				disparition(quille6);
			}
			if(collisionQuille(sphere,quille7)){				
				if(scene.getObjectByName("Quille7"))
					nbQTb++
				disparition(quille7);
			}
			if(collisionQuille(sphere,quille8)){				
				if(scene.getObjectByName("Quille8"))
					nbQTb++
				disparition(quille8);
			}
			if(collisionQuille(sphere,quille9)){				
				if(scene.getObjectByName("Quille9"))
					nbQTb++
				disparition(quille9);
			}
			if(collisionQuille(sphere,quille10)){
				if(scene.getObjectByName("Quille10"))
					nbQTb++
				disparition(quille10);
			}	
		}
		
		if(tour!=-1){
			if(tour<=8)
				reBoule();
			else{
				if(parseInt(parseInt(document.getElementById("totalJ1")).innerHTML)>parseInt(document.getElementById("totalJ2").innerHTML))
					document.getElementById("gagnant").innerHTML = "Le gagnant est l'&eacute;quipe 1 !";
				if(parseInt(parseInt(document.getElementById("totalJ1")).innerHTML)<parseInt(document.getElementById("totalJ2").innerHTML))
					document.getElementById("gagnant").innerHTML = "Le gagnant est l'&eacute;quipe 2 !";				
				else
					document.getElementById("gagnant").innerHTML = "&Eacute;galit&eacute; !";
			
				fin();
			}
		}
	
		rendu.render(scene, camera);
	}

} // fin fonction init()


