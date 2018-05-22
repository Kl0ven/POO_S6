class Gene_dice {
  constructor(para) {
    this.diceNb = parseInt(para.split(/[dD]/)[0]);
    this.faceNb = parseInt(para.split(/[dD]/)[1]);
  }

  get(){
    if (isNaN(this.diceNb) || isNaN(this.faceNb)){
      return "Parsing Error";
    }
    var sum = 0;
    for (var i = 0; i < this.diceNb; i++) {
      var val = this.getRandomIntInclusive(1,this.faceNb);
      sum += val;
    }
    return sum;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
}
