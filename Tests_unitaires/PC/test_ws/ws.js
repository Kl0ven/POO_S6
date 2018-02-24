const WebSocket = require('ws');
const internalIp = require('internal-ip');

$(document).ready(function(){
  internalIp.v4().then(ip => {
      console.log(ip);
      $("#ip").text(ip)
  });
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      screenlog("green", message);
      if( message == 'ping'){
          ws.send('pong');
      }
    });


  });
  wss.on('error', function connection(e) {
    screenlog("red", e)

  });
});










function screenlog(color,message) {
  var dt = new Date();
  var time = "["+dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()+"]";
  $("#screenlog").append("<span style='color:"+color+";'><b>"+time+"</b>"+message+"</span></br>")

}
