const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

class Communication{
	constructor(pc_app){
		this.pc_app = pc_app;
	}
	openCom(pinfos,resume){
		while (this.pc_app.getOpenConnection()==True){
			//Fonction de connexion des téléphones
			wss.on('connection', function connection(ws) {
				ws.send('Vous êtes connecté !');
				if (resume ==0) { //Si la partie est nouvelle pinfos = NULL
					ws.on('message', function incoming(message) {
						pinfos = message; // On rentre les infos dans pinfos
						comm_Handler = new Com_Handler(this);
						this.comm_Handler = comm_Handler;
						this.comm_Handler.playerConnection(pinfos,resume);//On envoie

					});
				}
				else { //Si la partie existe déja, on crée un comm handler et on lance playerconnexion
					comm_Handler = new Com_Handler(this);
					this.comm_Handler = comm_Handler;
					this.comm_Handler.playerConnection(pinfos,resume);
				}
			});
				
		
		}
	}
}