class Communication {
  constructor(ip,mobileApp) {
    this.url = 'ws://'+ip+":8080";
    this.ws = new WebSocket(this.url);
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
    this.ws.onerror = this.onError;
    this.ws.onclose = this.onClose;
    this.connected = false;
    this.mobileApp = mobileApp;

  }
  onOpen(){
    this.connected = true;
  }

  onMessage(event){
    try {
      obj = JSON.parse(event.data)
    } catch (e) {
      screenlog("red", "parsing error " + e)
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

    }

    onClose(event){
      this.connected = false;
      console.log(event);
    }

    onError(){
      console.log("error");
    }

  }
