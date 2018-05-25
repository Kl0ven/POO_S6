

class PC_Button extends Widget{
	constructor(parent,classe,text,cb,type='button',src=undefined){
		super(parent,classe)
    this.text=text;
	  this.cb=cb;
		this.type = type;
		this.src = src;
		// state defini si le bouton est selectionné ou pas
		// utile pour les onglets
		this.state = undefined;

    this.show();
	}


  show(){
		if($("#"+this.id).length){
      $("#"+this.id).replaceWith( this.getHTML() );
    }
    // sinon on l'ajoute au DOM
    else {
      $(this.parent).append(this.getHTML());
    }

    $("#"+this.id).click(this.cb)//fonction de base jquery
    //this.applyStyle();
  }

  getHTML(){
		var src = ""
		if (typeof src != "undefined") {
			  src = "src='"+this.src+"'";
		}
    var id = this.isID() ? 'id="'+ this.id +'"' : '';
    var classes = this.isClasses() ? 'class="'+ this.classes +'"' : '';// pk pas la même condition que plus haut ?
    return'<input type="'+this.type+'" '+id+" "+classes+" " +src+' value="'+this.text+'">';
  }

  /*applyStyle(){

  }*/
	unset(){
    this.classes = this.classes.replace("w3-indigo","w3-blue");
    this.show();
    this.state = false;
  }

	set(){
		this.classes = this.classes.replace("w3-blue","w3-indigo");
		this.show();
		this.state = true;
	}

	getstate(){
		return this.state;
	}

  settext(text){
    this.text = text;
    $("#"+this.id).val(text);
  }
	getText(){
		return this.text;
	}
}
