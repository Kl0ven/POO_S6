class View {
  constructor(mainframe,elements,parent = undefined) {
    this.mainframe = mainframe;
    this.elements = elements;
    this.parent = parent;
    
  }


  show(){
    $(this.mainframe).css("display", "block");
  }

  hide(){
    $(this.mainframe).css("display", "none");
  }

  getElem(nb){
    return this.elements[nb]
  }
  getNbElem(){
    return this.elements.length;
  }
  addElem(elem){
    this.elements.push(elem);
  }


}
