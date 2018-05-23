

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
                          }

		this.encounters = encounters;

/*		this.encounter =  { name : undefined,
						  	monsters : {name : undefined,
						   			   	PV : undefined,
						   			   	CA : undefined }
						   	}
						   	*/

		this.players_infos = {}; // liste d'objet JSON qui contient les infos de tous les joueurs
		this.players = []; 		 // Liste de Players


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
						  monsters : []
						  }

		this.encounters.push(encounter)

		console.log(this.encounters)

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
		
		this.infos_campaign.encounters = this.encounters;
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
