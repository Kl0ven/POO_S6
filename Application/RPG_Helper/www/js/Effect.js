class Effect {
  constructor(bonus, duration, unit, description) {
    this.bonus = bonus;
    this.duration = duration;
    this.unit = unit;
    this.description = description;
    this.roundToHourCoeff = 0;
    this.hourToRoundCoeff = 10000; // +infine
    this.unitText = (this.unit)?"round":"heures";
    this.id = Effect.generate_ID();
    this.show();
  }

  show(){
    var id = "id='"+this.id+"'";
    var classes = (this.bonus)?"class='green'" :"class='red'";
    $('#effect tr:last').after('<tr '+classes+' '+id+' ><td>'+this.description+'</td><td class="duration">'+this.duration+'</td><td>'+this.unitText +'</td></tr>');
  }

  roundToHour(round) {
    return round*this.roundToHourCoeff;
  }

  hourToRound(hour){
    return hour*this.hourToRoundCoeff
  }

  live(in_fight,qte){
    if (in_fight) { //L'effet s'applique en combat qte en round
      if (this.unit ==0) { //L'effet est compté en heures
       this.apply(this.roundToHour(qte)); //On applique l'effet après l'avoir converti en rounds
      }
      else {
        this.apply(qte); //Pas besoin de conversion, on applique l'effet
      }
    }
    else { // l'effet s'applique hors combat qte en heures
      if (this.unit ==0) {
        this.apply(qte); //Pas besoin de conversion, on applique l'effet
      }
      else {
        this.apply(this.hourToRound(qte)); //On applique l'effet après l'avoir converti en heures
      }
    }

  }

  apply(qte){
    this.duration -= qte;
    if(this.duration <=0){
      $("#"+this.id).remove();
    }else{
      $("#"+this.id+" .duration").text(this.duration);
    }
  }

  isDead(){
    return this.duration <= 0;
  }

  static generate_ID() {

    if( typeof Effect.counter == 'undefined' ) {
        Effect.counter = -1;
    }
    Effect.counter++;
    return "effect"+Effect.counter;
}
}
