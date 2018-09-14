/**
class User_interface
Jean-Loup MONNIER
19/04/2018
cette classe gère les differente vue (View)
**/

class User_interface {
  constructor(app) {
    this.view = {}
    this.app = app;
    this.createview();


  }

  // methode d'initialisation de toutes les vues
  createview(){
    this.view.init = new View($("#InitSrceen"),[
      new Image($("#LogoImage"), "","./img/poologobleu.png",200,200),
      new TextArea($("#JoinGame"),$("#btnip"),"ipinput","w3-button w3-blue",1,16,"Connexion",() =>{this.app.connect(this.view.init.getElem(1).toString().replace(/ /g,''))})
    ]);
    this.view.load = new View($("#loading"),[]);

    this.view.header = new View($('#header'),[
      new Button($("#barre1"),"w3-button w3-blue","Compétences",() => {this.btnHandler("header",0,["competence"]);}),
      new Button($("#barre1"),"w3-button w3-blue","Dons",() => {this.btnHandler("header",1,["don"]);}),
      new Button($("#barre1"),"w3-button w3-blue","Sorts",() => {this.btnHandler("header",2,["sort"]);}),
      new Button($("#barre1"),"w3-button w3-blue","Objets",() => {this.btnHandler("header",3,["objet"]);})
    ]);

    this.view.competence = new View($('#competence'),[
      new Button($("#competence .add_btn"),"w3-button w3-circle w3-blue","+",() => {this.dynamicView("competence");})
    ]);

    this.view.don = new View($('#don'),[
      new Button($("#don .add_btn"),"w3-button w3-circle w3-blue","+",() => {this.dynamicView("don");})
    ]);

    this.view.sort = new View($('#sort'),[
      new Button($("#sort .add_btn"),"w3-button w3-circle w3-blue","+",() => {this.dynamicView("sort");})
    ]);

    this.view.objet = new View($('#objet'),[
      new Button($("#objet .add_btn"),"w3-button w3-circle w3-blue","+",() => {this.dynamicView("objet");})
    ]);

    this.view.main = new View($("#main"),[
      new Image($("#PV_image"), "","./img/PV.png",75,75),
      new Image($("#CA_image"), "","./img/CA.png",75,75),
      new Image($("#PO_image"), "","./img/coins.png",75,75),
      new Image($("#Time_image"), "","./img/clock.png",75,75),
      new TextArea($("#PO_mod"),$("#PO_mod"),"PO_modeur","w3-button w3-blue PO_modeur",1,3,"-",() =>{this.app.modPO(-parseInt($("textarea.PO_modeur").val()))}),
      new Button($("#PO_mod"),"w3-button w3-blue PO_modeur","+",() => {this.app.modPO(parseInt($("textarea.PO_modeur").val()))})
    ]);

    this.hideAll();
  }

  // methode permettant d'afficher la vue 'name'
  showView(name){
    this.view[name].show();
    if (name == "main") {$("#backarrow").css("display", "none");}
    return this;
  }

  // methode permettant de cacher la vue 'name'
  hideView(name){
    this.view[name].hide();
    if (name == "main") {$("#backarrow").css("display", "block");}
    return this;
  }

  // methode permettant de cacher la vue 'name'
  hideAll(){
    for (var v in this.view){
      this.hideView(v);
    }
    return this;
  }

  // methode permettant d'ajouter une vue dynamique en demandant au joueur un nom
  dynamicView(type){
    var term  = ""
    if(type == "competence"){term = "Nouvelle";}
    else if (type == "objet") {term = "Nouvel";}
    else {  term = "Nouveau";  }
    var UI = this;
    // affichage d'un popup
    $.confirm({
      title: term + " " + type,
      type: 'green',
      theme: 'material',
      boxWidth: '80%',
      useBootstrap: false,
      content: '' +
      '<form action="" class="formName">' +
      '<div class="form-group">' +
      '<label>Entrez le nom</label></br>' +
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
              $.alert('Nom invalide');
              return false;
            }
            try {
              var n = $("#"+name.replace(/ /g,'')).length;
            } catch (e) {
              var n = 1;
            }
            if(n){
              $.alert('Nom déjà utilisé');
              return false;
            }
            UI.addTab(name,type)
          }
        },
        cancel: {
					text: 'Annuler',
					cancel: function () {

					}

				}
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

  // deselectionne tout les boutons "onglet"
  unsetAllBtn(v){
    for (var i = 0; i < this.view[v].getNbElem(); i++) {
      if (this.view[v].getElem(i) instanceof Button){
        this.view[v].getElem(i).unset();
      }
    }
    return this;
  }

  // methode qui gere les actions des boutons
  btnHandler(vue,num,show){
    // vue = vue ou se trouve de btn appuyé
    // num = numero du btn dasn la vue
    // show = vues a afficher
    // on cache tout sauf le header
    this.hideAll().showView("header");
    // on affiche les vues souhaitée
    for (var v in show) {
      this.showView(show[v]);
    }
    // on deselectionne tout les btns de la vue "vue"
    this.unsetAllBtn(vue);
    // on selectionne celui de la vue active
    this.view[vue].getElem(num).set();

    // condition pour s'assurer que l'on affiche une vue lorque l'on change d'onglet
    if (vue == "header") {
      //console.log(vue);
      for (var i = 0; i < this.view[show[0]].getNbElem(); i++) {
        if(this.view[show[0]].getElem(i) instanceof Button && this.view[show[0]].getElem(i).getstate()){
          //console.log(this.view[show[0]].getElem(i).getText());
          this.showView(this.view[show[0]].getElem(i).getText());
        }

      }
    }
  }

  addTab(name,type){
    // on ajoute une div pour la nouvelle vue
    $("#dynamicView").append('<div class="dynamicView" id="'+name.replace(/ /g,'')+'" ></diV>')
    // on recupere le nb d'onglet deja present
    var nb = this.view[type].getNbElem();
    // on ajoute un onglet
    this.view[type].addElem(new Button($("#"+type+" .w3-bar"),"w3-button w3-blue",name,() => {this.btnHandler(type,nb,[type,name]);}));
    // on affiche la bonne vue
    this.hideAll().showView("header").showView(type)
    // creation d'une nouvelle vue lier au bounton et dans la div
    this.view[name] = new View($("#"+name.replace(/ /g,'')),[
      new TextArea($("#"+name.replace(/ /g,'')),$("#"+name.replace(/ /g,'')),"","w3-button w3-green w3-hover-green",20,30)
    ]);
    // on deselectionne tout les btn
    this.unsetAllBtn(type);
    // on selectionne le bouton de la  nouvelle vue
    this.view[type].getElem(this.view[type].getNbElem()-1).set();

  }


  getTabs(val){
    var res = {};
    for (var i = 1; i < this.view[val].getNbElem(); i++) {
      var name = this.view[val].getElem(i).getText();
      var value = this.view[name].getElem(0).toString();
      res[name]=value;
    }
    return res;
  }

  initUI(){
    $("#barre2").empty();
    $("#barre3").empty();
    $("#barre4").empty();
    $("#barre5").empty();
    $("#dynamicView").empty();
    let onglet = ['competence','don','sort','objet'];
    for (var o in onglet) {
      this.view[onglet[o]].initElem();
    }
  }
  setTabs(val,obj){
    for (var elem in obj) {
      this.addTab(elem,val);
      this.view[elem].getElem(0).setText(obj[elem]);
      this.view[elem].getElem(0).switching();
    }
  }
}
