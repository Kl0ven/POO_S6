class User_Interface{
	constructor(app){

		this.view={}
		this.app_PC = app ;
		this.createview();


		}

	addView(obj,name,val){
		Object.defineProperty(obj,name,{value : val,
			writable : true,
			configurable : true,
			enumerable : true});

		}

		//initialisation vues
		createview(){
			//vue initiale
			this.view.init = new View($("#LaunchScreen"),[
				new PC_Button($(".bt_create"),"w3-button w3-blue","Créer",() => {this.clickcreercamp();}),
				new PC_Button($(".bt_quit"),"w3-button w3-red w3 large","x",() => {window.close();})
			]);
			//vue écran de connexion
			this.view.launch = new View($("#ConnectScreen"),[
				new PC_Button($("#btn_dem"),"w3-button w3-blue","Démarrer",() => {this.startCamp(this.getCampaignName());}),
				new PC_Button($("#btn_ret"),"w3-button w3-red","Retour",() => {this.closeComm_return();}),
				new PC_Button($("#help"),"w3-button w3-purple","help",() => {this.help();})
			]);
			//vue header
			this.view.header = new View($("#Header"),[

				new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Histoire",() => {this.btnHandler("header",["header","footer","histoire"],0);}),
				new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Combats",() => {this.btnHandler("header",["header","footer","combats"],1);}),
				new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Règles",() => {this.btnHandler("header",["header","footer","regles"],2);}),
				new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Générateurs",() => {this.btnHandler("header",["header","footer","generateurs"],3);}),
				new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Joueurs",() => {this.btnHandler("header",["header","footer","joueurs"],4);}),
				new PC_Button($("#barre1"),"w3-button w3-red w3 large sq","Save and quit",() => {this.saveAndQuit();}),
        new PC_Button($("#barre1"),"w3-button w3-red sq","Campagne Test",() => {this.CampagneTest(this.getCampaignName());})

			]);

			//vue footer
			this.view.footer = new View($("#Footer"),[
				new PC_Button($("#btnmoins"),"w3-button  w3-blue","-",() => {this.app_PC.campaigns[this.getCampaignName()].modhour(-parseInt($("#modhour").val()))}),
				new PC_Button($("#btnplus"),"w3-button  w3-blue","+",() => {this.app_PC.campaigns[this.getCampaignName()].modhour(parseInt($("#modhour").val()))})
			]);

			//vue onglet Histoire
			this.view.histoire = new View($("#Histoire"),[
				new TextArea($(".txtarea"),$(".txtarea"),undefined,50,170)
			]);


			//vue onglet Combats
			this.view.combats = new View($("#Combats"),[
				new PC_Button($("#rencontres"),"w3-button w3-round w3-blue","+",() => {this.newEncounter();})
			]);


			//vue onglet Règles
			this.view.regles = new View($("#Regles"),[]);


			//vue onglet géné
			this.view.generateurs = new View($("#Generateurs"),[
				new PC_Button($(".test2"),"w3-button w3-blue","generateurs",null)
			]);


			//vue onglet Joueurs
			this.view.joueurs = new View($("#Joueurs"),[
			]);

			this.hideAll();

		}

		clickcreercamp(){
			//popup jquery-confirm
			var ui = this

			$.confirm({
				title: '',
				useBootstrap:false,
				boxWidth:'50%',
				content: '' +
				'<form action="" class="formName">' +
				'<div class="form-group">' +
				'<label>Entrez le nom de votre campagne :          </label>' +
				'<input type="text" placeholder="Le nom" class="name form-control" required autofocus />' +
				'</div>' +
				'</form>',
				buttons: {
					formSubmit: {
						text: 'Valider',
						btnClass: 'btn-blue',
						action: function () {
							var name = this.$content.find('.name').val();
							if(!name){
								$.alert('Nom de classe non valide');
								return false;
							}

							//Instanciation d'une campagne
							ui.app_PC.AddCampaign(name);

                            //Creation de la div Camp et des boutons
                            ui.displayCampButton(name);

                            //affichage de la campagne direct
                            ui.modifCamp(name);



						}
					},
					Revenir: function () {
						//close
					},
				},
				onContentReady: function () {
					// bind to events
					var jc = this;
					this.$content.find('form').on('submit', function (e) {
						// if the user submits the form by pressing enter in the field.
						e.preventDefault();
						jc.$$formSubmit.trigger('click'); // reference the button and click it
					});
				}
			});
		}


		newEncounter(){
			var term = "Nouvelle rencontre"
			var UI = this;
			// affichage d'un popup
			$.confirm({
				title: term,
				type: 'green',
				theme: 'material',
				boxWidth: '80%',
				useBootstrap: false,
				content: '' +
				'<form action="" class="formName">' +
				'<div class="form-group">' +
				'<label>Nom de la rencontre</label></br>' +
				'<input type="text" placeholder="name" class="name form-control" required autofocus/>' +
				'</div>' +
				'</form>',
				buttons: {
					formSubmit: {
						text: 'Créer',
						btnClass: 'btn-green',
						action: function () {
							// callback apeler lors de l'apuis sur "Créer"
							// on recupere le nom
							var name = this.$content.find('.name').val();
							// on verifie le nom et compatible et qui n'existe pas deja
							if(!name){
								$.alert('provide a valid name');
								return false;
							}
							try {
								var n = $("#"+name.replace(/ /g,'_')).length;
							} catch (e) {
								var n = 1;
							}
							if(n){
								$.alert('provide another name');
								return false;
							}

							name = name.replace(/ /g,'_')
							UI.addEncounter(name);
							//Instancie une rencontre dans la campagne

							UI.app_PC.campaigns[UI.getCampaignName()].addEncounter(name)


						}
					},
					cancel: function () {
						//close
					},
				},
				onContentReady: function () {
					// bind to events
					var jc = this;
					this.$content.find('form').on('submit', function (e) {
						// if the user submits the form by pressing enter in the field.
						e.preventDefault();
						jc.$$formSubmit.trigger('click'); // reference the button and click it
					});
				}
			});
		}

		addEncounter(name){
			//ajout d'une div pour les rencontres
			$("#vue_rencontres").append('<div class="rencontre" id="'+name.replace(/ /g,'')+'" ></div>');

			//création de la vue rencontre "name"

			this.addView(this.view,name,new View($("#"+name),[]));

			this.view[name].addElem($("#"+ name).append('<h1 class = "titre_rencontre">' + name + "</h1>"));
			//UI.view[name].addElem(new TextArea($("#"+name),$("#"+name),undefined,5,30,undefined,undefined));

			// Tableau des monstres et affichage principal
			this.view[name].addElem($("#"+ name).append('<div class="w3-row">'+
			'<div class="w3-col w3-light-grey" style="width:75%">'+
			'<div class="w3-responsive"'+
			'<div class = "tab_monstre"> <table class="w3-table-all">' +
			'<tr id = "M_nom_'+ name + '"> <th> <div> Monstres :</div></th> </tr>' +
			'<tr id = "M_PV_'+ name + '"> <th> <div> PV :</div></th> </tr>' +
			'<tr id = "M_CA_'+ name + '"> <th> <div> CA :</div></th> </tr>' +
			'</table>' +
			'</div>' +
			'</div>'+


			'<div class="w3-col" id = "btn_add_M_' + name + '"  style="width:3%">'+
			'</div>'+

			'<div id = "players_turn" class="w3-col w3-dark-grey w3-center" style="width:22%"">' +
			'<p> Joueurs </p>' +
				'<div class = btn_start_fight>'+
				'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'<div class="w3-col" id = "btn_desc_M_' + name + '"></div>'
		));


		// Test rajout monstre
		//UI.view[name].addElem($("#btn_add_M").append('<td> <div contenteditable="">Monstre 2</div></td>'));
		new PC_Button($("#btn_add_M_"+ name +""),"w3-button w3-round w3-blue","+",() => {this.addMonster(name);});


		//ajout du btn pour cree des description
		new PC_Button($("#btn_desc_M_"+ name +""),"w3-button  w3-blue","add Description",() => {this.addDesc(name);});
		// btn pour supprimer la rencontre
		new PC_Button($("#btn_desc_M_"+ name +""),"w3-button  w3-red","supprimer la rencontre",() => {this.delConfirm(name,()=>{this.delEncounter(name)});});

		var nb = this.view.combats.getNbElem();
		// Ajouter un bouton rencontre au bon endroit // Callback affiche header, btns rencontres et la rencontre en question
		this.view.combats.addElem(new PC_Button($("#rencontres"),"w3-button w3-round w3-blue rencontre",name,() => {this.btnHandler("combats",["header","footer","combats",name],nb);}));


		//Affiche uniquement la vue qui vient d'être créée
		this.btnHandler("combats",["header","footer","combats",name],nb);




	}
	addDesc(name){
		this.app_PC.campaigns[this.getCampaignName()].addDesc(name,new Description($("#descs"),name,this.app_PC))

	}

	addMonster(rencontre){

		var term = "Nouveau monstre"
		var UI = this;
		// affichage d'un popup
		$.confirm({
			title: term,
			type: 'green',
			theme: 'material',
			boxWidth: '80%',
			useBootstrap: false,
			content: '' +
			'<form action="" class="formName">' +
			'<div class="form-group">' +
			'<label>Nom du monstre</label></br>' +
			'<input type="text" placeholder="name" class="name form-control" required autofocus/>' +
			'</div>' +
			'<div class="form-group">' +
			'<label>PV</label></br>' +
			'<input type="text" placeholder="PV" class="PV form-control" required autofocus/>' +
			'</div>' +
			'<div class="form-group">' +
			'<label> CA </label></br>' +
			'<input type="text" placeholder="CA" class="CA form-control" required autofocus/>' +
			'</div>' +
			'</form>',
			buttons: {
				formSubmit: {
					text: 'Créer',
					btnClass: 'btn-green',
					action: function () {
						// callback apeler lors de l'apuis sur "Créer"
						// on recupere les infos
						var name = this.$content.find('.name').val();
						var PV = this.$content.find('.PV').val();
						var CA = this.$content.find('.CA').val();
						// on verifie le nom et compatible et qui n'existe pas deja
						if(!name){
							$.alert('provide a valid name');
							return false;
						}
						try {
							var n = $("#"+name.replace(/ /g,'')).length;
						} catch (e) {
							var n = 1;
						}
						if(n){
							$.alert('provide another name');
							return false;
						}
						name = name.replace(/ /g,'-');
						UI.loadMonster(rencontre,name,PV,CA)

						//Création du monstre

						var m = new Monster(name,PV,CA);
						UI.app_PC.campaigns[UI.getCampaignName()].addMonster(rencontre,m);

					}

				},
				cancel: function () {
					//close
				},
			},
			onContentReady: function () {
				// bind to events
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					// if the user submits the form by pressing enter in the field.
					e.preventDefault();
					jc.$$formSubmit.trigger('click'); // reference the button and click it
				});
			}
		});
	}

	loadMonster(rencontre,name,PV,CA){
			//Création du tableau
		this.view[rencontre].addElem($("#M_nom_"+rencontre).append('<td class = "w3-center"> <div contenteditable="">'+ name + '</div> <div class="delMonster" id="delMonster'+name+'"></div></td>'));
		this.view[rencontre].addElem($("#M_PV_"+rencontre).append('<td class = "w3-center"> <div contenteditable="">'+ PV +'</div></td>'));
		this.view[rencontre].addElem($("#M_CA_"+rencontre).append('<td class = "w3-center"> <div contenteditable="">'+ CA +'</div></td>'));
		new PC_Button($("#delMonster"+name),"","",()=>{this.code('t1','[g] [/g]')},"image",'./assets/fermer.png');
	}

	saveAndQuit(){

		this.btnHandler("header",["init"]);
		this.app_PC.SaveCampaign(this.getCampaignName());
		this.app_PC.campaigns[this.getCampaignName()].active = 0;
		this.initUI();


	}

	initUI(){
		$("#vue_rencontres").children().each((n)=>{
			var id = $("#vue_rencontres").children()[n].id;
			//vue onglet Combats

			delete app.UI.view[id];

		})
		$("#rencontres").children().each(function(){$(this).remove()})
		this.view.combats = new View($("#Combats"),[
			new PC_Button($("#rencontres"),"w3-button w3-round w3-blue","+",() => {this.newEncounter();})
		]);
		$(".rencontre").remove();
		this.view.histoire.elements[0].setText("");

		$("#descs").empty();

		$("#display_players").empty();
	}

	displayCampButton(name){

		$('.bts_camp').append("<div id='"+name+"' class='camp'><div class='campname'></div></div>");

		$("#"+name +" .campname").append(name);

		new PC_Button($("#"+name),"w3-button w3-blue","Lancer", () => {this.launchCamp(name);});
		new PC_Button($("#"+name),"w3-button w3-blue","Modifier",() => {this.modifCamp(name);});
		new PC_Button($("#"+name),"w3-button w3-red","Supprimer",() => {this.delCamp(name);});

	}


	modifCamp(name){
		this.app_PC.ModCampaign(name);
		this.btnHandler("init",["header","footer","histoire"]);

	}

	delEncounter(nom){
		var encounters = this.app_PC.campaigns[this.getCampaignName()].encounters
		for (var e in encounters) {
			if(encounters[e].name == nom){
				encounters.splice(e,1);
				this.initUI();
				this.app_PC.ModCampaign(this.getCampaignName());
				if (this.view["combats"].getNbElem() > 1 ) {
					this.btnHandler("combats",["header","footer","combats",this.view["combats"].getElem(1).getText()],1);

				}
				else {
					this.btnHandler("combats",["header","footer","combats"]);
				}

			}
		}

	}
	delDesription(id,en){
		var encounters = this.app_PC.campaigns[this.getCampaignName()].encounters;
		for (var e in encounters) {
			if (encounters[e].name == en) {
				var desc = encounters[e].description;
				for (var d in desc) {
					if (desc[d].id == id) {
						this.app_PC.campaigns[this.getCampaignName()].hideAll();
						this.app_PC.campaigns[this.getCampaignName()].encounters[e].description.splice(d,1);
						this.app_PC.campaigns[this.getCampaignName()].setDesc(en);
					}
				}
			}
		}

		}
	delCamp(name){
		this.delConfirm("la campagne",()=>{this.app_PC.DeleteCampaign(name)})
	}

	delConfirm(name, cb ){
		var UI = this;
		// affichage d'un popup
		$.confirm({
			title: "Voulez vous vraiment supprimer "+name+" ?",
			type: 'red',
			theme: 'material',
			boxWidth: '80%',
			useBootstrap: false,
			buttons: {
				formSubmit: {
					text: 'Supprimer',
					btnClass: 'btn-red',
					action: function () {
						cb();

					}

				},
				cancel: function () {
					//close
				},
			},
			onContentReady: function () {
				// bind to events
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					// if the user submits the form by pressing enter in the field.
					e.preventDefault();
					jc.$$formSubmit.trigger('click'); // reference the button and click it
				});
			}
		});
	}

	showView(name){
		this.view[name].show();
	}

	hideView(name){
		this.view[name].hide();
	}

	hideAll(){
		for (var v in this.view){
			this.hideView(v);
		}
	}

	unsetAllBtn(v){
    for (var i = 0; i < this.view[v].getNbElem(); i++) {
      if (this.view[v].getElem(i) instanceof PC_Button){
        this.view[v].getElem(i).unset();
      }
    }
    return this;
  }

	btnHandler(vue,show,num = undefined ){

		this.hideAll();

		for(var v in show) {
			this.showView(show[v]);
		}
		if(typeof num !== 'undefined'){
			this.unsetAllBtn(vue);
	    // on selectionne celui de la vue active
	    this.view[vue].getElem(num).set();
		}
		if (vue == "init") {
			this.unsetAllBtn("header");
	    // on selectionne celui de la vue active
	    this.view.header.getElem(0).set();
		}
		// condition pour s'assurer que l'on affiche une vue lorque l'on change d'onglet
		if (vue == "header") {
			//console.log(vue);
			for (var i = 0; i < this.view.combats.getNbElem(); i++) {
				if(this.view.combats.getElem(i) instanceof PC_Button && this.view.combats.getElem(i).getstate()){
					//console.log(this.view[show[0]].getElem(i).getText());
					this.showView(this.view.combats.getElem(i).getText());
				}

			}
		}
		if (vue == "combats") {
				this.app_PC.campaigns[this.getCampaignName()].setDesc(show[show.length-1]);
		}
	}



	startFight(name){
		var term = "Jets d'initiative" ;
		var PlayerName = [];
		var idPlayers = [];
		var labandinput=''
		for (var i = 0; i < this.app_PC.campaigns[name].players[i].length; i++)// Pour chaque joueur, on donne son jet d'initiative
			PlayerName[i]=this.app_PC.campaigns[name].players[i].infos.name;
			idPlayers[i]=this.app_PC.campaigns[name].players[i].id;
			labandinput='<form action="" class="formName">' +
						'<div class="form-group" id="'+idPlayers[i]+'">' +
						'<label>'+PlayerName[i]+'</label></br>' +
						'<input type="text" placeholder="" class="name form-control" required autofocus/>'+
						labandinput +
						'</div>' +
						'</form>'

				var UI = this;
				// affichage d'un popup
				$.confirm({
					title: term,
					type: 'green',
					theme: 'material',
					boxWidth: '80%',
					useBootstrap: false,
					content:
					labandinput,
					buttons: {
						formSubmit: {
							text: 'Valider',
							btnClass: 'btn-green',
							action: function () {
								// callback apeler lors de l'apuis sur "Créer"
								// on recupere le nom
								var name = this.$content.find('.name').val();
								// on verifie le nom et compatible et qui n'existe pas deja
								if(!name){
									$.alert('provide a valid name');
									return false;
								}
								try {
									var n = $("#"+name.replace(/ /g,'')).length;
								} catch (e) {
									var n = 1;
								}
								if(n){
									$.alert('provide another name');
									return false;
								}




							}
						},
						cancel: function () {
							//close
						},
					},
					onContentReady: function () {
						// bind to events
						var jc = this;
						this.$content.find('form').on('submit', function (e) {
							// if the user submits the form by pressing enter in the field.
							e.preventDefault();
							jc.$$formSubmit.trigger('click'); // reference the button and click it
						});
					}
				});
			}




	getCampaignName(){
		var that = this;
		var ret
		$(".camp").each(function(){
			//console.log(this.id);

			if (that.app_PC.campaigns[this.id].active == 1){
				ret = this.id
			}

		});
		return ret;
	}

	launchCamp(name){
		this.app_PC.LaunchCampaign(name);
		this.btnHandler("init",["launch"]);

	}

	closeComm_return(){
		this.btnHandler("launch",["init"]);
	}


	startCamp(n_camp){
		this.btnHandler("init",["header","footer"]);
		this.app_PC.startCampaign(n_camp);

		//affichage des joueurs connecté dans l'onglet joueurs et de leurs carac modifiables
		for (var i = 0 ; i <= this.app_PC.campaigns[n_camp].players.length -1 ; i++){

			var n_pl = this.app_PC.campaigns[n_camp].players[i].infos.name;
			var pv_pl = this.app_PC.campaigns[n_camp].players[i].infos.PV;
			var ca_pl = this.app_PC.campaigns[n_camp].players[i].infos.CA;

			this.dispPlayers(n_pl,ca_pl,pv_pl,n_camp);		
		}


		

		// pas le meilleur endoit pour le mettre ? 
		new PC_Button($(".btn_start_fight"),"w3-button w3-round w3-blue","Démarrer Combat",undefined);
	}


	dispPlayers(n_pl,ca_pl,pv_pl,n_camp){

		$("#display_players").append('<div id="div_'+n_pl+'" class = "w3-container w3-panel w3-border">'+ 
										'<div class="w3-row">'+
											'<div class="w3-col w3-container" style="width:15%;">'+
												'<div class = "n_player">'+n_pl+'</div>'+
											'</div>'+	
      										'<div class="w3-col w3-container" style="width:15%;">'+
      											'<div class = "grid">'+
      												'<div id = "btnminPV_'+n_pl+'" class = "btnmin"></div>'+
      												'<div id = "PV_'+n_pl+'" class = "PV_player">PV: '+pv_pl+'</div>'+
      												'<div id = "btnplusPV_'+n_pl+'"class = "btnplus"></div>'+
      											'</div>'+	
      										'</div>'+
      										'<div class="w3-col w3-container" style="width:15%; display: grid;">'+
      											'<div id = "btnminCA_'+n_pl+'" class = "btnmin"></div>'+
      											'<div id = "CA_'+n_pl+'" class = "CA_player">CA: '+ca_pl+'</div>'+
      											'<div id = "btnplusCA_'+n_pl+'" class = "btnplus"></div>'+
      										'</div>'+
      										'<div class="w3-rest">'+
      											'<table id = "tab_effects_'+n_pl+'" class = "w3-table-all">'+
      												'<tr>'+
      													'<th id = title_effect'+n_pl+'> Effets </th>'+
      												'</tr>'+
      										'</div>'+

										'</div>'+
								  '</div>');


		//boutons chgmt de stats
		new PC_Button($("#btnminPV_"+n_pl),"w3-button w3-round w3-blue","-",()=> {this.modStat(n_camp,n_pl,"PV-");});
		new PC_Button($("#btnplusPV_"+n_pl),"w3-button w3-round w3-blue","+",()=> {this.modStat(n_camp,n_pl,"PV+");});
		new PC_Button($("#btnminCA_"+n_pl),"w3-button w3-round w3-blue","-",()=> {this.modStat(n_camp,n_pl,"CA-");});
		new PC_Button($("#btnplusCA_"+n_pl),"w3-button w3-round w3-blue","+",()=> {this.modStat(n_camp,n_pl,"CA+");});

		//Bouton d'ajout d'effets
		new PC_Button($("#title_effect"+n_pl),"w3-button w3-round w3-tiny w3-blue","+",()=>{this.addEffect(n_camp,n_pl);});
	}


	addEffect(n_camp,n_pl){

		var UI = this;
		// affichage d'un popup
		$.confirm({
			title: "Nouvel effet",
			type: 'green',
			theme: 'material',
			boxWidth: '80%',
			useBootstrap: false,
			content: '' +
			'<form action="" class="formName">' +
			'<div class="form-group">' +
			'<label>Description : </label></br>' +
			'<input type="text" placeholder="" class="effect form-control" required autofocus/>' +
			'</div>' +
			'<div class="form-group">' +
			'<label>Durée : </label></br>' +
			'<input type="text" placeholder="1" class="duration form-control" required autofocus/>' +
			'</div>' +
			'<div class="form-group">' +
			'<label> Unité : </label></br>' +
			'<input type="radio" name ="unit_H" class="unit_H form-control" >Heure<br>' +
			'<input type="radio" name ="unit_R" class="unit_R form-control" >Round<br>'+
			'</div>' +
			'</form>',
			buttons: {
				formSubmit: {
					text: 'Créer',
					btnClass: 'btn-green',
					action: function () {
						// callback apeler lors de l'apuis sur "Créer"
						// on recupere les infos
						var eff = this.$content.find('.effect').val();
						var dur = this.$content.find('.duration').val();
						var u_H = $('input[name="unit_H"]:checked').val();
						var u_R = $('input[name="unit_R"]:checked').val();
						// on verifie le nom et compatible et qui n'existe pas deja
						if(!eff){
							$.alert('write a description');
							return false;
						}

						if ((parseFloat(dur)!=parseInt(dur))&& isNaN(dur)){
							$.alert('duration must be an number');
							return false;
						}

						if(dur == 0){
							$.alert('duration cannot be equal to 0');
						}


						//autres verification ? 

						//affichage de l'effet dans le tableau + portable
						UI.dispEffect(eff,dur,u_H,u_R,UI,n_camp,n_pl)
						

					}

				},
				cancel: function () {
					//close
				},
			},
			onContentReady: function () {
				// bind to events
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					// if the user submits the form by pressing enter in the field.
					e.preventDefault();
					jc.$$formSubmit.trigger('click'); // reference the button and click it
				});
			}
		});

	}




	dispEffect(eff,dur,u_H,u_R,ui,n_camp,n_pl){

//affichage du tableau

		if (u_H == undefined){
			$("#tab_effects_"+n_pl).append('<tr>'+'<td>'+eff+'</td>'+'<td>pendant '+dur+' rounds</td>'+'</tr>');
			u_H = false;
			u_R = true;}
		else{
			$("#tab_effects_"+n_pl).append('<tr>'+'<td>'+eff+'</td>'+'<td>pendant '+dur+' heures</td>'+'</tr>');	
			u_H = true;
			u_R = false;}

//instanciation de l'effet dans le joueur

	var un = "";
	if (u_H==true){
		un = "H"}
	else{un = "R"}

	//création de l'objet effet
	var effect = {
		description : eff,
		duration : dur,
		unit : un,
		alive : true 
		}

	//ajout de l'effet dans la liste d'effets du joueur
	for (var i = 0 ; i <= ui.app_PC.campaigns[n_camp].players.length -1 ; i++){
			if(ui.app_PC.campaigns[n_camp].players[i].name == n_pl){

			ui.app_PC.campaigns[n_camp].players[i].addEffect(effect)
			} 
	}
						

	}


	modStat(n_camp,n_pl,stat){

		if (stat == "PV+"){

			for (var i = 0 ; i <= this.app_PC.campaigns[n_camp].players.length -1 ; i++){
			if (this.app_PC.campaigns[n_camp].players[i].infos.name == n_pl){

				//console.log(this.app_PC.campaigns[n_camp].players[i].infos.name);
				//incrémentation de 1 dans l'objet

				var pvint = parseInt(this.app_PC.campaigns[n_camp].players[i].infos.PV)
				pvint += 1;
				this.app_PC.campaigns[n_camp].players[i].infos.PV = pvint;

				console.log(this.app_PC.campaigns[n_camp].players[i].infos.name);
				console.log(this.app_PC.campaigns[n_camp].players[i].infos.PV);
				
				//incrémentation de 1 dans l'affichage
				$("#PV_"+this.app_PC.campaigns[n_camp].players[i].infos.name).text("PV: "+this.app_PC.campaigns[n_camp].players[i].infos.PV)


				//incrementation sur le téléphone

				this.app_PC.campaigns[n_camp].players[i].comm_handler.modCar(this.app_PC.campaigns[n_camp].players[i].infos.PV,this.app_PC.campaigns[n_camp].players[i].infos.CA);


				}
			}
		}
	
	else if(stat == "PV-"){

		for (var i = 0 ; i <= this.app_PC.campaigns[n_camp].players.length -1 ; i++){
			if (this.app_PC.campaigns[n_camp].players[i].infos.name == n_pl){

				//console.log(this.app_PC.campaigns[n_camp].players[i].infos.name);
				//incrémentation de 1 dans l'objet

				var pvint = parseInt(this.app_PC.campaigns[n_camp].players[i].infos.PV)
				pvint -= 1;
				this.app_PC.campaigns[n_camp].players[i].infos.PV = pvint;

				console.log(this.app_PC.campaigns[n_camp].players[i].infos.name);
				console.log(this.app_PC.campaigns[n_camp].players[i].infos.PV);
				
				//incrémentation de 1 dans l'affichage
				$("#PV_"+this.app_PC.campaigns[n_camp].players[i].infos.name).text("PV: "+this.app_PC.campaigns[n_camp].players[i].infos.PV)
				
				//incrementation sur le téléphone
				this.app_PC.campaigns[n_camp].players[i].comm_handler.modCar(this.app_PC.campaigns[n_camp].players[i].infos.PV,this.app_PC.campaigns[n_camp].players[i].infos.CA);

				}
			}
	}

	else if(stat == "CA+"){

		for (var i = 0 ; i <= this.app_PC.campaigns[n_camp].players.length -1 ; i++){
			if (this.app_PC.campaigns[n_camp].players[i].infos.name == n_pl){

				//console.log(this.app_PC.campaigns[n_camp].players[i].infos.name);
				//incrémentation de 1 dans l'objet

				var pvint = parseInt(this.app_PC.campaigns[n_camp].players[i].infos.CA)
				pvint += 1;
				this.app_PC.campaigns[n_camp].players[i].infos.CA = pvint;

				console.log(this.app_PC.campaigns[n_camp].players[i].infos.name);
				console.log(this.app_PC.campaigns[n_camp].players[i].infos.PV);
				
				//incrémentation de 1 dans l'affichage
				$("#CA_"+this.app_PC.campaigns[n_camp].players[i].infos.name).text("CA: "+this.app_PC.campaigns[n_camp].players[i].infos.CA)
				
				//incrementation sur le téléphone
				this.app_PC.campaigns[n_camp].players[i].comm_handler.modCar(this.app_PC.campaigns[n_camp].players[i].infos.PV,this.app_PC.campaigns[n_camp].players[i].infos.CA);
				}
			}
	}

	else if(stat == "CA-"){

		for (var i = 0 ; i <= this.app_PC.campaigns[n_camp].players.length -1 ; i++){
			if (this.app_PC.campaigns[n_camp].players[i].infos.name == n_pl){

				//console.log(this.app_PC.campaigns[n_camp].players[i].infos.name);
				//incrémentation de 1 dans l'objet

				var pvint = parseInt(this.app_PC.campaigns[n_camp].players[i].infos.CA)
				pvint -= 1;
				this.app_PC.campaigns[n_camp].players[i].infos.CA = pvint;

				console.log(this.app_PC.campaigns[n_camp].players[i].infos.name);
				console.log(this.app_PC.campaigns[n_camp].players[i].infos.PV);
				
				//incrémentation de 1 dans l'affichage
				$("#CA_"+this.app_PC.campaigns[n_camp].players[i].infos.name).text("CA: "+this.app_PC.campaigns[n_camp].players[i].infos.CA)
				
				//incrementation sur le téléphone
				this.app_PC.campaigns[n_camp].players[i].comm_handler.modCar(this.app_PC.campaigns[n_camp].players[i].infos.PV,this.app_PC.campaigns[n_camp].players[i].infos.CA);

				}
			}	
		}	 	
}




		

	CampagneTest(name){

		var p1 = new Player("Joueur1","66","33",undefined);
		var p2 = new Player("Joueur2","100","50",undefined)
		this.app_PC.campaigns[name].players.push(p1);
		this.app_PC.campaigns[name].players.push(p2);
		this.initUI();
		this.startCamp(name);

	}

	help(){
		$.alert({
    title: 'Impossible de connecter les téléphones au PC ?',
		type: 'purple',
		theme: 'material',
		boxWidth: '80%',
		useBootstrap: false,

    content: '<ul>'+
  						'<li>Il faut tout d’abord être connecté au même sous-réseau (ex : hotspot WiFi).</li>'+
  						'<li>Si toutefois cela ne marche pas, il se peut que votre routeur bloque la connexion. Il faut donc ouvrir le port 8080 du firewall de votre routeur.</br> <b>QuickFix :</b> un téléphone en mode partage de connexion fonctionne très bien ! :) </li>'+
  						'<li>Il se peut aussi que ce soit le PC qui bloque la connexion vous devez autoriser l’application nw.exe au port 8080.</li>'+
						'</ul>',
});
	}



}
