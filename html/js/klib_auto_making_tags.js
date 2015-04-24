$(function(){
	var getstring = JSON.parse(get_json_info());
	var parentobj =  $("#parent_of_draggedbuttons");
	for(var i = 0; i < getstring.length; i++){
		parentobj.append($("<li><p draggable = 'true' class = 'draggedbuttons'>" + getstring[i].type + "</p></li>"));
	}
});