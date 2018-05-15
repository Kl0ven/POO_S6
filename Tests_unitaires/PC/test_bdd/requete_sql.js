
var sqlite3 = require('sqlite3').verbose();
var file =  "dnd3_5.sqlite";
var db = new sqlite3.Database(file);




function request_align(n){

	var stmt = db.prepare("SELECT (?) FROM dnd35_alignements")

	stmt.all(n,function(err,row){
		console.log(row)
	});
}

//$(document).ready(function(){

    request_align('nom')

//});