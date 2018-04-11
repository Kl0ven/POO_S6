//import 

class Player extends Character{
	constructor(n,id){
	super(n,id)

	this.infos = {
		name : this.name,
		id : this.id,
		PV : 0,
		CA : 0
	}

	this.pc_effect = []

	this.comm_handler = null

	//this.button ? 

	}

	modPV(n){
	this.infos.PV = this.infos.PV + n
	}


	modCA(n){
	this.infos.PV = this.infos.PV + n
	}

	getInfos(){
		return this.infos
	}

	addEffect(e){
		this.pc_effect.push(e)
	}

	getEffect(){
		return this.pc_effect
	}

	createPlayer(inf, t){
	 	this.infos = inf
	 	this.comm_handler = t
	} 


	//resumePlayer(name,t){  --> Le resumeplayer est géré par la Campagne
	//}

	//send(img){					?? A voir
	//	comm_handler.send(img)
	//}

}


//_____________________________________________Tests 
// $(document).ready(function(){

// P1 = new Player('zangdar',1)
// screenlog(JSON.stringify(P1.infos))
// P1.addPV(10)
// screenlog(JSON.stringify(P1.infos))
// });



// function screenlog(message) {
//   $("#screenlog").append("<p>"+message+"</p>")
// }