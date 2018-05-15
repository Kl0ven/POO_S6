/**
class Widget, Abstraite
Jean-Loup MONNIER
19/04/2018
classe mere abstraite
**/


class Widget {
  constructor(parent, classes) {
    // parent du DOM
    this.parent = parent;
    // ID unique a chaque Widget
    this.id = Widget.generate_ID();
    // les class HTML (srting)
    this.classes = classes;
  }

  // retourne vraie si le widget a un id (inutile car tjrs vrai)
  isID(){
    if (typeof this.id == "undefined") {
         return false;
     }
     return true;
  }

  // retourne vraie si le widget a une/des class
  isClasses(){
    if (typeof this.classes == "undefined") {
         return false;
     }
     return true;
  }

  // methode statique qui génère l'ID unique  
  static generate_ID() {
    if( typeof Widget.counter == 'undefined' ) {
        Widget.counter = -1;
    }
    Widget.counter++;
    return Widget.counter;
}

}
