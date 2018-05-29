

class Campaign{
	constructor(n,apc,encounters = [],hour = "00h00",day = 1,story = "" ){
		this.resume = 0;
		this.active = 0;
		this.name = n;
		this.launched = 0;
		this.FightList = [];
    this.app_PC = apc;



		this.infos_campaign = {"name" : this.name,
							   "encounters" : undefined,
                          	   "hour":hour,
                          	   "day": day,
                          	   "story": story
                          };
		this.encounters = [];
		this.loadEncounters(encounters);


		this.players_infos = {}; // liste d'objet JSON qui contient les infos de tous les joueurs
		this.players = []; 		 	// Liste de Players


	}
	isMonsterNameExist(name,rencontre){
		for (var en in this.encounters) {
			if(this.encounters[en].name == rencontre){
				for (var m in this.encounters[en].monsters) {
					if (this.encounters[en].monsters[m].getName() == name) {
						return true;
					}
				}
			}
		}
		return false;
	}

	loadEncounters(es){

		for (var enc in es) {
			this.addEncounter(es[enc].name);

			// ajout des description
			for (var desc in es[enc].description) {
				var d = es[enc].description[desc];
				this.addDesc(es[enc].name,new Description($("#descs"),es[enc].name,this.app_PC,d.m,d.url))
			}
			// chargement des monstres

			for (var monst in es[enc].monsters) {
				var d = es[enc].monsters[monst];
				this.addMonster(es[enc].name,new Monster(d.name,d.PV,d.CA))
			}

		}

	}


	resumePlayer(inf,com){

		for (var i = 0 ; i <= this.players.length ; i++){ // pour tous les Player dans players[]
			if (inf.cara.name == players[i].infos.name){  // Si le nom envoyé dans inf = nom du player

				players[i].resumePlayer(inf,com)		  // On lie le player a un comm_handler, et on actualise ses infos

			}
		}
	}


	addEncounter(n){

		var encounter = { name : n,

						  monsters : [],
							description : []
						  }
		this.encounters.push(encounter)


	}

	addDesc(encounter,desc){
		for (var d in this.encounters) {
			if (this.encounters[d].name == encounter) {
				this.encounters[d].description.push(desc);
			}
		}

	}


	addMonster(encounter,monst){
		for (var d in this.encounters) {
			if (this.encounters[d].name == encounter) {
				this.encounters[d].monsters.push(monst);
			}
		}

	}

	saveCamp(hist){


		// Création d'un fichier de campagne
		var dir = './save/' + this.name;

		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		  // Création d'un fichier JSON campagne
		var file = './save/' + this.name + '/' + this.name +'.json'


		  // Ecriture dans le fichier JSON des infos
		this.infos_campaign.story = hist;

		var encountersSave = [];
		for (var en in this.encounters) {
			//on enregistre les descriptions
			var descriptionSave = [];
			for (var desc in this.encounters[en].description) {
				descriptionSave.push(this.encounters[en].description[desc].getInfos());

			}
			// c'est ici u'il fau faire la sauvegarde des monstres
			encountersSave.push({
				"name":this.encounters[en].name,
				"description":descriptionSave,
				"monsters":this.encounters[en].monsters
			})
		}
		this.infos_campaign.encounters = encountersSave;
		var infos = this.infos_campaign;
		jsonfile.writeFile(file,infos);

	}

	savePlayer(p){
		//Creation du fichier JSON du joueur
		var file = './save/' + this.name + '/' + p.infos.name + '.json'

		//Ecriture des infos dans le fichier
		var infos = p.getInfos()
		jsonfile.writeFile(file,infos)
	}

	modhour(qte){
		if(isNaN(qte)){return false;}

		var heure = (parseInt(this.infos_campaign.hour.split("h")[0])+parseInt(qte))
		var jour  = this.infos_campaign.day+Math.floor(heure/24);
		heure = heure%24;
		console.log("h = "+heure);
		console.log("j = "+jour);
		if(heure<0){
			console.log("h<0");
			heure += 24;
		}
		if(jour < 1 ){
			console.log("j<0");
			jour = 1;
			heure = 0;
		}
		this.infos_campaign.hour = heure.toString()+"h00";
		this.infos_campaign.day =  jour;
		$("#hour").text(this.infos_campaign.hour);
		$("#day").text(this.infos_campaign.day);
	}

	hideAll(){
		for (var e in this.encounters) {
			for (var d in this.encounters[e].description) {
					this.encounters[e].description[d].hide();
			}
		}

	}

	setDesc(rencontre){

		this.hideAll();
		for (var e in this.encounters) {
			if(this.encounters[e].name == rencontre){
				for (var d in this.encounters[e].description) {
						this.encounters[e].description[d].show();
				}
			}
		}

	}


}
