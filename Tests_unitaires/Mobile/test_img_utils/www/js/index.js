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

  ws.onmessage = function (event) {$("#img_broadcast")
      //console.log(event.data);    // will be "hello"
      //screenlog('green',event.data)
      try {
        obj = JSON.parse(event.data)
      } catch (e) {
        screenlog("red", "parsing error " + e)
      }
      if (obj.type == "image" ){
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
      else {
        screenlog('green',event.data)
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
