

class PC_Button extends Widget{
	constructor(parent,classe,text,cb,type='button',src=undefined){
		super(parent,classe)
    this.text=text;
	  this.cb=cb;
		this.type = type;
		this.src = src;

    this.show();
	}


  show(){
    $(this.parent).append(this.getHTML());// On place le bouton à la fin de la balise app_PC
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

  settext(text){
    this.text = text;
    $("#"+this.id).text(text);
  }
}
