
class Character{
	constructor(n){
	this.name = n;
	this.id = Character.generate_ID();
	this.image = undefined;
	this.initiative = undefined;


	}

	getName(){
		return this.name;
	}
	static generate_ID() {

    if( typeof Character.counter == 'undefined' ) {
        Character.counter = -1;
    }
    Character.counter++;
    return "Player" + Character.counter+"";
	}
}
