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
				new PC_Button($("#btn_dem"),"w3-button w3-blue","Démarrer",() => {this.startCamp(getCampaignName());}),
				new PC_Button($("#btn_ret"),"w3-button w3-red","Retour",() => {this.closeComm_return();})
			]);
			//vue header
			this.view.header = new View($("#Header"),[
				new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Histoire",() => {this.btnHandler("header",["header","footer","histoire"]);}),
				new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Combats",() => {this.btnHandler("header",["header","footer","combats"]);}),
				new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Règles",() => {this.btnHandler("header",["header","footer","regles"]);}),
				new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Générateurs",() => {this.btnHandler("header",["header","footer","generateurs"]);}),
				new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Joueurs",() => {this.btnHandler("header",["header","footer","joueurs"]);}),
				new PC_Button($("#barre1"),"w3-button w3-red w3 large","Save and quit",() => {this.saveAndQuit();})
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
				new PC_Button($(".test3"),"w3-button w3-blue","joueurs",null)
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
								var n = $("#"+name.replace(/ /g,'')).length;
							} catch (e) {
								var n = 1;
							}
							if(n){
								$.alert('provide another name');
								return false;
							}
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

			'<div class="w3-col w3-dark-grey w3-center" style="width:22%"">' +
			'<p> Joueurs </p>' +
			'</div>'+
			'</div>'+
			'</div>'+
			'<div class="w3-col" id = "btn_desc_M_' + name + '">'+
			'<div class="w3-col" id = "desc_M_' + name + '">'
		));


		// Test rajout monstre
		//UI.view[name].addElem($("#btn_add_M").append('<td> <div contenteditable="">Monstre 2</div></td>'));
		new PC_Button($("#btn_add_M_"+ name +""),"w3-button w3-round w3-blue","+",() => {this.addMonster(name);});


		//ajout du btn pour cree des description
		new PC_Button($("#btn_desc_M_"+ name +""),"w3-button w3-round w3-blue","add Description",() => {this.addDesc(name);});


		// Ajouter un bouton rencontre au bon endroit // Callback affiche header, btns rencontres et la rencontre en question
		new PC_Button($("#rencontres"),"w3-button w3-round w3-blue rencontre",name,() => {this.btnHandler("combats",["header","footer","combats",name]);});


		//Affiche uniquement la vue qui vient d'être créée
		this.btnHandler("combats",["header","footer","combats",name]);




	}
	addDesc(name){
		console.log(name);
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

						UI.loadMonster(rencontre,name,PV,CA)


						//Création du monstre

						UI.app_PC.campaigns[UI.getCampaignName()].addMonster(rencontre,name,PV,CA);

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
		this.view[rencontre].addElem($("#M_nom_"+rencontre).append('<td class = "w3-center"> <div contenteditable="">'+ name + '</div></td>'));
		this.view[rencontre].addElem($("#M_PV_"+rencontre).append('<td class = "w3-center"> <div contenteditable="">'+ PV +'</div></td>'));
		this.view[rencontre].addElem($("#M_CA_"+rencontre).append('<td class = "w3-center"> <div contenteditable="">'+ CA +'</div></td>'));
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
			delete app.UI.view[id];
			console.log(id);

		})
		$(".rencontre").remove();
		this.view.histoire.elements[0].setText("");
	}

	displayCampButton(name){

		$('.bts_camp').append("<div id='"+name+"' class='camp'></div>");

		$("#"+name).append(name);

		new PC_Button($("#"+name),"w3-button w3-blue","Lancer", () => {this.launchCamp(name);});
		new PC_Button($("#"+name),"w3-button w3-blue","Modifier",() => {this.modifCamp(name);});
		new PC_Button($("#"+name),"w3-button w3-blue","Supprimer",() => {this.delCamp(name);});

	}


	modifCamp(name){
		this.btnHandler("init",["header","footer"]);
		this.app_PC.ModCampaign(name);

	}

	delCamp(name){
		this.app_PC.DeleteCampaign(name);
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


	btnHandler(vue,show){

		this.hideAll();

		for(var v in show) {

			this.showView(show[v]);
		}
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

	this.btnHandler("init",["launch"]);
	this.app_PC.LaunchCampaign(name)
	}

	closeComm_return(){
		this.btnHandler("launch",["init"]);
	}



}
