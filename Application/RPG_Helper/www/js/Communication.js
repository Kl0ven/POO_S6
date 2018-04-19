/**
class Communication
Jean-Loup MONNIER
19/04/2018
cette classe permet de gerer le Web Socket (WS) utiliser pour la communication
**/

class Communication {
  constructor(ip,mobileApp,cb) {
    // callback appeler lorsque la connexion est etablie
    this.cb = cb;
    // adresse ip du PC MJ
    this.ip = ip;
    this.url = 'ws://'+ip+":8080";
    // création de l'objet WebSocket
    this.ws = new WebSocket(this.url);
    // etat du WS
    this.connected = false;
    // reference vers l'appMobile
    this.mobileApp = mobileApp;
    this.setup();
  }

  // la methode setup defini les 4 cb du WS
  setup(){
    // exectuter lors de l'ouverture de WS
    this.ws.onopen = () => {
      this.connected = true;
      this.cb();
    };

    // exectuter lors de la reception d'un message
    this.ws.onmessage = (event) => {
      console.log(event)
      // on essaie de parse le message JSON
      try {
        var obj = JSON.parse(event.data)
      } catch (e) {
        console.log(e);
      }
      // on definine le diéferent cas de figure cf trame de données
      // si c'est une image on l'affiche
      if(obj.type == "image"){
        $("#img_broadcast").attr('src', obj.data)
        $("#div_broadcast").css("visibility","visible")
        // le timeout permet de fermer l'image lorsque le joueur clique a coter de l'image
        setTimeout(function(){
          $("#div_broadcast").click(function() {
            $("#div_broadcast").css("visibility","hidden")
            $(window).unbind( "click" );
          });
          $("#img_broadcast").click(function(event){
            event.stopPropagation();
          });},100)
        }
        // si c'est un choix on l'affiche au joueur puis on renvoie le choix au PC
        else if (obj.type == "choice") {
          this.mobileApp.chooseplayer(obj.data,(name) => {this.ws.send({"type" : "choicerep", "data": name})});
        }
        // si c'est l'heure
        else if (obj.type == "time") {
          this.mobileApp.changeTime(obj.data);
        }
        // si ce sont les caracteristiques
        else if (obj.type == "cara") {
          this.mobileApp.changeCara(obj.data);
        }
        // si c'est un effet
        else if (obj.type == "effect") {
          this.mobileApp.newEffect(obj.data);
        }
        // si c'est une demande de sauvegarde
        else if (obj.type == "save") {
          this.ws.send({"type": "saverep", "data": this.mobileApp.getAllText() })
        }
        // si c'est une nouvelle partie
        else if (obj.type == "new") {
          this.mobileApp.newGame()
        }
        // si c'est une demande de chargement d'une ancienne partie
        else if (obj.type == "load") {
          this.mobileApp.loadGame()
        }
      };

      // exectuter lors d'une erreur de connexion'
      this.ws.onerror = () => {
        console.log("error");
        this.mobileApp.UI.hideView("load");
        // message d'alert
        $.alert({
          title: 'Erreur',
          content: "Impossible de joindre le PC",
          type: 'red',
          theme: 'material',
          content: '' +
          '<form action="" >' +
          'Impossible de joindre le PC'+
          '<div class="form-ip">' +
          '<label>adresse IP</label></br>' +
          '<input type="text" placeholder="IP" id="ipPopup" value="'+this.ip+'" required />' +
          '</div>' +
          '</form>',
          boxWidth: '80%',
          useBootstrap: false,
          buttons: {
            tryAgain: {
              text: 'Try again',
              btnClass: 'btn-red',
              action: (that) =>{
                console.log();
                this.mobileApp.connect($("#ipPopup").val());
              }
            },
            close:  ()  => {
              this.mobileApp.UI.hideView("load");
              this.mobileApp.UI.showView("init");
            }
          },
          onContentReady: function () {
            // bind to events
            var jc = this;
            this.$content.find('form').on('submit', function (e) {
              // if the user submits the form by pressing enter in the field.
              e.preventDefault();
              jc.$$tryAgain.trigger('click'); // reference the button and click it
            });
          }
        });
      };
      // exectuter lors de la fermeture de la connexion
      this.ws.onclose = (event) => {
        this.connected = false;
        console.log(event);
      };
    }

    // getter de l'etat de la connexion
    isConnected(){
      return this.connected;
    }
  }
