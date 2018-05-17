/**
class button derivé de Widget
Jean-Loup MONNIER
19/04/2018
**/

class Button extends Widget {
  constructor(parent, classes, text,cb) {
    // init de la classe parente
    super(parent, classes)
    //texte du boutton
    this.text = text;
    // callback exectuter lors d'un appuis
    this.cb = cb;
    // affichage du btn
    this.show();
    // state defini si le bouton est selectionné ou pas
    // utile pour les onglets
    this.state = undefined;
  }

  // methode qui affiche le btn
  show(){
    // si le btn existe deja on le remplace
    if($("#"+this.id).length){
      $("#"+this.id).replaceWith( this.getHTML() );
    }
    // sinon on l'ajoute au DOM
    else {
      $(this.parent).append(this.getHTML());
    }
    // on met en place la callback
    $("#"+this.id).click(this.cb)
  }

  // methode retournant de code HTML a ajouter au DOM
  getHTML(){
    var id = this.isID() ? 'id="'+ this.id +'"' : '';
    var classes = this.isClasses() ? 'class="'+ this.classes +'"' : '';
    return'<button '+id+" "+classes+'>'+this.text+'</button>';
  }

  // setter pour le texte du btn
  settext(text){
    this.text = text;
    $("#"+this.id).text(text);
  }

  //getter pour le texte du btn
  getText(){
    return this.text;
  }

  // methode permetant de déselectionné le btn
  unset(){
    this.classes = this.classes.replace("w3-indigo","w3-blue");
    this.show();
    this.state = false;
  }

  // methode permetant de selectionné le btn
  set(){
    this.classes = this.classes.replace("w3-blue","w3-indigo");
    this.show();
    this.state = true;
  }

  // getter de l'etat du btn selectionné/déselectionné
  getstate(){
    return this.state;
  }
}
