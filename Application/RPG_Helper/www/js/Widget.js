class Widget {

  constructor(parent, classes) {
    this.parent = parent;
    this.id = Widget.generate_ID();
    this.classes = classes;
    return this.id;
  }

  isID(){
    if (typeof this.id == "undefined") {
         return false;
     }
     return true;
  }

  isClasses(){
    if (typeof this.classes == "undefined") {
         return false;
     }
     return true;
  }

  static generate_ID() {

    if( typeof Widget.counter == 'undefined' ) {
        Widget.counter = -1;
    }
    Widget.counter++;
    return Widget.counter;
}

}
