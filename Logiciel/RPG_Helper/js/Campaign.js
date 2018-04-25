var fs = require('fs');
var jsonfile = require('jsonfile')

class Campaign{
	constructor(n){
		this.resume = 0;
		this.name = n;
		this.infos_campaign = {name : this.name}
		this.players_infos = {}; // liste d'objet JSON qui contient les infos de tous les joueurs
		this.players = []; 		 // Liste de Players
		
		//utilité ? 
		//this.info = 0;
		//this.carac = 0;

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


	saveCampaign(){
		// Création d'un fichier de campagne 
		var dir = './save/' + this.name;

		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		  // Création d'un fichier JSON campagne 
		var file = './save/' + this.name + '/' + this.name +'.json'

		  // Ecriture dans le fichier JSON des infos 
		var infos = this.infos_campaign 
		jsonfile.writeFile(file,infos)
	}

	savePlayer(p){
		//Creation du fichier JSON du joueur 
		var file = './save/' + this.name + '/' + p.infos.name + '.json'
		
		//Ecriture des infos dans le fichier 
		var infos = p.getInfos()
		jsonfile.writeFile(file,infos)
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

// _______________________________________________________Tests sauvegarde 

	// C1 = new Campaign('C1')
	// C1.saveCampaign()

	// inf1 = {"cara":{"PV": 23, "CA":50, PO :2500,"name":"babar" }}
	// inf2 = {"cara":{"PV": 23, "CA":50, PO :2500,"name":"Zangdar" }}
 // 	t = null

 // 	C1.addPlayer(inf1,t)
 // 	C1.addPlayer(inf2,t)
 // 	C1.savePlayer(C1.players[0])
 // 	C1.savePlayer(C1.players[1])