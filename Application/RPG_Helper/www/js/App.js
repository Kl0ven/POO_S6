class App {
  constructor() {
    this.effect = [];
    this.cara = {"pv": undefined, "ca":undefined};
    this.UI = new User_interface(this);
    this.com = undefined;
  }

  start(){
    this.UI.showView("init");
  }

  connect(ip){
    console.log(ip);
  }
}
