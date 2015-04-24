var get_json_info = (function(){
	var obj_info_before = [
		{"type" : "p", "defaultOuterHTML" : "<p>テキストを入力してください</p>", "css" : {
			"innerHTML" : {"value" : "テキストを入力してください", "label_text" : "テキスト", "style_type" : "innerHTML", "css_input_type" : "text"},
			"fontSize" : {"value" : "12px", "label_text" : "フォントサイズ", "style_type" : "css", "css_input_type" : "text"},
			"color" : {"value" : "black", "label_text" : "文字の色", "style_type" : "css", "css_input_type" : "text"}}},
		{"type" : "h1", "defaultOuterHTML" : "<h1>テキストを入力してください</h1>", "css" : {
			"innerHTML" : {"value" : "テキストを入力してください", "label_text" : "テキスト", "style_type" : "innerHTML", "css_input_type" : "text"},
			"fontSize" : {"value" : "48px", "label_text" : "フォントサイズ", "style_type" : "css", "css_input_type" : "text"},
			"color" : {"value" : "black", "label_text" : "文字の色", "style_type" : "css", "css_input_type" : "text"}}},
		{"type" : "img", "defaultOuterHTML" : "<img alt='画像が表示できません'>", "css" : {
			"alt" : {"value" : "画像が表示できません", "label_text" : "alt", "style_type" : "attr", "css_input_type" : "text"},
			"src" : {"value" : "", "label_text" : "画像の選択", "style_type" : "attr", "css_input_type" : "file"}}},
			{"type" : "button", "defaultOuterHTML" : "<button type='button'>テキストを入力してください</button>", "css" : {
			"innerHTML" : {"value" : "テキストを入力してください", "label_text" : "テキスト", "style_type" : "innerHTML", "css_input_type" : "text"}}},
			{"type" : "table", "defaultOuterHTML" : "<table><tr><th></th></tr><tr><td></td></tr></table>", "css" : {}},
		{"type" : "iframe","defaultOuterHTML" : "<iframe></iframe>", "css" : {}},
		{"type" : "form", "defaultOuterHTML" : "<form></form>", "css" : {}}
	];
	//defaultOuterHTMLを追加
	var json_info = JSON.stringify(obj_info_before);
	return function(){return json_info;};
})();

 $(function(){
 	var body = document.body;
 	var dash_board = document.getElementById("dash_board");
 	body.onclick = function(event){
 		if(target_on_whiteboard){
 			var set_css_form = document.forms.set_css;
 			$(set_css_form).empty();
 			$(dash_board).stop(true).animate({
			right:"-300px"
			},300);
 			if(target_on_whiteboard.classList.contains('cursored_object_on_whiteboard')){
 				target_on_whiteboard.classList.remove("cursored_object_on_whiteboard");
 			}
 			target_on_whiteboard = null;
 		}
 	}
 	dash_board.onclick = function(event){
 		event.stopPropagation();
 	};
 });