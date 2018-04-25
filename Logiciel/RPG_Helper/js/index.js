$(document).ready(function()
{
	new PC_Button($(".app_PC_1"),"w3-button w3-black","hello",clickpopup)
	new TextArea($(".app_PC_2"),$(".app_PC_2"),undefined,5,20,undefined,undefined)

		//les 2 app_PC : le bouton et la textarea seront affichés l'un en dessous de l'autre
	new Image ($(".image"),$(".boutonsend"),undefined,"assets/jppdejpp.png",200,200,undefined,clickpopup)



})
