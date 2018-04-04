class PC_Effet {
	constructor(rtH = 1/600,htR = 600,desc,bonus,duration,unit,player){
		this.rtH = rtH;
		this.htR = htR;
		this.desc = desc;
		this.bonus = bonus;
		this.duration = duration;
		this.unit = unit;
		this.player = player;
	}
	roundToHour(round){
		//Conversion du nombre de rounds en nombre d'heures
		hour = round*this.rtH;
		return hour;
	}
	hourToRound(hour){
		//Conversion du nombre d'heures en nombre de rounds
		round = hour*this.htR;
		return round;
	}
	live(in_fight,qte){
		if (in_fight) { //L'effet s'applique en combat
			if (unit ==0) { //L'effet est compté en heures
			 this.apply(hourToRound(qte)); //On applique l'effet après l'avoir converti en rounds
			}
			else {
				this.aply(qte); //Pas besoin de conversion, on applique l'effet
			}
		}
		else { // l'effet s'applique hors combat
			if (unit ==0) {
				this.apply(qte); //Pas besoin de conversion, on applique l'effet
			}
			else {
				this.apply(roundToHour(qte)); //On applique l'effet après l'avoir converti en heures
			}
		}
		if (this.duration <= 0) { //Si la durée est inférieure ou égale à 0, il faut détruire l'effet
			this.player.destroyEffect(this);
		}

	}
	apply(qte){
		this.duration -= qte;
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
  e  = new PC_Effet()
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
