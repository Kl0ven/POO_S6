/**
class Image derivé de Widget
Jean-Loup MONNIER
19/04/2018
cette classe gère l'affichage des images
**/

class Image extends Widget {
  constructor(parent, classes, src, height, width) {
    // init de la classe parente
    super(parent, classes);
    // lien/chemin  de l'image
    this.src = src;
    // hauteur & largeur
    this.height = height;
    this.width = width;
    this.show();
  }

  // affiche l'image
  show(){
    $(this.parent).append(this.getHTML());
    this.applyStyle();
  }

  // methode renvoyant le code HTML
  getHTML(){
    var id = this.isID() ? 'id="'+ this.id +'"' : '';
    var classes = this.isClasses() ? 'class="'+ this.classes +'"' : '';
    return '<img src="'+this.src+'" '+id+" "+classes+'>';
  }

  // applique le style hauteur largeur
  applyStyle(){
    $("#"+this.id).css("height",this.height+"px");
    $("#"+this.id).css("width",this.width+"px");
  }

}
