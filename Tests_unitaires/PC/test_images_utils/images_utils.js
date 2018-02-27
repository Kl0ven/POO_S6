const download = require('image-downloader')
const fs = require('fs');

$(document).ready(function(){

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

});




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
  if (dt.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i=0; i < dt.items.length; i++) {
      if (dt.items[i].kind == "file") {
        var f = dt.items[i].getAsFile();
        screenlog('green',"... file[" + i + "].name = " + f.name);
        console.log(f);
        // Only process image files.
        if (f.type.match('image.*')) {
            getDataUri(f.path,f.path.split('.').pop(),import_images)
        }
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i=0; i < dt.files.length; i++) {
      screenlog("red","... file[" + i + "].name = " + dt.files[i].name);
    }
  }
}


function import_images(base64,ext){
  var buff = new Buffer(base64,'base64')
  console.log(buff);
  fs.writeFile('img/image.'+ext, buff);
}



function getDataUri(url, ext, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''),ext);
    };

    image.src = url;
}
