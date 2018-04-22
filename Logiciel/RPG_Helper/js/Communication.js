const WebSocket = require('ws');

class Communication{
	constructor(ip,pc_app){
		this.pc_app = pc_app;
		this.ip = ip;
		this.wss = WebSocket.Server({ port: 8080 });
		this.comm_Handlers =[];
	}
	openCom(pinfos,resume){
		that = this
		while (this.pc_app.getOpenConnection()==True){
			//Fonction de connexion des téléphones
			wss.on('connection', function connection(ws) {
						comm_Handler = new Com_Handler(that,ws); // On crée un comhandler et on lui envoie la connexion.
						this.comm_Handlers.push(comm_Handler);
						comm_Handler.playerConnection(pinfos,resume);//On envoie
			});
				
		
		}
	}




}