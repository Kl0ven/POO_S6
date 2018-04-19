class User_interface {
  constructor(app) {
    this.view = {}
    this.app = app;
    this.createview();


  }


  createview(){
    this.view.init = new View($("#InitSrceen"),[
      new Image($("#LogoImage"), "","./img/poologobleu.png",200,200),
      new TextArea($("#JoinGame"),$("#btnip"),"ipinput","w3-button w3-blue",1,16,"Connexion",() =>{this.app.connect(this.view.init.getElem(1).toString().replace(/ /g,''))})
    ]);
    this.view.load = new View($("#loading"),[]);

    this.view.header = new View($('#header'),[
      new Button($("#barre1"),"w3-button w3-blue","Compétences",() => {this.btnHandler("header",0,["competence"]);}),
      new Button($("#barre1"),"w3-button w3-blue","Dons",() => {this.btnHandler("header",1,["don"]);}),
      new Button($("#barre1"),"w3-button w3-blue","Sorts",() => {}),
      new Button($("#barre1"),"w3-button w3-blue","Objets",() => {})
    ]);

    this.view.competence = new View($('#competence'),[
      new Button($("#competence .add_btn"),"w3-button w3-circle w3-blue","+",() => {this.dynamicView("competence");})
    ]);

    this.view.don = new View($('#don'),[
      new Button($("#don .add_btn"),"w3-button w3-circle w3-blue","+",() => {this.dynamicView("don");})
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


  showView(name){
    this.view[name].show();
    if (name == "main") {$("#backarrow").css("display", "none");}
    return this;
  }

  hideView(name){
    this.view[name].hide();
    if (name == "main") {$("#backarrow").css("display", "block");}
    return this;
  }

  hideAll(){
    for (var v in this.view){
      this.hideView(v);
    }
    return this;
  }

  dynamicView(type){
    var term  = (type == "competence" || type == "objet" ) ? "Nouvelle" : "Nouveau";
    var UI = this;
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
            var name = this.$content.find('.name').val();
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
            $("#dynamicView").append('<div class="dynamicView" id="'+name.replace(/ /g,'')+'" ></diV>')
            var nb = UI.view[type].getNbElem();
            UI.view[type].addElem(new Button($("#"+type+" .w3-bar"),"w3-button w3-blue",name,() => {UI.btnHandler(type,nb,[type,name]);}));
            UI.hideAll().showView("header").showView(type)
            UI.view[name] = new View($("#"+name.replace(/ /g,'')),[
              new TextArea($("#"+name.replace(/ /g,'')),$("#"+name.replace(/ /g,'')),"","w3-button w3-green w3-hover-green",20,30)
            ],type);
            UI.unsetAllBtn(type);
            UI.view[type].getElem(UI.view[type].getNbElem()-1).set();
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

  unsetAllBtn(v){
    for (var i = 0; i < this.view[v].getNbElem(); i++) {
      if (this.view[v].getElem(i) instanceof Button){
        this.view[v].getElem(i).unset();
      }
    }
  }

  btnHandler(vue,num,show){
    this.hideAll().showView("header");
    for (var v in show) {
      this.showView(show[v]);
    }
    this.unsetAllBtn(vue);
    this.view[vue].getElem(num).set();

    if (vue == "header") {
      console.log(vue);
      for (var i = 0; i < this.view[show[0]].getNbElem(); i++) {
        if(this.view[show[0]].getElem(i) instanceof Button && this.view[show[0]].getElem(i).getstate()){
          console.log(this.view[show[0]].getElem(i).getText());
          this.showView(this.view[show[0]].getElem(i).getText());
        }

      }






    }
  }
}
