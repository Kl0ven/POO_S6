class View {
  constructor(mainframe,elements) {
    this.mainframe = mainframe;
    this.elements = elements;
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


}
