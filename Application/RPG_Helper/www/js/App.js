class App {
  constructor() {
    this.effect = [];
    this.cara = {"pv": undefined, "ca":undefined,"po":undefined,"name":undefined};
    this.UI = new User_interface(this);
    this.com = undefined;
  }

  start(){
    //this.UI.showView("init");
    this.UI.showView("header").showView("main");
    this.newGame();
  }

  newGame(){
    $.alert({
      title: 'informations',
      type: 'blue',
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
            this.cara.pv = parseInt($("#inputPV").val());
            this.cara.ca = parseInt($("#inputCA").val());
            this.cara.po = parseInt($("#inputPO").val());
            this.cara.name = $("#nom").val();
            this.update();
            //this.com.sendNewRep();
          }
        }
      },
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

  update(){
    $("#name").text(this.cara.name);
    $("#PO_text").text(this.cara.po);
    $("#PV_text").text(this.cara.pv);
    $("#CA_text").text(this.cara.ca);
  }


  connect(ip){
    this.UI.view['init'].getElem(1).setText(ip);

    if(this.checkIP(ip)){
      this.UI.hideView("init");
      this.UI.showView("load");
      this.com = new Communication(ip,this,() =>{this.UI.hideView("load").showView("header").showView("main");});

    }
    else {
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
      if(parseInt(nb[numb])<0 || parseInt(nb[numb])>255 ){return 0;}
    }
    return true;
  }

  modPO(mod){
    if(!isNaN(mod)){
      this.cara.po += mod;
      this.update();
    }
  }
}
