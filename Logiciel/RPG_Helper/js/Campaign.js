

class Campaign{
	constructor(n,encounters = [],hour = "00h00",day = 1,story = "" ){
		this.resume = 0;
		this.active = 0;
		this.name = n;


		this.infos_campaign = {"name" : this.name,
							   "encounters" : undefined,
                          	   "hour":hour,
                          	   "day": day,
                          	   "story": story
                          };
		this.encounters = [];
		this.loadEncounters(encounters);

/*		this.encounter =  { name : undefined,
						  	monsters : {name : undefined,
						   			   	PV : undefined,
						   			   	CA : undefined }
						   	}
						   	*/

		this.players_infos = {}; // liste d'objet JSON qui contient les infos de tous les joueurs
		this.players = []; 		 // Liste de Players


	}

	loadEncounters(es){
		for (var enc in es) {
			this.addEncounter(es[enc].name);

			// ajout des description
			for (var desc in es[enc].description) {
				var d = es[enc].description[desc];
				this.addDesc(es[enc].name,new Description($("#descs"),d.m,d.url))
			}
			// c'est ici u'il faut charger les monstres
		}


	}

	addPlayer(inf,com){

		var P = new Player('test')

		var new_infos =
			{
			name : inf.cara.name,
			id : P.id,
			PV : inf.cara.PV,
			CA : inf.cara.CA
			}

		P.createPlayer(new_infos,com)

		this.players.push(P)
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

		console.log(this.encounters)

	}

	addDesc(encounter,desc){
		for (var d in this.encounters) {
			if (this.encounters[d].name == encounter) {
				this.encounters[d].description.push(desc);
			}
		}

	}

	addMonster(encounter,name,pv,ca){

    var size = this.encounters.length
		console.log(size)

		for (var i =0; i < size; i ++) {
			if (this.encounters[i].name == encounter){

				this.encounters[i].monsters.push( {"name" : name,
						   			   			   PV : pv,
						   			   	           CA : ca })
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

//__________________________________________ Test trame de données

//  $(document).ready(function(){


// 	inf = {"cara":{"PV": 23, "CA":50, PO :2500,"name":"babar" }}
// 	t = null

// 	C1 = new Campaign('C1')
// 	C1.addPlayer(inf,t)
// 	C1.addPlayer(inf,t)
// 	screenlog(C1.players[0].infos.name)
// 	screenlog(C1.players[1].infos.PV)


// });
// 	function screenlog(message) {
//    	$("#screenlog").append("<p>"+message+"</p>")
//  	}
