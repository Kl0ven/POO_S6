class Campaign{
	constructor(n,infos){
		this.name = n;
		this.players_infos = infos;
		this.players = [];
		
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




}

// Test trame de données

//  $(document).ready(function(){

	
// 	inf = {"cara":{"PV": 23, "CA":50, PO :2500,"name":"babar" }}
// 	t = null

// 	C1 = new Campaign('C1',null)
// 	C1.addPlayer(inf,t)
// 	C1.addPlayer(inf,t)
// 	screenlog(C1.players[0].infos.name)
// 	screenlog(C1.players[1].infos.PV)


// });
// 	function screenlog(message) {
//    	$("#screenlog").append("<p>"+message+"</p>")
//  	}

	

