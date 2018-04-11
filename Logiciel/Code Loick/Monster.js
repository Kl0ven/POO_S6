class Monster extends Character{
	constructor(n,id){
	super(n,id)

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

}






//______________________________________Tests

$(document).ready(function(){

M1 = new Monster('squelette',1)
M1.setDescription('blablabla')
screenlog(M1.description)
M2 = M1.duplicate()
screenlog(M2.description)

});



 function screenlog(message) {
   $("#screenlog").append("<p>"+message+"</p>")
 }

