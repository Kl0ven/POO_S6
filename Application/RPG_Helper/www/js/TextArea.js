/**
class TextArea derivé de Widget
Jean-Loup MONNIER
19/04/2018
cette classe gère l'affichage des zones de texte & input
**/

class TextArea extends Widget {
  constructor(parent,parentBtn, classes,btnclass, height, width, nameBtn = "save", cb = 0) {
    // init de la classe parente
    super(parent, classes)
    // nom du btn associer a la TextArea
    this.nameBtn = nameBtn;
    // si une callback est fourni alors on l'utilise sinon on utilise celle par defaut
    this.btnCb = (typeof cb == "function") ? cb : () => {this.switching()};
    // declaration du btn
    this.btn = new Button(parentBtn,btnclass,this.nameBtn,this.btnCb);
    // hauteur et largeur
    this.height = height;
    this.width = width;
    // texte dans la zone de texte
    this.text = ""
    // false =>  l'utilisateur peut renter du texte
    // true  =>  l'utilisateur ne peut pas renter du texte et le texte et afficher en temps que code HTML
    this.state = false; //textarea
    this.show();
  }


  show(){
    if($("#"+this.id)){
      $("#"+this.id).remove();
    }
    $(this.parent).append(this.getHTML());
    if(this.height == 1){
      $("#"+this.id).keypress((event)  => {
        // Check the keyCode and if the user pressed Enter (code = 13)
        // disable it
        if (event.keyCode == 13) {
          event.preventDefault();
          $("#"+this.btn.id).click();
        }
      });
    }
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
      this.btn.settext(this.nameBtn);
    }


  }

  toHTML(){

      var text = $("#"+this.id).val();
      this.text = text;

      text = text.replace(/<[^>]+>/gi,"");
      text = text.replace(/[\r\n]/g, '</br>');
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

    toString(){
      if (this.state){
        return this.text;
      }else {
        return $("#"+this.id).val();
      }
    }

    setText(text){
      this.text = text;
      this.show();
    }

  }
