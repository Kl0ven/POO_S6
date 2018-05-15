class Error_Handler {
  constructor(code, message,blocking,infos = undefined ) {
    this.code = code;
    this.message = message;
    this.infos = infos;
    this.blocking = blocking;
    this.display();
  }

  display(){
    screenlog('RED',"Erreur code: "+this.code);
    if (this.blocking) {
      if (typeof this.infos != "undefined") {
          console.log(this.infos);
      }
      throw "Erreur code: "+this.code+" : " + this.message;
    }else {
        console.log("Erreur code: "+this.code+" : " + this.message);
        if (typeof this.infos != "undefined") {
            console.log(this.infos);
        }
    }
  }
}



$(document).ready(function(){
  new Error_Handler(001,'test1',true,{text:"kfjhbvjfbvkjdfv",satus:42})
  new Error_Handler(002,'test2',true)



  var i  = 4/0;
});






function screenlog(color,message) {
  var dt = new Date();
  var time = "["+dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()+"]";
  $("#screenlog").append("<span style='color:"+color+";'><b>"+time+"</b>"+message+"</span></br>")

}
