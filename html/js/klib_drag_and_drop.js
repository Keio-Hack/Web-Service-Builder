//これにhtml文書の情報を格納
var whiteboardHtmlInfo = {
	"html" : {
		"head" : {},
		"body" : {},
		"other" : {}
	},
	"js" : {

	}
};

var target_on_whiteboard = null; //これにwhiteboard内で選択されているオブジェクトが代入される

//このコンストラクタは、新しくオブジェクトをドロップした時にその情報を格納するオブジェクトを作る（これはwhiteboardHtmlInfo.html.bodyに格納される）。
$(function(){
var ContentInfo = function (id, position_X, position_Y, text, type, css){
	this.id = id;
	this.positionX = position_X;
	this.positionY = position_Y;
	this.text = text; //この中のinnerHTMLプロパティは、div要素のinnerHTML
	this.type = type;
	this.css = css; //div要素のinnerHTMLではなく、子要素の中の文字列のみ
};

/* ここから関数の定義 */

//配置した要素につけるIDに使う。
function makeRandomID (){
	var randam = Math.floor(Math.random() * 1000);
	var date = new Date();
	var time = date.getTime();
	return randam + '_' + time.toString();
}

//ドラッグする要素にドラッグイベント開始時のイベントを追加。
var draggedButtons = document.getElementsByClassName("draggedbuttons");
for(var i = 0; i < draggedButtons.length; i++){
	draggedButtons[i].identi = i; //どの種類のオブジェクトがドラッグされたのか判断するための識別子。このデータを渡し、ドロップ時に使う。
	draggedButtons[i].ondragstart = function(event){
		if(target_on_whiteboard){
 			var set_css_form = document.forms.set_css;
 			$(set_css_form).empty();
 			if(target_on_whiteboard.classList.contains('cursored_object_on_whiteboard')){
 				target_on_whiteboard.classList.remove("cursored_object_on_whiteboard");
 			}
 		}

		var setobj = {"identi" : event.currentTarget.identi, "className" : event.target.className};
		event.dataTransfer.setData("text/plain",JSON.stringify(setobj)); //JSON形式でデータを渡す
	}
}

//whiteboard上にドロップしたオブジェクトのclick時のイベントハンドラに登録する関数。
function NewElementClickFunc(event){
	if(!target_on_whiteboard){
		target_on_whiteboard = event.currentTarget;
	}
	var json_css_info_obj = JSON.parse(get_json_info())[target_on_whiteboard.tagType];
	if(!target_on_whiteboard.classList.contains("cursored_object_on_whiteboard")){
		target_on_whiteboard.classList.add("cursored_object_on_whiteboard");
	}

	var set_css_form = document.forms.set_css;
	if(!($(set_css_form).parent().find("li")).length){ //$(set_css_form).parent().find("li")).lengthがゼロだったら、それはcssのらんが表示されていないということ
		for(var cssname in (whiteboardHtmlInfo.html.body[target_on_whiteboard.id].css)){
			var cssinfo = whiteboardHtmlInfo.html.body[target_on_whiteboard.id].css[cssname];
				$(set_css_form).append($("<li><label>" + cssinfo.label_text + " ： </label>" + "<input type = '" + cssinfo.css_input_type + "' name = 'set_" + cssname + "' value = '" +
				cssinfo.value + "'>" + "</li>"));

		$("#dash_board").stop(true).animate({
			right:0
		},500,"swing");


			var newform = set_css_form["set_" + cssname];

			if(cssinfo.style_type === "innerHTML"){
				(function(cssname){
					newform.onchange = function(event){
						$(target_on_whiteboard).find(whiteboardHtmlInfo.html.body[target_on_whiteboard.id].type).text(event.currentTarget.value);
						whiteboardHtmlInfo.html.body[target_on_whiteboard.id].text = target_on_whiteboard[cssname];
						whiteboardHtmlInfo.html.body[target_on_whiteboard.id].css[cssname].value = event.currentTarget.value;
				};
				})(cssname);//for in文で回しているため、cssnameの値は変わっていく。そこで、クロージャを利用してcssnameの値を保存。以下同様。
				newform.onclick = function(event){
					event.stopPropagation();
				};
			}else if(cssinfo.style_type === "attr"){
				if(cssname === "src"){
					(function(cssname){
						newform.onchange = function(event){
							var files = event.target.files;
	
							for (var i=0; i< files.length; i++) {
    							var f = files[i];
    							var reader = new FileReader();
					
    							if (!f.type.match('image.*')) {
    							  alert("画像ファイル以外は表示できません。");
    							  continue;
    							}
					
    							reader.onerror = function (event) {
    							  alert("読み取り時にエラーが発生しました。");
    							}
					
    							if (f.type.match('image.*')) {
    							  // ファイル読取が完了した際に呼ばれる処理
    							  reader.onload = function(event){
													$(target_on_whiteboard).find(whiteboardHtmlInfo.html.body[target_on_whiteboard.id].type).attr(cssname, event.target.result);
													whiteboardHtmlInfo.html.body[target_on_whiteboard.id].css[cssname].value = event.target.result;
												};
    							  // readAsDataURLメソッドでファイルの内容を取得
    							  reader.readAsDataURL(f);
    							}
    						}
    					};
    				})(cssname);


				}else{
					(function(cssname){
					newform.onchange = function(event){
						$(target_on_whiteboard).find(whiteboardHtmlInfo.html.body[target_on_whiteboard.id].type).attr(cssname, event.currentTarget.value);
						whiteboardHtmlInfo.html.body[target_on_whiteboard.id].css[cssname].value = event.currentTarget.value;
					};
					})(cssname);
				}
				newform.onclick = function(event){
					event.stopPropagation();
				};


			}else if(cssinfo.style_type === "css"){
				(function(cssname){
					newform.onchange = function(event){
					$(target_on_whiteboard).find(whiteboardHtmlInfo.html.body[target_on_whiteboard.id].type).css(cssname, event.currentTarget.value);
					whiteboardHtmlInfo.html.body[target_on_whiteboard.id].css[cssname].value = event.currentTarget.value;
				};
				})(cssname);
				newform.onclick = function(event){
					event.stopPropagation();
				};
			}
		}
	}
	event.stopPropagation();
}

/* 関数の定義終了 */

/*　ここからwhiteboard処理　*/
var whiteboard = document.getElementById("white_board");
whiteboard.ondragover = function(event){
	event.preventDefault(); //デフォルトではドロップをできないようにするというイベントリスナが登録されているので、それをキャンセル
}

whiteboard.ondrop = function(event){
	event.preventDefault;

	var getStringFromDataTransfer = event.dataTransfer.getData("text/plain");

	var get_obj_from_json = JSON.parse(getStringFromDataTransfer); //ドラッグ開始時に渡したデータの取得

	if(get_obj_from_json && (get_obj_from_json.className === "draggedbuttons")){

		var NewElement = document.createElement("div");
		var parse_info = JSON.parse(get_json_info());
		var json_css_info_obj = parse_info[get_obj_from_json.identi];
		NewElement.tagType = get_obj_from_json.identi; //タグの種類を判別するために使う
		NewElement.innerHTML = json_css_info_obj.defaultOuterHTML; //ここ変えました
		NewElement.draggable = "true";
		//div要素をドラッグ可能に
		NewElement.className = "droppedButtons";
		//droppedButtonsのCSSを適用
		NewElement.id = makeRandomID();

		NewElement.style.position = "absolute";

		whiteboard.appendChild(NewElement);

		var whiteboardPosition = whiteboard.getBoundingClientRect();

		var dropmouseposition = {x : event.clientX, y : event.clientY};
		var NewElementPositionInWhiteboard = {x : (dropmouseposition.x - whiteboardPosition.left),
											  y : (dropmouseposition.y - whiteboardPosition.top)};

		NewElement.style.left = (NewElementPositionInWhiteboard.x)+ "px";

		NewElement.style.top = (NewElementPositionInWhiteboard.y) + "px";

		//新しく作ったオブジェクトの情報をwhiteboardHtmlInfo.html.bodyに代入
		whiteboardHtmlInfo["html"]["body"][NewElement.id] = new ContentInfo(NewElement.id, NewElement.style.left, NewElement.style.top, NewElement.innerHTML, json_css_info_obj.type, json_css_info_obj.css);


		/* ここからwhiteboardの右にcssの欄を表示させるためのコード */
		target_on_whiteboard = NewElement;
		NewElement.onclick = NewElementClickFunc; //クリックした時に右にcssの欄が表示されるようにする。
		var clickevent = document.createEvent("MouseEvents"); // イベントオブジェクトを作成
  		clickevent.initEvent("click", false, true);
  		target_on_whiteboard.dispatchEvent(clickevent);

		/* ここまで、ドロップ時にcssの欄にそのオブジェクトのcssを表示させるコード */



		//これから、jQuery UIを利用してwhiteboard内での自由なドラッグアンドドロップを実装
		//ドロップ時にwhiteboardHtmlInfo内の座標の情報を書き換えるようにしている
		$(NewElement).draggable({
		containment : "parent",
		stop : function(event, ui){
			whiteboardHtmlInfo["html"]["body"][event.target.id]["positionX"] = ui.position.left + "px";
			whiteboardHtmlInfo["html"]["body"][event.target.id]["positionY"]= ui.position.top + "px";
		}
		});

	}
}
});