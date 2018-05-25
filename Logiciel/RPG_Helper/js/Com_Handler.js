class Com_Handler {
	constructor(com,ws,camp){
		this.com = com;
		this.ws = ws;
		this.player = undefined;
		this.camp = camp;
		this.setup();	
	}
	playerConnection(pinfos,resume){
		if (resume==0){
			return this.getInfo();
		}
		else {
			this.getName(pinfos);
			
		}
	}

	
	modCar(pv,ca){

		this.ws.send(JSON.stringify({"type": "cara","data": {"PV":pv,"CA":ca}}));
	}

	modEffect(e){
		this.ws.send(JSON.stringify({"type": "effect","data" : {"bonus": e.bonus,"duration": e.duration,"unit": e.unit,"description":e.desc}}));
	}

	modTime(qte,in_fight,time){
		this.ws.send(JSON.stringify({"type": "time","data": {"qte":qte,"in_fight":in_fight,"time":time}}));
	}

	setPlayer(p){
		this.player = p;
	}

	save(){
		this.ws.send(JSON.stringify({"type" : "save","data": null}));
	}

	getInfo() {
		this.ws.send(JSON.stringify({"type" : "new","data": null})); //On envoie une demande d'infos de nouveau joueur
	}

	getName(pinfos) {
		this.ws.send(JSON.stringify({"type" : "choice","data": pinfos}));
	}

	setup(){
		this.ws.onmessage = (event) => { //Fonction de récéption de message entrant
			try {
        		var obj = JSON.parse(event.data);
        		console.log(obj); //On essaye de récupérer notre trame
     		} catch (e) {
        		console.log(e); //On affiche l'erreur si la trame n'a pas pu être récupérée
      			}


		if(obj.type == "newrep"){ //Le joueur a envoyé ses informations
			var infos = obj.data; //On enregistre les infos
			console.log(infos)

			//instanciation du joueur avec ses carac
			var n_player = new Player(infos.cara.name,infos.cara.PV,infos.cara.CA,this);
			//liaison au comm handler
			this.player = n_player;
		
			//ajout du joueur a la campagne
			this.com.pc_app.campaigns[this.camp].players.push(n_player)
			//affichage du joueur
			$("#waiting_players").append('<div id ="'+infos.cara.name+'">'+infos.cara.name+'</div>');
			

		}
		else if(obj.type == "choicerep"){ //Si le joueur a choisi son nom
			var name = obj.data; //On enregistre le nom
			this.player.campaign.resumePlayer(name,this); //On apelle resumeplayer de campaign avec le nom et cet objet
			}
		else { //On veut sauvegarder le joueur
			this.player.campaign.save(obj.data); //On envoie les infos du joueur, pc app se charge de la sauvegarde

			}
		}
	}

}