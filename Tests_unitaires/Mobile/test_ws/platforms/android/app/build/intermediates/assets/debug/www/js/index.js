document.addEventListener('deviceready', function () {

}, false);

function connect(){
  var ip = $("#idpeerjs").val()
  var ws = new WebSocket('ws://'+ip);

  ws.onopen = function () {
      console.log('open');
      this.send('hello');         // transmit "hello" after connecting
  };

  ws.onmessage = function (event) {
      console.log(event.data);    // will be "hello"
      this.close();
  };

  ws.onerror = function () {
      console.log('error occurred!');
  };

  ws.onclose = function (event) {
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
