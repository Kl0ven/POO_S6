class App_PC{
	constructor(){
		//declaration interface graphique
		this.UI= new User_Interface(this);

		//d'autres éléments à ajouter

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

	ModCampaign(Name){

	}

	DelCampaign(Name){

	}


}
