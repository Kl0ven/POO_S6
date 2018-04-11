class Communication {
  constructor(ip,mobileApp,cb) {
    this.cb = cb;
    this.ip = ip;
    this.url = 'ws://'+ip+":8080";
    this.ws = new WebSocket(this.url);
    this.connected = false;
    this.mobileApp = mobileApp;
    this.setup();
  }

  setup(){
    this.ws.onopen = () => {
      //console.log(this);
      this.connected = true;
      this.cb();
    };

    this.ws.onmessage = (event) => {
      console.log(event)
      try {
        var obj = JSON.parse(event.data)
      } catch (e) {
        //screenlog("red", "parsing error " + e)
        console.log(e);
      }
      if(obj.type == "image"){
        $("#img_broadcast").attr('src', obj.data)
        $("#div_broadcast").css("visibility","visible")
        setTimeout(function(){
          $("#div_broadcast").click(function() {
            $("#div_broadcast").css("visibility","hidden")
            $(window).unbind( "click" );
          });
          $("#img_broadcast").click(function(event){
            event.stopPropagation();
          });},100)
        }
        else if (obj.type == "choice") {
          this.mobileApp.chooseplayer(obj.data,(name) => {this.ws.send({"type" : "choicerep", "data": name})});
        }
        else if (obj.type == "time") {
          this.mobileApp.changeTime(obj.data);
        }
        else if (obj.type == "cara") {
          this.mobileApp.changeCara(obj.data);
        }
        else if (obj.type == "effect") {
          this.mobileApp.newEffect(obj.data);
        }
        else if (obj.type == "save") {
          this.ws.send({"type": "saverep", "data": this.mobileApp.getAllText() })
        }
        else if (obj.type == "new") {
          this.mobileApp.newGame()
        }
        else if (obj.type == "load") {
          this.mobileApp.loadGame()
        }
      };

      this.ws.onerror = () => {
        console.log("error");
        this.mobileApp.UI.hideView("load");
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

      this.ws.onclose = (event) => {
        this.connected = false;
        console.log(event);
      };
    }

    isConnected(){
      return this.connected;
    }
  }
