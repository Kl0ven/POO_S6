class App_PC{
	constructor(){
		//declaration interface graphique
		this.UI= new User_Interface(this);
		
		//d'autres éléments à ajouter
	}

	start(){
		this.UI.showView("init");
	}

	LaunchCampaign(Name){
		this.UI.showView("launch");

	}

	ModCampaign(Name){

	}

	DelCampaign(Name){
		
	}


}




