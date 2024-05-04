
 function cameraLumiere(scene,camera){   // creation de la camera 
	camera.up = new THREE.Vector3( 0, 0, 1 );
	var xPos=-0.3;
	//modification de la jauge si document.forms["controle"].PosX.value;
	var yPos=0.5;//document.forms["controle"].PosY.value;//*document.forms["controle"].zoom.value;
	var zPos=-1.3;//document.forms["controle"].PosZ.value;//*document.forms["controle"].zoom.value;
	var xDir=0;//document.forms["controle"].DirX.value;
	var yDir=0;//document.forms["controle"].DirY.value;
	var zDir=0;//testZero(document.forms["controle"].DirZ.value);
	camera.position.set(xPos, yPos, zPos);
	camera.lookAt(xDir, yDir, zDir);	
	
} // fin fonction cameraLumiere
 


//*************************************************************
//* 
//        F I N     C A M E R A
//
//*************************************************************

 function lumiere(scene){
	let lumPt = new THREE.PointLight(0x121212);
	lumPt.position.set(5,0.5,3);
	lumPt.intensity = 6;
	lumPt.castShadow = true; // default false
	lumPt.receiveShadow = true;
	lumPt.shadow.mapSize.width = 1000; 
	lumPt.shadow.mapSize.height = 10000; 
	lumPt.shadow.camera.near = 0.5; 
	lumPt.shadow.camera.far = 25;
	lumPt.shadow.bias -= 0.0005;	
	scene.add(lumPt);
	

}
