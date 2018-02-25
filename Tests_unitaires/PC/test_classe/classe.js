class Forme {
  constructor(x,y,h,w,vx,vy) {
    this.h = h;
    this.w = w;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
}


class Cercle extends Forme {
  constructor(x,y,h,w,vx,vy,ctx) {
    super(x,y,h,w,vx,vy)
    this._ctx  = ctx;
    this.r =  (this.h+this.w)/2;

  }

  draw () {
    this._ctx.save();
    this._ctx.beginPath();
    this._ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2,false);
    this._ctx.fillStyle = 'Turquoise';
    this._ctx.fill();
    this._ctx.restore();
    return 1
  }
  move(dt){
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
  }
  colision (){
    if (this.x-this.r<0){
      this.vx = -this.vx;
    }
    if (this.x+this.r>500){
      this.vx = -this.vx;
    }
    if (this.y-this.r<0){
      this.vy = -this.vy;
    }
    if (this.y+this.r>300){
      this.vy = -this.vy;
    }
  }
}



var int = false;
var ctx;
var c;
$(document).ready(function(){
  screenlog("SpringTurquoise","pour voir le code source : F12")
  var canvas = document.getElementById('tutoriel');
  ctx = canvas.getContext('2d');
  screenlog("Red","creation d'un cerlce")
  screenlog('red',"var c  = new Cercle(40,10);")
  c  = new Cercle(50,50,30,30,getRandomArbitrary(10,40),getRandomArbitrary(10,40),ctx);
  screenlog("Turquoise", JSON.stringify(c))
  screenlog("Red","dessine cercle")
  screenlog('red',"c.draw()")
  c.draw()
  screenlog('red',"on boucle les instructions suivantes ")
  screenlog('Turquoise',"clearRect")
  screenlog('Turquoise',"move")
  screenlog('Turquoise',"draw")
  screenlog('Turquoise',"colision")
  play();



});

function pause() {
  clearInterval(int)
  int = false;
  screenlog('BlueViolet',"pause")
}

function play() {
  if (int == false) {
    screenlog('BlueViolet',"play")
    int  = setInterval(function(){

      ctx.clearRect(0,0,500,300);
      c.move(0.1);
      c.draw();
      c.colision();
    },10)
  }else {
    screenlog('BlueViolet',"already playing")
  }

}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function screenlog(color,message) {
  var dt = new Date();
  var time = "["+dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()+"]";
  $("#screenlog").append("<span style='color:"+color+";'><b>"+time+"</b>"+message+"</span></br>")

}
