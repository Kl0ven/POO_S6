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
			new PC_Button($(".bt_create"),"w3-button w3-blue","Créer",this.clickcreercamp)
			]);
		//vue écran de connexion
		this.view.launch = new View($("#ConnectScreen"),[
			new PC_Button($(".bt_dem"),"w3-button w3-blue","démarrer",this.clickpopup)
			]);
		//vue onglets
		this.view.header = new View($("#Header"),[]);


		this.hideAll();

	}




	clickcreercamp(){
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

                new PC_Button($("#"+name),"w3-button w3-blue","Lancer", () => {this.btnHandler("init",["launch"]);});//btnHandler pas reconnu comme une fonction
                new PC_Button($("#"+name),"w3-button w3-blue","Modifier",null);
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