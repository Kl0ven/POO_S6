class Communication{
	constructor(pc_app){
		this.pc_app = pc_app;
	}
	openCom(pinfos,resume){
		if (resume == 0) {}
			while (this.pc_app.getOpenConnection()==True){
				//Fonction de connexion des téléphones
				//Quand un téléphone se connecte
				comm_Handler = new Com_Handler(this);
				this.comm_Handler = comm_Handler;
			}
	}
}