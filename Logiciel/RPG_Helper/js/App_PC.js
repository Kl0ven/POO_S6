class App_PC{
	constructor(){
		//declaration interface graphique
		this.UI= new User_Interface(this);
		//d'autres éléments à ajouter
  	this.campaigns = {}; // ? 
		// pour le generaeur de de on met une callback sur enter
		$("#cmd").keypress(function(e) {
	    if(e.which == 13) {
	        $("#cmd").val(new Gene_dice($("#cmd").val()).get());
			}
			});






	}

	start(){
		this.UI.showView("init");
	}

	LaunchCampaign(Name){
		this.UI.showView("launch");

	}

	AddCampaign(Name){
		this.campaigns[Name] = new Campaign(Name);

	}

	SaveCampaign(Name){
	}


	ModCampaign(Name){
		//activation de la campagne
		this.campaigns[Name].active = 1;
		//Désactivation de la campagne a faire dans le bouton "save and quit" 



	}

	DelCampaign(Name){

	}


}
