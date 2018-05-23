
class Character{
	constructor(n){
	this.name = n;
	this.id = Character.generate_ID();
	this.image = null;

	this.pc_effect = [];

	}


	static generate_ID() {

    if( typeof Character.counter == 'undefined' ) {
        Character.counter = -1;
    }
    Character.counter++;
    return Character.counter;
	}
}

