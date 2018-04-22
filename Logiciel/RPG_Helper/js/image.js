class Image extends Widget {
  constructor(parent,parentBtn, classes, src, height, width,nameBtn='send',cb) {
    super(parent, classes)
    this.nameBtn=nameBtn;
    this.parentBtn=parentBtn;
    this.btnCb=cb;
    this.btn=new PC_Button(parentBtn,"w3-button w3-blue",this.nameBtn,this.btnCb);
    this.src = src;
    this.height = height;
    this.width = width;
    this.show();
  }


  show(){
    $(this.parent).append(this.getHTML());
    this.applyStyle();
    this.hovermouse();
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
    (this.parentBtn).css("visibility","hidden")

        //console.log(this.parentBtn)
    $("#"+this.id).mouseenter(() =>{$(this.parentBtn).css("visibility","visible")});
    $("#"+this.id).mouseleave(() =>{$(this.parentBtn).css("visibility","hidden")});

    }
  }

  