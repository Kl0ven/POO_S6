

class Player extends Character{
	constructor(n,pv,ca,comm_h,infos_mobile = {}){
	super(n)
	this.infos_mobile = infos_mobile;

	this.infos = {
		name : this.name,
		id : this.id,
		PV : pv,
		CA : ca
	}

	this.effects = [];

	this.comm_handler = comm_h;

	this.btnPVpl = undefined;

	}

	modPV(n){
	this.infos.PV = this.infos.PV + n;

	}

	// envoyer changement a communication handler ?


	modCA(n){
	this.infos.PV = this.infos.PV + n
	}

	getInfos(){
		return this.infos
	}

	addEffect(e){
		this.effects.push(e);
	}

	getEffect(i){
		return this.effects[i];
	}

	createPlayer(inf, t){
	 	this.infos = inf
	 	this.comm_handler = t
	}

	load(){
	 	this.comm_handler.load(this.infos_mobile);
	}

	sendInfos(){
		this.comm_handler.modCar(this.infos.PV,this.infos.CA)

	}

	save(){
		if (typeof this.comm_handler != "undefined") {
					this.comm_handler.save();
		}

	}

	//resumePlayer(name,t){  --> Le resumeplayer est géré par la Campagne
	//}

	//send(img){					?? A voir
	//	comm_handler.send(img)
	//}

}

/*
_____________________________________________Tests
 $(document).ready(function(){

 P1 = new Player('zangdar')
 screenlog(JSON.stringify(P1.infos))
 P1.addPV(10)
 screenlog(JSON.stringify(P1.infos))


screenlog(P1.id)
P2 = new Player('Tordek')
screenlog(P2.id)

});


 function screenlog(message) {
   $("#screenlog").append("<p>"+message+"</p>")
 }
 */
