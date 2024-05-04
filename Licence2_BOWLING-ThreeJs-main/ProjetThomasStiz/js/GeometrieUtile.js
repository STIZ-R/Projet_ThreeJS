
// test si un nombre est nul:
const PrecisionArrondi=50;
const epsilon = 0.00000001;

function testZero(x){
	var val=parseFloat(Number(x).toPrecision(PrecisionArrondi));
	if (parseFloat(Math.abs(x).toPrecision(PrecisionArrondi))<epsilon) val=0;
	return val;
}

//vecteur AB qui est une fleche
function vecteurTan(MaScene,A,vB,CoulHexa,longCone,RayonCone){
	let B = new THREE.Vector3( 0, 0, 0);
	B.addVectors(A,vB);
	vecteur(MaScene,A,B,CoulHexa,longCone,RayonCone);
}

//vecteur AB qui est une fleche
function vecteur(MaScene,A,B,CoulHexa,longCone,RayonCone){
	var vecAB = new THREE.Vector3( B.x-A.x, B.y-A.y, B.z-A.z );
	vecAB.normalize();
	MaScene.add( new THREE.ArrowHelper( vecAB, A, B.distanceTo(A), CoulHexa,longCone,RayonCone ));
}
