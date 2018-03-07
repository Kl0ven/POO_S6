const cpFile = require('cp-file')
const dir = './img_pdf/';
const fs = require('fs');
const WebSocket = require('ws');
const internalIp = require('internal-ip');
const wss = new WebSocket.Server({ port: 8080 });


$(document).ready(function(){
  wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
  console.log(wss);
  updateView()
  var dropper = $(".dropper")

  dropper.on('dragover', function(e) {
    e.preventDefault(); // On autorise le drop d'éléments
    this.className = 'dropper drop_hover'; // Et on applique le style adéquat à notre zone de drop quand un élément la survole
  });

  dropper.on('dragleave', function() {
    this.className = 'dropper'; // On revient au style de base lorsque l'élément quitte la zone de drop
  });
  dropper.on('drop', function() {
    this.className = 'dropper'; // On revient au style de base lorsque l'élément quitte la zone de drop
  });
  internalIp.v4().then(ip => {
      console.log(ip);
      screenlog("purple", ip)
  });
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      screenlog("green", message);
    })
  });
  wss.on('error', function connection(e) {
    screenlog("red", e)
  });

});

function updateView(){
  $(".view").empty()
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      //console.log(file);
      ext = file.split('.').pop().toLowerCase();
      if(ext == "png" || ext == "jpg" || ext == "jpeg" ){
        //console.log(dir+file);
        $(".view").append('<div class="item" onmouseleave="leave(this)" onmouseover="over(this)"> <button id="'+dir+file+'" class="send" style="display:none;" type="button" onclick="send(this)" >send</button><button id="'+dir+file+'" class="send two" style="display:none;" type="button" onclick="del(this)" >del</button><div class="overlay"></div><img src="'+dir+file+'" style="width:80px;height:80px" alt=""><span>'+file+'</span></div>')
      }else if (ext == "pdf") {
        $(".view").append('<div class="item" onmouseleave="leave(this)" onmouseover="over(this)"><button id="'+dir+file+'" class="send" style="display:none;" type="button" onclick="view(this)" >view</button><button id="'+dir+file+'" class="send two" style="display:none;" type="button" onclick="del(this)" >del</button><div class="overlay"></div><img src="./assets/pdf.png" style="width:80px;height:80px" alt=""><span>'+file+'</span></div>')
      }
    });
  })
  $(".item").on("mouseover",function(){console.log(1)})

}

function send(elem) {
  console.log(elem.id);
  getDataUri(elem.id,function (dataUri) {
    //console.log(dataUri)
    wss.broadcast(JSON.stringify({type: "image", data : dataUri}))
  })



}

function view(elem){
  if ($("#iframepdf").attr('src') != elem.id){
    $("#iframepdf").attr('src',elem.id);
  }
  $("#iframepdf").css("visibility","visible")
  setTimeout(function(){
  $(window).click(function() {
    $("#iframepdf").css("visibility","hidden")
    $(window).unbind( "click" );
  });

  $('#iframepdf').click(function(event){
    event.stopPropagation();
  });},100)
}

function del(elem) {
  console.log(elem.id);
  fs.unlink(elem.id, function(error) {
    if (error) {
      throw error;
    }
    console.log('Deleted '+elem.id);
    screenlog("red","suprression de "+elem.id)
    updateView()
  });

}
function over(elem) {
  $(elem).find(".send").each(function(id){$($(elem).find(".send")[id]).show();})
}

function leave(elem) {
  $(elem).find(".send").each(function(id){$($(elem).find(".send")[id]).hide()})
}

function screenlog(color,message) {
  var dt = new Date();
  var time = "["+dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()+"]";
  $("#screenlog").append("<span style='color:"+color+";'><b>"+time+"</b>"+message+"</span></br>")

}


function drop_handler(ev) {
  ev.preventDefault();
  screenlog("red","Drop");
  $(".dropper drop_hover").className = 'dropper';
  // If dropped items aren't files, reject them
  var dt = ev.dataTransfer;
  // Use DataTransferItemList interface to access the file(s)
  for (var i=0; i < dt.items.length; i++) {
    if (dt.items[i].kind == "file") {
      var f = dt.items[i].getAsFile();

      //console.log(f);
      // Only process image & pdf files.
      var ext = f.path.split('.').pop().toLowerCase()
      var name = f.name
      //console.log(name);
      screenlog('green',"moving " +name);
      if (ext == "png" || ext == "jpg" || ext == "jpeg" ||ext == "pdf") {
        $('#myProgress').css("visibility","initial")
        cpFile(f.path, dir+name).on('progress',data =>{
          $('#myBar').css("width",data.percent*100+"%")
        }).then(() => {
          console.log('File copied');
          screenlog('green',"File copied");
          $('#myBar').css("width","0%")
          $('#myProgress').css("visibility","hidden")
          updateView()
        });
      }

    }
  }
}

function getDataUri(url, callback) {
  var image = new Image();

  image.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

    canvas.getContext('2d').drawImage(this, 0, 0);
    callback(canvas.toDataURL('image/png'));
  };

  image.src = url;
}
