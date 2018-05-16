class User_Interface{
	constructor(app){
		this.view={}
		this.app_PC=App_PC;
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
			new PC_Button($(".bt_create"),"w3-button w3-blue","Créer",() => {this.clickcreercamp(this);})
			]);
		//vue écran de connexion
		this.view.launch = new View($("#ConnectScreen"),[
			new PC_Button($(".bt_dem"),"w3-button w3-blue","démarrer",this.clickpopup)
			]);
		//vue header
		this.view.header = new View($("#Header"),[
            new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Histoire",() => {this.btnHandler("header",["header","footer","histoire"]);}),
            new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Combats",() => {this.btnHandler("header",["header","footer","combats"]);}),
            new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Règles",() => {this.btnHandler("header",["header","footer","regles"]);}),
            new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Générateurs",() => {this.btnHandler("header",["header","footer","generateurs"]);}),
            new PC_Button($("#barre1"),"w3-button w3-blue w3-large","Joueurs",() => {this.btnHandler("header",["header","footer","joueurs"]);})


            ]);

        //vue footer
        this.view.footer = new View($("#Footer"),[
            ]);

        //vue onglet Histoire
        this.view.histoire = new View($("#Histoire"),[
            new TextArea($(".txtarea"),$(".txtarea"),undefined,50,170,undefined,undefined)
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

	clickcreercamp(ui){
 	//popup jquery-confirm
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

 				$('.bts_camp').append("<div id='"+name+"' class='item'></div>");

 				$("#"+name).append(name);

                new PC_Button($("#"+name),"w3-button w3-blue","Lancer", () => {ui.btnHandler("init",["launch"]);});
                new PC_Button($("#"+name),"w3-button w3-blue","Modifier",() => {ui.btnHandler("init",["header","footer"]);});
 				new PC_Button($("#"+name),"w3-button w3-blue","Supprimer",null);


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


//ajout d'une div pour les rencontres
            $("#vue_rencontres").append('<div class="rencontre" id="'+name.replace(/ /g,'')+'" ></div>');

//création de la vue rencontre "name"

            UI.addView(UI.view,name,new View($("#"+name),[]));

            UI.view[name].addElem($("#"+ name).append('<h1 class = "titre_rencontre">' + name + "</h1>"));
            //UI.view[name].addElem(new TextArea($("#"+name),$("#"+name),undefined,5,30,undefined,undefined));

            // Tableau des monstres et affichage principal
           UI.view[name].addElem($("#"+ name).append('<div class="w3-row">'+
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
                                                     '</div>'
                                                     ));


            // Test rajout monstre
            //UI.view[name].addElem($("#btn_add_M").append('<td> <div contenteditable="">Monstre 2</div></td>'));
            new PC_Button($("#btn_add_M_"+ name +""),"w3-button w3-round w3-blue","+",() => {UI.addMonster(name);});

// Ajouter un bouton rencontre au bon endroit // Callback affiche header, btns rencontres et la rencontre en question
             new PC_Button($("#rencontres"),"w3-button w3-round w3-blue",name,() => {UI.btnHandler("combats",["header","footer","combats",name]);});


//Affiche uniquement la vue qui vient d'être créée
            UI.btnHandler("combats",["header","footer","combats",name]);



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

    addMonster(rencontre){
        this.view[rencontre].addElem($("#M_nom_"+rencontre).append('<td class = "w3-center"> <div contenteditable="">Monstre</div></td>'));
        this.view[rencontre].addElem($("#M_PV_"+rencontre).append('<td class = "w3-center"> <div contenteditable="">0</div></td>'));
        this.view[rencontre].addElem($("#M_CA_"+rencontre).append('<td class = "w3-center"> <div contenteditable="">0</div></td>'));

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







}

/*$(document).ready(function()
{
	new User_Interface()
}*/
