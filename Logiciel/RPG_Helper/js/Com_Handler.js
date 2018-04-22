class Com_Handler {
	constructor(com){
		this.com = com;
	}
	playerConnection(pinfos,resume){
		if (resume==0){
			infos = this.getInfo();
			player = this.com.pc_app.campaign.addPlayer(infos,this);
			this.player = player;
		}
		else {
			player = this.getName()
			
		}
	}

	getInfo() {
		//On récupère la trame d'informations de l'appli téléphone



		return infos;
	}


}