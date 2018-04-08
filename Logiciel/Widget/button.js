

class PC_Button extends Widget{
	constructor(parent,classe,text,cb){
		super(parent,classe)
    this.text=text;
	  this.cb=cb;

    this.show();
	}


  show(){
    $(this.parent).append(this.getHTML());// On place le bouton à la fin de la balise app_PC
    $("#"+this.id).click(this.cb)//fonction de base jquery
    //this.applyStyle();
  }

  getHTML(){
    var id = this.isID() ? 'id="'+ this.id +'"' : '';
    var classes = this.isClasses() ? 'class="'+ this.classes +'"' : '';// pk pas la même condition que plus haut ?
    return'<button '+id+" "+classes+'>'+this.text+'</button>';
  }

  /*applyStyle(){

  }*/

  settext(text){
    this.text = text;
    $("#"+this.id).text(text);
  }
}

