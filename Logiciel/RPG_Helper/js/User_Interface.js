class User_Interface{
	constructor(app){
		this.view={}
		this.app_PC=App_PC;
		this.createview();
	}


	//initialisation vues
	createview(){
		//vue initiale
		this.view.init = new View($("#LaunchScreen"),[
			new PC_Button($(".bt_create"),"w3-button w3-blue","Créer",this.clickcreercamp(this))
			]);
		//vue écran de connexion
		this.view.launch = new View($("#ConnectScreen"),[
			new PC_Button($(".bt_dem"),"w3-button w3-blue","démarrer",this.clickpopup)
			]);
		//vue header
		this.view.header = new View($("#Header"),[
            new PC_Button($(".barre1"),"w3-button w3-blue","Histoire",() => {this.btnHandler("header",["header","histoire"]);}),
            new PC_Button($(".barre1"),"w3-button w3-blue","Combats",() => {this.btnHandler("header",["header","combats"]);}),
            new PC_Button($(".barre1"),"w3-button w3-blue","Règles",() => {this.btnHandler("header",["header","regles"]);}),
            new PC_Button($(".barre1"),"w3-button w3-blue","Générateurs",() => {this.btnHandler("header",["header","generateurs"]);}),
            new PC_Button($(".barre1"),"w3-button w3-blue","Joueurs",() => {this.btnHandler("header",["header","joueurs"]);})
            ]);
  
        //vue onglet Histoire
        this.view.histoire = new View($("#Histoire"),[
            new TextArea($(".txtarea"),$(".txtarea"),undefined,50,170,undefined,undefined)
             ]);


        //vue onglet Combats
        this.view.combats = new View($("#Combats"),[
        new PC_Button($("#test"),"w3-button w3-blue","combats",null)
             ]);


        //vue onglet Règles
        this.view.regles = new View($("#Regles"),[
        new PC_Button($("#test1"),"w3-button w3-blue","regles",null)
            ]);


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
                //$.alert('Votre campagne se nomme :  ' + name);
                //var saisie = prompt("saisissez le nom de la campagne:");
 				//new PC_Button($(".bts_camp"),"w3-button w3-blue",saisie,renommer);//nom de la campagne (actuellement un bouton)
 				$('.bts_camp').append("<div id='"+name+"' class='item'></div>");

 				$("#"+name).append(name);

                new PC_Button($("#"+name),"w3-button w3-blue","Lancer", () => {ui.btnHandler("init",["launch"]);});
                new PC_Button($("#"+name),"w3-button w3-blue","Modifier",() => {ui.btnHandler("init",["header"]);});
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