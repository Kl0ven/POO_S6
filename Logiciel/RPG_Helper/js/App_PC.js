
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

		var dir = nw.App.dataPath+'\\save\\';
		
		if(fs.existsSync(dir)){
					fs.readdirSync(nw.App.dataPath+'\\save\\').forEach(file => {
			
			this.UI.displayCampButton(file);
			this.loadCampaign(file); // on charge chaque campagne
			fs.readdirSync(nw.App.dataPath+'\\save\\'+file+'\\players').forEach(player => {
				
				this.loadPlayer(file,player); // on charge chaque campagne
			})
		})
		}


	}

	loadCampaign(name){
	
	var camp = jsonfile.readFileSync(nw.App.dataPath+"\\save\\"+name+"\\"+name+".json");
	
	this.campaigns[name] = new Campaign(name,this,camp.resume,camp.encounters,camp.hour,camp.day,camp.story);

	}
loadPlayer(camp,player){

	var player = jsonfile.readFileSync(nw.App.dataPath+"\\save\\"+camp+"\\players\\"+player);
	this.campaigns[camp].addPlayer(player)
}
	LaunchCampaign(Name){

		//activation de la campagne
		this.campaigns[Name].active = 1;
		this.comm = new Communication (this);
		// resume == 0
		if (this.campaigns[Name].is_resume() == 0) {

			this.comm.openCom(undefined,0,Name);

		}else{
			//resume == 1
			this.comm.openCom(this.campaigns[Name].getPlayersNames(),1,Name);
		}


	}


	getOpenConnection(){

		while ($("#ConnectScreen").css('display') == 'block'){
			return true;
			
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
		var path = nw.App.dataPath+'\\save\\'+ Name;
		

		

		this.DeleteFolderRecursive(path);
		setTimeout(()=>{this.displayCampaignsName();},10);

	}


	 DeleteFolderRecursive(path) {
		 let self = this;
  		if( fs.existsSync(path) ) {
    		fs.readdirSync(path).forEach(function(file,index){
      		var curPath = path + '/' + file;
      		
      		if(fs.lstatSync(curPath).isDirectory()) { // recurse

        		self.DeleteFolderRecursive(curPath);

      		} else { // delete file
        		fs.unlinkSync(curPath);
      			}
    		});
    	fs.rmdirSync(path);
  		}


	}








}
