
class App_PC{
	constructor(){
		//declaration interface graphique
		this.UI= new User_Interface(this);
		//d'autres éléments à ajouter
  	this.campaigns = {};

		// pour le generaeur de de on met une callback sur enter
		$("#cmd").keypress(function(e) {
	    if(e.which == 13) {
	        $("#cmd").val(new Gene_dice($("#cmd").val()).get());
			}
			});

	}

	start(){
		this.UI.showView("init");
		this.displayCampaignsName();

	}

	displayCampaignsName(){
		fs.readdirSync('./save/').forEach(file => {
			console.log(file);
			this.UI.displayCampButton(file);
		})

		
	}

	LaunchCampaign(Name){
		this.UI.showView("launch");

	}

	AddCampaign(Name){
		this.campaigns[Name] = new Campaign(Name);

	}

	SaveCampaign(Name){
		this.campaigns[Name].saveCamp()

	}


	ModCampaign(Name){
		//activation de la campagne
		this.campaigns[Name].active = 1;
		console.log(this.campaigns[Name].active); 



	}

	DeleteCampaign(Name){

	}


}
