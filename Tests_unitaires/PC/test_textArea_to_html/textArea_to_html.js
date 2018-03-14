

$(document).ready(function(){


});

function code(id , code ) {
	$("#"+id).val($("#"+id).val()+code)
  $("#"+id).focus()
  screenlog("green", code)
}


function screenlog(color,message) {
  var dt = new Date();
  var time = "["+dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()+"]";
  $("#screenlog").append("<span style='color:"+color+";'><b>"+time+"</b>"+message+"</span></br>")

}

function toHTML(id){
  var text = $("#"+id).val();
  text = text.replace(/<[^>]+>/gi,"");
  text = text.replace(/\[g\](.+)\[\/g\]/gi, '<strong>$1</strong>');
  text = text.replace(/\[i\](.+)\[\/i\]/gi, '<em>$1</em>');
  text = text.replace(/\[s\](.+)\[\/s\]/gi, '<u>$1</u>');
  text = text.replace(/\[center\](.+)\[\/center\]/gi,'<div id ="center">$1</div>' );
  text = text.replace(/\[left\](.+)\[\/left\]/gi, '<div id ="left">$1</div>');
  text = text.replace(/\[right\](.+)\[\/right\]/gi, '<div id ="right">$1</div>' );
  text = text.replace(/\[sub\](.+)\[\/sub\]/gi,  '<sub>$1</sub>');
  text = text.replace(/\[sup\](.+)\[\/sup\]/gi, '<sup>$1</sup>');
  text = text.replace(/(https?:\/\/[a-z0-9._/-]+)/gi, '<a href="$1">$1</a>');
  text = text.replace(/\[color color=(\#[A-Z0-9]{6})\](.+)\[\/color\]/gi, '<div style="color:$1;">$2</div>');
  //text = text.replace(/\[img\](.+)\[\/img\]/gi , '<img src ="$1"/>');

  $("#html").html(text)
  console.log(text);


}
