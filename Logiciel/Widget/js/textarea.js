class TextArea extends Widget{
	constructor(parent,parentBtn,classes,height,width,nameBtn='save',cb=0){
		super(parent,classes)
    this.nameBtn = nameBtn;
    this.btnCb = (typeof cb == "function") ? cb : () =>{this.switching()};
    this.btn = new PC_Button(parentBtn,"w3-button w3-blue",this.nameBtn,this.btnCb);
		this.height = height;
		this.width = width;
		this.text = ""
    this.state = false;
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
    if(!this.state){//si on est en zone modifiable
      var html = this.toHTML();// html prend la valeur de notre texte + changement des balises 
      $("#"+this.id).remove();//# = sélecteur d'element hmtl + ON DETRUIT L'ELEMENT QUI CORRESPOND A l'ID
      var id = this.isID() ? 'id="'+ this.id +'"' : '';//sert à rien (mais marque du texte dans le html)
      var classes = this.isClasses() ? 'class="'+ this.classes +'"' : '';//pk puisque on utilise pas de classe
      $(this.parent).append('<div '+id+" "+classes+' >'+html+'</div>'); //on ajoute notre code dans le html
      this.state = true;//on se met en zone non modifiable
      this.btn.settext("modifier");// on met le bouton sur "modifier"
    }else{//si on est en zone non modifiable
      $("#"+this.id).remove();
      this.show();//on affiche la zone modifiable
      this.state = false;//on rend la zone modifiable
      this.btn.settext(this.nameBtn);// on remet le bouton sur 'save'
    }


  }  



  toHTML(){
    var text = $("#"+this.id).val();//.val()? ou on tape le texte ?
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