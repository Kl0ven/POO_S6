/**
class Effect
Jean-Loup MONNIER
19/04/2018
cette classe gère les different effets du joueur
**/

class Effect {

  constructor(bonus, duration, unit, description) {
    // true si c'est un bonus false si c'est un malus
    this.bonus = bonus;
    // duré de l'effet
    this.duration = duration;
    // unité de la duré de l'effet
    // true = round / false = heure
    this.unit = unit;
    this.unitText = (this.unit)?"round":"heures";
    // description textuelle de l'effet
    this.description = description;
    this.roundToHourCoeff = 0;
    this.hourToRoundCoeff = 10000; // +infine
    // id unique pour chaque effet
    this.id = Effect.generate_ID();
    this.show();
  }

  // affiche le code HTML
  show(){
    var id = "id='"+this.id+"'";
    var classes = (this.bonus)?"class='green'" :"class='red'";
    $('#effect tr:last').after('<tr '+classes+' '+id+' ><td>'+this.description+'</td><td class="duration">'+this.duration+'</td><td>'+this.unitText +'</td></tr>');
  }

  //conversion de round en heure
  roundToHour(round) {
    return round*this.roundToHourCoeff;
  }

  //conversion d'heure en round
  hourToRound(hour){
    return hour*this.hourToRoundCoeff
  }

  // methode qui actualise l'effet
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

  // application d'une durée puis actualise l'affichage
  apply(qte){
    this.duration -= qte;
    // si l'effet est terminé on suprime l'element de DOM
    if(this.duration <=0){
      this.delEffect();
    // sinon on actualise la durée
    }else{
      $("#"+this.id+" .duration").text(this.duration);
    }
  }

  delEffect(){
    $("#"+this.id).remove();
  }
  // retourn true si l'effet est terminé
  isDead(){
    return this.duration <= 0;
  }

// methode statique qui retourne un id unique a chaque appele
  static generate_ID() {
    if( typeof Effect.counter == 'undefined' ) {
        Effect.counter = -1;
    }
    Effect.counter++;
    return "effect"+Effect.counter;
}
}
