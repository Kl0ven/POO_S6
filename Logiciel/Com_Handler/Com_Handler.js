class Com_Handler {
	constructor(com){
		this.com = com;
	}
	playerConnection(pinfos,resume){
		if (resume==0){
			infos = this.getInfo(pinfos);
			player = this.com.pc_app.campaign.addPlayer(infos,this);
			this.player = player;
		}
		else {
			player = this.send(pinfos);
			
		}
	}


}