class Widget{
	constructor(parent,classe){
		this.parent=parent;
		this.classes=classe;
		this.id = Widget.generate_ID()
	}


	isID(){
    	if (typeof this.id == "undefined") {
         	return false;
     	}
     	return true;
  }

	del(){
		$("#"+this.id).remove();
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
