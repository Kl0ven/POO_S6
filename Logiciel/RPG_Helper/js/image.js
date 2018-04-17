class Image extends Widget {
  constructor(parent, classes, src, height, width) {
    super(parent, classes)
    this.src = src;
    this.height = height;
    this.width = width;
    this.show();
  }


  show(){
    $(this.parent).append(this.getHTML());
    this.applyStyle();
    //this.hovermouse();
  }

  getHTML(){
    var id = this.isID() ? 'id="'+ this.id +'"' : '';
    var classes = this.isClasses() ? 'class="'+ this.classes +'"' : '';
    return '<img src="'+this.src+'" '+id+" "+classes+'>';
  }

  applyStyle(){
    $("#"+this.id).css("height",this.height+"px");
    $("#"+this.id).css("width",this.width+"px");
  }

  hovermouse(){
    $(this.classes).mouseenter(alert("ceci est un popup !"));
    }
  }


  