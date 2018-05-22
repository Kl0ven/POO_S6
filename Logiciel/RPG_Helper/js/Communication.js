const WebSocket = require('ws');

class Communication{
	constructor(pc_app){
		this.pc_app = pc_app;
		this.wss = new WebSocket.Server({ port: 8080 });
		this.comm_Handlers =[];
	}
	
	openCom(pinfos,resume){
		while (this.pc_app.getOpenConnection()==True){
			//Fonction de connexion des téléphones
			this.wss.on('connection', (ws)=> {
						comm_Handler = new Com_Handler(this,ws); // On crée un comhandler et on lui envoie la connexion.
						this.comm_Handlers.push(comm_Handler);
						comm_Handler.playerConnection(pinfos,resume);//On envoie
					});



		}
		this.wss.broadcast = (data) => {
			this.wss.clients.forEach(function each(client) {
				if (client.readyState === WebSocket.OPEN) {
					client.send(data);
				}
			});
		};
	}

	getDataUri(url, callback) {
		var image = new imageStd();

		image.onload = function () {
			var canvas = document.createElement('canvas');
			    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
			    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

			    canvas.getContext('2d').drawImage(this, 0, 0);
			    callback(canvas.toDataURL('image/png'));
			};

			image.src = url;
	}

	sendImg(url){
		this.getDataUri(url, (dataUri) => {
    //console.log(dataUri)
    this.wss.broadcast(JSON.stringify({type: "image", data : dataUri}))
    })

	}






}