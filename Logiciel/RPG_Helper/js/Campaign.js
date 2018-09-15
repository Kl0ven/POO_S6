

class Campaign{
	constructor(n,apc,r,encounters = [],hour = "00h00",day = 1,story = "" ){
		this.active = 0;
		this.name = n;
		this.launched = 0;
		this.FightList = [];
		this.InFight = 0;
    this.app_PC = apc;



		this.infos_campaign = {"name" : this.name,
							   					"encounters" : undefined,
                          "hour":hour,
                          "day": day,
                          "story": story,
													"resume":r
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
				var d = this.addDesc(es[enc].name,new Description($("#descs"),es[enc].name,this.app_PC,d.m,d.url))
				d.hide();
			}
			// chargement des monstres

			for (var monst in es[enc].monsters) {
				var d = es[enc].monsters[monst];
				this.addMonster(es[enc].name,new Monster(d.name,d.PV,d.CA))
			}

		}

	}


	resumePlayer(name,comh){
		
		for (var p in this.players) {
			if (this.players[p].name == name) {

				if(typeof this.players[p].comm_handler == "undefined"){
				

					this.players[p].comm_handler = comh;
					this.players[p].load();
				}else{
					comh.getName(this.getPlayersNames());
				}
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
		return desc;
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
		var dir = nw.App.dataPath+'\\save\\';
		
		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		dir = dir + this.name;
		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		if(!fs.existsSync(dir+"\\players\\")){
			fs.mkdirSync(dir+"\\players/");
		}
		  // Création d'un fichier JSON campagne
		var file =nw.App.dataPath+ '\\save\\' + this.name + '\\' + this.name +'.json'
		if (this.launched) {
			this.infos_campaign.resume = true;
			for (var p in this.players) {
				this.players[p].save();
			}
		}

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
		jsonfile.writeFile(file,this.infos_campaign);
		$("#waiting_players").empty();

	}

	savePlayer(data){

		//Creation du fichier JSON du joueur

		
		var file = nw.App.dataPath+'\\save\\' + this.name + '\\players\\' + data.cara.name + '.json'

		//Ecriture des infos dans le fichier
		jsonfile.writeFile(file,data)
	}

	modhour(qte){
		if(isNaN(qte)){return false;}

		var heure = (parseInt(this.infos_campaign.hour.split("h")[0])+parseInt(qte))
		var jour  = this.infos_campaign.day+Math.floor(heure/24);
		heure = heure%24;
		
		
		if(heure<0){
			
			heure += 24;
		}
		if(jour < 1 ){
			
			jour = 1;
			heure = 0;
		}
		this.infos_campaign.hour = heure.toString()+"h00";
		this.infos_campaign.day =  jour;
		$("#hour").text(this.infos_campaign.hour);
		$("#day").text(this.infos_campaign.day);


		if (typeof this.app_PC.comm != "undefined"){
		//affichage sur portable
		this.app_PC.comm.modTime(qte,false,this.infos_campaign.hour);
		}

		//Vie des effets qui sont en heure

		this.app_PC.UI.liveEffect(this.name,false,qte);
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

	is_resume(){
		return this.infos_campaign.resume;
	}
	addPlayer(psave){
		this.players.push(new Player(psave.cara.name,psave.cara.PV,psave.cara.CA,undefined,psave));
	}

	getPlayersNames(){
		var names = []
		for (var p in this.players) {
			if(typeof this.players[p].comm_handler == "undefined"){
			names.push(this.players[p].name);
			}
		}
		return names
	}
}
