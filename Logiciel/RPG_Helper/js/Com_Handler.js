class Com_Handler {
	constructor(com,ws){
		this.com = com;
		this.ws = ws;
		this.setup()
	}
	playerConnection(pinfos,resume){
		if (resume==0){
			this.getInfo();
		}
		else {
			this.getName(pinfos);
			
		}
	}

	
	modCar(pv,ca){
		ws.send(JSON.stringify({"type": "cara","data": {"PV":pv,"CA":ca}}))

	}

	setPlayer(p){
		this.player = p;
	}



	getInfo() {
		ws.send(JSON.stringify("type" : "new","data": null)) //On envoie une demande d'infos de nouveau joueur
	}

	getName(pinfos) {
		ws.send(JSON.stringify("type" : "choice","data": pinfos))
	}

	setup(){
		this.ws.onmessage = (event) => { //Fonction de récéption de message entrant
			try {
        		var obj = JSON.parse(event.data) //On essaye de récupérer notre trame
     		} catch (e) {
        		console.log(e); //On affiche l'erreur si la trame n'a pas pu être récupérée
      			}


		}
		if(obj.type == "newrep"){ //Le joueur a envoyé ses informations
			infos = obj.data; //On enregistre les infos
			this.com.pc_app.campaign.addPlayer(infos,this);

		}
		else if(obj.type == "choicerep"){ //Si le joueur a choisi son nom
			name = obj.data; //On enregistre le nom
			this.com.pc_app.campaign.resumePlayer(name,this); //On apelle resumeplayer de campaign avec le nom et cet objet
		}
		else { //On veut sauvegarder le joueur


		}
	}

}