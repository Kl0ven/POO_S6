class TextArea extends Widget {
  constructor(parent, classes, height, width) {
    super(parent, classes)
    this.btn = new Button(parent,"w3-button w3-blue","save",() => {this.switching()});
    this.height = height;
    this.width = width;
    this.text = ""
    this.state = false; //textarea
    this.show();
  }

  show(){
    $(this.parent).append(this.getHTML());
  }

  getHTML(){
    var id = this.isID() ? 'id="'+ this.id +'"' : '';
    var classes = this.isClasses() ? 'class="'+ this.classes +'"' : '';
    return '<textarea '+id+" "+classes+' rows="'+this.height+'" cols="'+this.width+'">'+this.text+'</textarea>';
  }


  switching(){
    if(!this.state){
      var html = this.toHTML();
      $("#"+this.id).remove();
      var id = this.isID() ? 'id="'+ this.id +'"' : '';
      var classes = this.isClasses() ? 'class="'+ this.classes +'"' : '';
      $(this.parent).append('<div '+id+" "+classes+' >'+html+'</div>');
      this.state = true;
      this.btn.settext("modifier");
    }else{
      $("#"+this.id).remove();
      this.show();
      this.state = false;
      this.btn.settext("save");
    }


  }

  toHTML(){
    var text = $("#"+this.id).val();
    this.text = text;
    text = text.replace(/<[^>]+>/gi,"");
    text = text.replace(/\[g\](.+)\[\/g\]/gi, '<strong>$1</strong>');
    text = text.replace(/\[i\](.+)\[\/i\]/gi, '<em>$1</em>');
    text = text.replace(/\[s\](.+)\[\/s\]/gi, '<u>$1</u>');
    text = text.replace(/\[center\](.+)\[\/center\]/gi,'<div id ="center">$1</div>' );
    text = text.replace(/\[left\](.+)\[\/left\]/gi, '<div id ="left">$1</div>');
    text = text.replace(/\[right\](.+)\[\/right\]/gi, '<div id ="right">$1</div>' );
    text = text.replace(/\[sub\](.+)\[\/sub\]/gi,  '<sub>$1</sub>');
    text = text.replace(/\[sup\](.+)\[\/sup\]/gi, '<sup>$1</sup>');
    text = text.replace(/(https?:\/\/[a-z0-9._/-]+)/gi, '<a href="$1">$1</a>');
    text = text.replace(/\[color color=(\#[A-Z0-9]{6})\](.+)\[\/color\]/gi, '<div style="color:$1;">$2</div>');
    //text = text.replace(/\[img\](.+)\[\/img\]/gi , '<img src ="$1"/>');
    return text;


  }

}
