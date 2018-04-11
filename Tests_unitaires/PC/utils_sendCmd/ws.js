const WebSocket = require('ws');
const internalIp = require('internal-ip');

$(document).ready(function(){
  internalIp.v4().then(ip => {
      console.log(ip);
      $("#ip").text(ip)
  });
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', function connection(ws) {
    console.log(ws);
    $("#send").click(() =>{
      var cmd = {"type":$("#para1").val(),"data":$("#para2").val()}
      screenlog('purple',JSON.stringify(cmd))
      ws.send(JSON.stringify(cmd));
    }
    );
  });

  wss.on('error', function connection(e) {
    screenlog("red", e)

  });


// Execute a function when the user releases a key on the keyboard
document.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("send").click();
  }
});
});










function screenlog(color,message) {
  var dt = new Date();
  var time = "["+dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()+"]";
  $("#screenlog").append("<span style='color:"+color+";'><b>"+time+"</b>"+message+"</span></br>")

}
