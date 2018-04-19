var app

document.addEventListener('deviceready', function () {
app = new App();
app.start();
AndroidFullScreen.immersiveMode(()=>{},()=>{});

}, false);

function lives(x,y) {
  for (var E in app.effect){
    app.effect[E].live(x,y)
  }
}
