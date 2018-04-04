class Widget{
	constructor(parent,id,class){
		this.parent=parent;
		this.id=id;
		this.classe=class;
	}

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
