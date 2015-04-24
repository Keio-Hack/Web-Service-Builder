$(function(){
	var saving_button = document.getElementById("save_button");
	saving_button.onclick = function(){
		var json_data = JSON.stringify(whiteboardHtmlInfo);
		console.log(json_data);
		var testobj = JSON.parse(json_data).html.body;
	}
});