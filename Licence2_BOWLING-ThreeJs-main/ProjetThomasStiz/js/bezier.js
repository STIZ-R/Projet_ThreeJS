 
function fact(n){
	if (n>1)
		return n*fact(n-1);
	else return 1;
}

function Ber(t1,i,n) {
  var val=0;
  switch(i){
    case 0 :  val=Math.pow(1.-t1,n);
              break;
    case n :  val=Math.pow(t1,n);
              break;
    default : val=(fact(n)/fact(i)/fact(n-i)*Math.pow(1.-t1,n-i)*Math.pow(t1,i));
  }
  val=testZero(val);
  return val.toPrecision(PrecisionArrondi);
}

function TraceBezierCubique(P0, P1, P2, P3,nbPts,coul){
 let cbeBez = new THREE.CubicBezierCurve3(P0, P1, P2, P3);
 let Points = cbeBez.getPoints(nbPts);
 let cbeGeometry = new THREE.BufferGeometry().setFromPoints(Points);
 let BezierCubique = new THREE.Line( cbeGeometry, coul );
 return (BezierCubique);
}  // fin fonction THREE.CubicBezierCurve


function latheBez3(nbePtCbe,nbePtRot,P0,P1,P2,P3,mat){
	
	let p0= new THREE.Vector2(P0.x,P0.y);
	let p1= new THREE.Vector2(P1.x,P1.y);
	let p2= new THREE.Vector2(P2.x,P2.y);
	let p3= new THREE.Vector2(P3.x,P3.y);
	
	let tabp= new Array(4);
	for (let j=0;j<tabp.length;j++)
		tabp[j]= new THREE.Vector2(0,0);
	
	tabp[0].copy(p0);tabp[1].copy(p1);
	tabp[2].copy(p2);tabp[3].copy(p3);
	
	// points de la courbe de Bezier
	
		let points = new Array(nbePtCbe+1);
		
		for(let k=0;k<=(nbePtCbe+1);k++){
			
			let t2=k/nbePtCbe; 
			
			t2=t2.toPrecision(PrecisionArrondi);
			
			let v0= new THREE.Vector2(0,0);
			
			v0.addScaledVector(tabp[0],Ber(t2,0,tabp.length-1));
			
			for(let j=1;j<tabp.length;j++){
				let v1= new THREE.Vector2(0,0);
				v1.addScaledVector(tabp[j],Ber(t2,j,tabp.length-1));
				v0.add(v1);
			}
			points[k] = new THREE.Vector2(v0.x,v0.y);
		}
		
	let latheGeometry = new THREE.LatheGeometry(points,nbePtRot); 
	
	let lathe = new THREE.Mesh(latheGeometry,mat);
	return lathe;
}// fin latheBez3

