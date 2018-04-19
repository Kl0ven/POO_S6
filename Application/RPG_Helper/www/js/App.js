/**
class App
Jean-Loup MONNIER
19/04/2018
**/

class App {
  constructor() {
    // liste des effets du joueur
    this.effect = [];
    // dictionnaire de toutes les caracteristiques du joueur
    this.cara = {"pv": undefined, "ca":undefined,"po":undefined,"name":undefined};
    // declaration de l'interface graphique
    this.UI = new User_interface(this);
    // l'objet communication ne sera creer qu'apres la demande du joueur
    this.com = undefined;
  }

  //methode appelé au démarrage de l'application
  start(){
    //this.UI.showView("init");
    this.UI.showView("header").showView("main");
    //this.newGame();
    // handler pour la fleche de retour
    $("#backarrow").click(() => {this.UI.hideAll().showView('header').showView("main");});
  }

  // methode pour demander au joueur pour ses informations pour une nouvelle partie
  newGame(){
    // utilisation de jquery-confirm pour les popup
    $.alert({
      title: 'informations',
      type: 'green',
      theme: 'material',
      content: '' +
      '<form action="" >' +
      '<div class="form-infos">' +
      '<label>Nom</label></br>' +
      '<input type="text" placeholder="nom" id="nom" required /></br></br>' +
      '<label>PO</label></br>' +
      '<input type="number" min="0" placeholder="PO" id="inputPO" required /></br></br>' +
      '<label>CA</label></br>' +
      '<input type="number" min="0" placeholder="CA" id="inputCA" required /></br></br>' +
      '<label>PV</label></br>' +
      '<input type="number" min="0" placeholder="PV" id="inputPV" required /></br>' +
      '</div>' +
      '</form>',
      boxWidth: '80%',
      useBootstrap: false,
      buttons: {
        Save: {
          text: 'Save',
          btnClass: 'btn-green',
          action: () =>{
            // cette callback est appelé lors de l'appuis sur le boutton save
            // verification des entrée user
            if(!$("#inputPV").val() || !$("#inputCA").val() || !$("#inputPO").val() || !$("#nom").val()){
              $.alert('provide every information');
              return false;
            }
            // enregistrement des donées
            this.cara.pv = parseInt($("#inputPV").val());
            this.cara.ca = parseInt($("#inputCA").val());
            this.cara.po = parseInt($("#inputPO").val());
            this.cara.name = $("#nom").val();
            // màj de l'UI
            this.update();
            // envoie des données au PC du MJ
            //this.com.sendNewRep();
          }
        }
      },
      // callback permettant de valider sur la touche entrée
      onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
          // if the user submits the form by pressing enter in the field.
          e.preventDefault();
          jc.$$Save.trigger('click'); // reference the button and click it
        });
      }
    });
  }

  // màj de l'interface graphique
  update(){
    $("#name").text(this.cara.name);
    $("#PO_text").text(this.cara.po);
    $("#PV_text").text(this.cara.pv);
    $("#CA_text").text(this.cara.ca);
  }

  // methode pour la création de l'objet communication
  connect(ip){
    this.UI.view['init'].getElem(1).setText(ip);
    // si l'ip est valide on peut changer de vue et initaliser l'objet communication
    if(this.checkIP(ip)){
      this.UI.hideView("init");
      this.UI.showView("load");
      this.com = new Communication(ip,this,() =>{this.UI.hideView("load").showView("header").showView("main");});
    }
    else {
      // sinon popup d'erreur
      $.alert({
        title: 'Erreur',
        content: "l'adresse IP n'est pas valide",
        type: 'red',
        theme: 'material',
        boxWidth: '80%',
        useBootstrap: false
      });
    }
  }

  // verifie que l'adresse ip est valide
  checkIP(ip){
    var nb = ip.split(".");
    if (nb.length != 4){return 0;}
    for (var numb in nb) {
      if(isNaN(parseInt(nb[numb]))){return 0;}
      if(parseInt(nb[numb])<0 || parseInt(nb[numb])>255 ){return 0;}
    }
    return true;
  }

  // methode modificatrice de pièce d'or
  modPO(mod){
    if(!isNaN(mod)){
      this.cara.po += mod;
      this.update();
    }
  }
}
