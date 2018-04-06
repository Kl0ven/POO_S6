class User_interface {
  constructor() {

  }


  showInitScreen(){
    var logo = new Image($("#LogoImage"), "","./img/poologobleu.png",200,200);
    this.ipinput  = new TextArea($("#JoinGame"),$("#btnip"),"ipinput",1,16);

  }
}
