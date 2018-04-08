//import 

class Player extends Character{
	constructor(n,c,id,im,inf){
	super(n,c,id,im)
	this.infos = inf

	//this.effect : liste d'effets / need le fichier Effect

	//this.comm_handler : need le fichier comm handler
	//this.button 

	}

	addPV(n){
		 
	}


	addCA(n){

	}

	addEffect(e){
		// Need this.effect
	}

	 createPlayer(inf, t){
	 	this.infos = inf
	 	this.comm_handler = t


	 } 

	resumePlayer(name,t){
		this.comm_handler = t

		// comparer le name avec celui des infos ? 

	}

