class User_interface {
  constructor(app) {
    this.view = {}
    this.app = app;
    this.createview();


  }


createview(){
    this.view.init = new View($("InitSrceen"),[
      new Image($("#LogoImage"), "","./img/poologobleu.png",200,200),
      new TextArea($("#JoinGame"),$("#btnip"),"ipinput",1,16,"Connexion",() =>{this.app.connect(this.view.init.getElem(1).toString())})
    ]);
}


  showView(name){
    this.view[name].show();
  }

  hideView(name){
    this.view[name].hide();
  }
}
