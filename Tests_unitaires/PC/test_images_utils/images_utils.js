const cpFile = require('cp-file')
const dir = './img_pdf/';
const fs = require('fs');



$(document).ready(function(){
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

});

function updateView(){
  $(".view").empty()
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      console.log(file);
      ext = file.split('.').pop().toLowerCase();
      if(ext == "png" || ext == "jpg" || ext == "jpeg" ){
        console.log(dir+file);
        $(".view").append('<div class="item"><img src="'+dir+file+'" style="width:80px;height:80px" alt=""><span>'+file+'</span></div>')
      }else if (ext == "pdf") {
        $(".view").append('<div class="item"><img src="./assets/pdf.png" style="width:80px;height:80px" alt=""><span>'+file+'</span></div>')
      }
    });
  })
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
