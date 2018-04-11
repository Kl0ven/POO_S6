var app

document.addEventListener('deviceready', function () {
app = new App();
app.start();


}, false);

function lives(x,y) {
  for (var E in app.effect){
    app.effect[E].live(x,y)
  }
}
