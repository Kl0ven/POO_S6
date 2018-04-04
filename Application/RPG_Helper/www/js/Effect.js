class Effect {
  constructor(bonus, duration, unit, description) {
    this.bonus = bonus;
    this.duration = duration;
    this.unit = unit;
    this.description = description;
    this.roundToHourCoeff = 0;
    this.hourToRoundCoeff = 10000; // +infine
  }

  roundToHour(round) {
    return round*this.roundToHourCoeff;
  }

  hourToRound(hour){
    return hour*this.hourToRoundCoeff
  }

  live(in_fight,qte){
    if (in_fight) { //L'effet s'applique en combat
      if (this.unit ==0) { //L'effet est compté en heures
       this.apply(hourToRound(qte)); //On applique l'effet après l'avoir converti en rounds
      }
      else {
        this.aply(qte); //Pas besoin de conversion, on applique l'effet
      }
    }
    else { // l'effet s'applique hors combat
      if (this.unit ==0) {
        this.apply(qte); //Pas besoin de conversion, on applique l'effet
      }
      else {
        this.apply(roundToHour(qte)); //On applique l'effet après l'avoir converti en heures
      }
    }

  }

  apply(qte){
    this.duration -= qte;
  }

  isDead(){
    return this.duration <= 0;
  }
}
