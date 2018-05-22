
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
			this.loadCampaign(file); // on charge chaque campagne
		})
	}

loadCampaign(name){

	var camp = jsonfile.readFileSync("./save/"+name+"/"+name+".json");
	console.log(camp.encounters);
		this.campaigns[name] = new Campaign(name,camp.encounters,camp.hour,camp.day);

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
		for (var enc in this.campaigns[Name].encounters) {
			this.UI.addEncounter(this.campaigns[Name].encounters[enc].name)
			for (var m in this.campaigns[Name].encounters[enc].monsters) {
					var monster = this.campaigns[Name].encounters[enc].monsters[m]
					this.UI.loadMonster(this.campaigns[Name].encounters[enc].name,monster.name,monster.PV,monster.CA)
			}

		}
		//Désactivation de la campagne a faire dans le bouton "save and quit"




	}

	DeleteCampaign(Name){

	}


}
