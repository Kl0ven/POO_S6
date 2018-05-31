
class App_PC{
	constructor(){
		//declaration interface graphique
		this.UI = new User_Interface(this);
		//d'autres éléments à ajouter
  		this.campaigns = {};
		// pour le generaeur de dés on met une callback sur enter
		$("#cmd").keypress(function(e) {
	    if(e.which == 13) {
	        $("#cmd").val(new Gene_dice($("#cmd").val()).get());
			}
			});

		this.comm = undefined;

	}

	start(){
		this.UI.showView("init");
		this.displayCampaignsName();

	}

	displayCampaignsName(){
		$(".bts_camp").empty();
		fs.readdirSync('./save/').forEach(file => {
			//console.log(file);
			this.UI.displayCampButton(file);
			this.loadCampaign(file); // on charge chaque campagne
		})
	}

	loadCampaign(name){

	var camp = jsonfile.readFileSync("./save/"+name+"/"+name+".json");
	//console.log(camp.encounters);
	this.campaigns[name] = new Campaign(name,this,camp.resume,camp.encounters,camp.hour,camp.day,camp.story);

}
	LaunchCampaign(Name){

		//activation de la campagne
		this.campaigns[Name].active = 1;

		// resume == 0
		if (this.campaigns[Name].is_resume() == 0) {
			this.comm = new Communication (this);
			this.comm.openCom(undefined,0,Name);

		}

		//resume == 1
	}


	getOpenConnection(){

		while ($("#ConnectScreen").css('display') == 'block'){
			return true;
			console.log('ok');
		}

		return false;
	}



	AddCampaign(Name){
		this.campaigns[Name] = new Campaign(Name,this,0);

	}

	SaveCampaign(Name){

		//récupération de l'histoire
		var hist = this.UI.view.histoire.elements[0].text


		this.campaigns[Name].saveCamp(hist)

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
		//chargement de l'histoire
		this.UI.view.histoire.elements[0].setText(this.campaigns[Name].infos_campaign.story);

	}


	startCampaign(Name){


		//campagne lancée : utile pour la sauvegarde des infos des joueurs (pas encore utilisée)
		this.campaigns[Name].launched = 1;

		//chargement des rencontres
		for (var enc in this.campaigns[Name].encounters) {
			this.UI.addEncounter(this.campaigns[Name].encounters[enc].name)
			for (var m in this.campaigns[Name].encounters[enc].monsters) {
					var monster = this.campaigns[Name].encounters[enc].monsters[m]
					this.UI.loadMonster(this.campaigns[Name].encounters[enc].name,monster.name,monster.PV,monster.CA)
			}
		}
		//chargement de l'histoire
		this.UI.view.histoire.elements[0].setText(this.campaigns[Name].infos_campaign.story);


	}

	DeleteCampaign(Name){

		//supprimer l'objet camp
		delete this.campaigns[Name];

		//supprimer les fichiers
		var path = "./save/"+ Name;

		//console.log(path);

		this.DeleteFolderRecursive(path);
		setTimeout(()=>{this.displayCampaignsName();},10);

	}

	 DeleteFolderRecursive(path) {
  		if( fs.existsSync(path) ) {
    		fs.readdirSync(path).forEach(function(file,index){
      		var curPath = path + '/' + file;
      		//console.log(curPath)
      		if(fs.lstatSync(curPath).isDirectory()) { // recurse
        		deleteFolderRecursive(curPath);
      		} else { // delete file
        		fs.unlinkSync(curPath);
      			}
    		});
    	fs.rmdirSync(path);
  		}


	}



}
