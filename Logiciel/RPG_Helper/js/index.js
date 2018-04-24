$(document).ready(function()
{
	new PC_Button($(".app_PC_1"),"w3-button w3-black","hello",clickpopup)
	new TextArea($(".app_PC_2"),$(".app_PC_2"),undefined,5,20,undefined,undefined)
	new Image ($(".image"),undefined,"assets/jppdejpp.png",100,100)
	//les 2 app_PC : le bouton et la textarea seront affichés l'un en dessous de l'autre

	P1 = new Player('zangdar')
	E1  = new PC_Effet('bonus de test',bonus,dur,unit,10)
	P1.addEffect(E1)
	screenlog(P1.pc_effect)



function screenlog(message) {
   $("#screenlog").append("<p>"+message+"</p>")
	}


})
