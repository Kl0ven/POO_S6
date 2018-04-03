class Button extends Widget {
  constructor(parent, classes, text,cb) {
    super(parent, classes)
    this.text = text;
    this.cb = cb;
    this.show();
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
