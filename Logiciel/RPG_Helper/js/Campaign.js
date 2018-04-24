class Campaign{
	constructor(n,inf){
		this.id = Campaign.generate_ID();
		this.name = n;
		this.players_infos = inf;
		this.players = [];
		
		//utilité ? 
		//this.info = 0;
		//this.carac = 0;

	}

	static generate_ID() {

    	if( typeof Character.counter == 'undefined' ) {
        	Character.counter = -1;
    	}
    	Character.counter++;
    	return Character.counter;
		}


	addPlayer(inf,com){
		
		
	}



}