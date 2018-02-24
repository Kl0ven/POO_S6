document.addEventListener('deviceready', function () {
var ws
}, false);

function connect(){
  var ip = $("#idpeerjs").val()
  ws = new WebSocket('ws://'+ip+":8080");

  ws.onopen = function () {
      console.log('open');
      screenlog('green','open')
      this.send('ping');         // transmit "hello" after connecting
  };

  ws.onmessage = function (event) {
      console.log(event.data);    // will be "hello"
      screenlog('green',event.data)
      if (event.data = "pong" ){
        this.send('ping')
      }
  };

  ws.onerror = function () {
      screenlog('red','error')
      console.log('error occurred!');
  };

  ws.onclose = function (event) {
      screenlog('red','close code=' + event.code)
      console.log('close code=' + event.code);
  };

}

function screenlog(color,message) {
  var dt = new Date();
  var time = "["+dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()+"]";
  $("#screenlog").append("<span style='color:"+color+";'><b>"+time+"</b>"+message+"</span></br>")

}

function makeid(nb) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < nb; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
