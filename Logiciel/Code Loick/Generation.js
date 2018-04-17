
//Generation : classe abstraite 
class Generation {
	constructor(name){
		this.BDD_Name = name
	}

}

class G_Object extends Generation{
	constructor(name,o,m,r){
		super(name)
		this.object = o
		this.magic = m
		this.scarcity = r 
	}

	//generate()
}