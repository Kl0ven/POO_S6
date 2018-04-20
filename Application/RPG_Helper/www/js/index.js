/**
programme principal
Jean-Loup MONNIER
19/04/2018
app defini globale pour le debug
**/
var app

// quand l'application est pret la fonction est exectuter
document.addEventListener('deviceready', function () {
  // creation d'un objet app
  app = new App();
  // demarrage de l'app
  app.start();
  // forcer l'application en pleine ecran 
  AndroidFullScreen.immersiveMode(()=>{},()=>{});
}, false);
