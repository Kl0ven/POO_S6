/**
class View
Jean-Loup MONNIER
19/04/2018
cette classe gère une vue (View)
**/


class View {
  constructor(mainframe,elements) {
    // l'element du DOM parent de la vue
    this.mainframe = mainframe;
    // list des widget à l'interieur de la vue
    this.elements = elements;
  }

  // montre la vue
  show(){
    $(this.mainframe).css("display", "block");
  }
  // cache la vue
  hide(){
    $(this.mainframe).css("display", "none");
  }

  // retourn l'element[nb]
  getElem(nb){
    return this.elements[nb]
  }

  //retourn ne nb d'element de la vue
  getNbElem(){
    return this.elements.length;
  }

  // ajoute elem a la liste d'element 
  addElem(elem){
    this.elements.push(elem);
  }


}