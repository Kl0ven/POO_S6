class App {
  constructor() {
    this.effect = [];
    this.cara = {"pv": undefined, "ca":undefined};
    this.UI = new User_interface();
    this.com = undefined;
  }

  start(){
    this.UI.showInitScreen();
  }
}
