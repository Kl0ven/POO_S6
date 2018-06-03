class Description {
  constructor(parent,rencontre,app_PC,m="",url=undefined) {
    this.parent = parent;
    this.id = Description.generate_ID();
    this.image = undefined;
    this.message = m;
    this.url = url;
    this.app_PC = app_PC;
    this.delBtn = undefined;
    this.encounterName = rencontre;
    this.setup();

  }






  setup(){
    $(this.parent).append("<div id='"+this.id+"' class='description'><div class='btn'></div><div class='ta'></div><div class='img'><div class='btnsend'></div></div><hr></div>");
    this.textarea = new TextArea($("#"+this.id+" .ta"),$("#"+this.id+" .btn"),undefined,10,80,'Sauvegarder',()=>{this.textarea.switching();this.message = this.textarea.gettext()});
    this.btnimg = new PC_Button($("#"+this.id+" .btn"),"w3-button w3-blue","Image",() => {this.addImage();})
    this.delBtn = new PC_Button($("#"+this.id+" .btn"),"w3-button w3-red","Supprimer Description",() => {this.app_PC.UI.delConfirm("la description",()=>{this.app_PC.UI.delDesription(this.id,this.encounterName);})})
    this.textarea.setText(this.message);
    if(typeof this.url != "undefined"){
      this.changeImage(this.url);
    }
  }

  addImage(){
    var desc = this;
    $.confirm({
      title: "Entrer l'url de l'image",
      useBootstrap:false,
      boxWidth:'50%',
      type: 'green',
      theme: 'material',
      content: '' +
      '<form action="" class="formName">' +
      '<div class="form-group">' +
      '<label>URL :         </label>' +
      '<input type="text" placeholder="URL" class="url form-control" required autofocus />' +
      '</div>' +
      '</form>',
      buttons: {
        formSubmit: {
          text: 'Valider',
          btnClass: 'btn-green',
          action: function () {
            var url = this.$content.find('.url').val();
            if( !desc.checkURL(url)){
              $.alert('url non valide');
              return false;
            }
            desc.changeImage(url);

          }
        },
        Revenir: function () {
          //close
        },
      },
      onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
          // if the user submits the form by pressing enter in the field.
          e.preventDefault();
          jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
      }
    });
  }

  changeImage(url){
    if(typeof this.image != "undefined"){
      this.image.delimg();
    }
    this.url = url;
    this.image = new Image($("#"+this.id+" .img"),$("#"+this.id+" .btnsend"), "zede", url, "", "",()=>{
        if(typeof this.app_PC.comm != "undefined"){
          this.app_PC.comm.sendImg(this.url);
        }
    });

  }
  checkURL(url) {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  getInfos(){
    return {m:this.message,url:this.url}
  }

  hide(){
      $("#"+this.id).hide();
  }


  show(){
    if (!$("#"+this.id).length){this.setup();}
    else{
    $("#"+this.id).show();
    }
  }
  static generate_ID() {

    if( typeof Description.counter == 'undefined' ) {
        Description.counter = -1;
    }
    Description.counter++;
    return "desc"+Description.counter;
}
}
