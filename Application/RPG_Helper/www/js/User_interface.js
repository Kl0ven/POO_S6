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
      new Button($("#barre1"),"w3-button w3-blue","Compétences",() => {}),
      new Button($("#barre1"),"w3-button w3-blue","Dons",() => {}),
      new Button($("#barre1"),"w3-button w3-blue","Sorts",() => {}),
      new Button($("#barre1"),"w3-button w3-blue","Invetaire",() => {})
    ])

    this.view.main = new View($("#main"),[
      new Image($("#PV_image"), "","./img/CA.png",75,75),
      new Image($("#CA_image"), "","./img/PV.png",75,75),
      new Image($("#PO_image"), "","./img/coins.png",75,75),
      new Image($("#Time_image"), "","./img/clock.png",75,75),
      new TextArea($("#PO_mod"),$("#PO_mod"),"PO_modeur","w3-button w3-blue PO_modeur",1,3,"-",() =>{this.app.modPO(-parseInt($("textarea.PO_modeur").val()))}),
      new Button($("#PO_mod"),"w3-button w3-blue PO_modeur","+",() => {this.app.modPO(parseInt($("textarea.PO_modeur").val()))})
    ])

    for (var v in this.view){
      this.view[v].hide();
    }
}


  showView(name){
    this.view[name].show();
    return this;
  }

  hideView(name){
    this.view[name].hide();
    return this;
  }
}
