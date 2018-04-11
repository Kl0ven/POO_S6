class Monster extends Character{
	constructor(n){
	super(n)

	this.description = null;

	}

	setDescription(desc){
		this.description = desc;
	}

	duplicate(){
		let M = new Monster(this.name,this.id + 1)
		M.setDescription(this.description)
		return M
	}

	addEffect(e){
		this.pc_effect.push(e)
	}

	getEffect(){
		return this.pc_effect
	
	}
}


//______________________________________Tests

// $(document).ready(function(){

// M1 = new Monster('squelette')
// M1.setDescription('blablabla')
// screenlog(M1.description)
// M2 = M1.duplicate()
// screenlog(M2.description)

// screenlog(M1.id)
// screenlog(M2.id)

// });



//  function screenlog(message) {
//    $("#screenlog").append("<p>"+message+"</p>")
//  }

