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
    this.cara = {"PV": undefined, "CA":undefined,"PO":0,"name":undefined};
    // declaration de l'interface graphique
    this.UI = new User_interface(this);
    // l'objet communication ne sera creer qu'apres la demande du joueur
    this.com = undefined;
    //heure
    this.time = "22:56"
  }

  //methode appelé au démarrage de l'application
  start(){
    this.UI.showView("init");
    //this.UI.showView("header").showView("main");
    //this.newGame();
    // handler pour la fleche de retour
    $("#backarrow").click(() => {this.UI.hideAll().showView('header').showView("main").unsetAllBtn("header");});
  }

  // methode pour demander au joueur pour ses informations pour une nouvelle partie
  newGame(cb){
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
            this.cara.PV = parseInt($("#inputPV").val());
            this.cara.CA = parseInt($("#inputCA").val());
            this.cara.PO = parseInt($("#inputPO").val());
            this.cara.name = $("#nom").val();
            // màj de l'UI
            this.update();
            cb();
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
    $("#PO_text").text(this.cara.PO);
    $("#PV_text").text(this.cara.PV);
    $("#CA_text").text(this.cara.CA);
    $("#Time_text").text(this.time);
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
      this.cara.PO += mod;
      this.update();
    }
  }

  chooseplayer(names,cb){
    var innerHTML = "";
    for (var name in names) {
      innerHTML += '<input type="radio" name="choice" id="'+names[name]+'" value="'+names[name]+'">   ';
      innerHTML += '<label for="'+names[name]+'" style="font-size: x-large;">'+names[name]+' </label></br>';
    }

    $.alert({
      title: 'choisie ton perso',
      type: 'green',
      theme: 'material',
      content: '' +
      '<form id="choice" action="" >' +
      '<div class="form-infos">' + innerHTML + '</div>' +
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
            if(!$('input[name=choice]:checked', '#choice').val()){
              $.alert('provide every information');
              return false;
            }
            // on apelle la callback avec le non selectionné
            cb($('input[name=choice]:checked', '#choice').val())
            this.cara.name = $('input[name=choice]:checked', '#choice').val()
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

  changeTime(obj){
    this.time = obj.time;
    for (var E in this.effect){
      this.effect[E].live(obj.in_fight,obj.qte)
    }
    this.update();
  }

  changeCara(obj){
    this.cara.PV = obj.PV;
    this.cara.CA = obj.CA;
    this.update();
  }

  newEffect(obj){
    this.effect.push(new Effect(obj.bonus, obj.duration, obj.unit, obj.description))
  }

  getAllData(){
    var info = {};
    info.cara = this.cara;
    info.comp = this.UI.getTabs("competence");
    info.dons = this.UI.getTabs("don");
    info.sorts = this.UI.getTabs("sort");
    info.inventaire = this.UI.getTabs("objet");
    return info;
  }

  loadGame(obj){
    this.cara = obj.cara;
    this.UI.setTabs("competence",obj.comp);
    this.UI.setTabs("don",obj.dons);
    this.UI.setTabs("sort",obj.sorts);
    this.UI.setTabs("objet",obj.inventaire);
    this.UI.hideAll().showView("main").showView("header")
  }
}
