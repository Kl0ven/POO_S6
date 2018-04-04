class PC_Button extends Widget{
	constructor(parent,id,class,height,width,position,style){
		super(parent,id,classe)//ici, remplacage de "class" par "classe"
		this.height=height;
		this.width=width;
		this.position=position;
		this.style=style;
	}
}

 show(){
    $(this.parent).append(this.getHTML());
    $("#"+this.id).click(this.cb)
    this.applyStyle();
  }

  getHTML(){
    var id = this.isID() ? 'id="'+ this.id +'"' : '';
    var classes = this.isClasses() ? 'class="'+ this.classes +'"' : '';
    return'<button '+id+" "+classes+'>'+this.text+'</button>';
  }

  applyStyle(){

  }

  settext(text){
    this.text = text;
    $("#"+this.id).text(text);
  }
}

