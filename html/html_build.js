$(function(){

	var pre_count = 0;

	$("#menu,#dash_board").on("mouseover",function(){

		$(this).stop(true).animate({

			right:0

		},350);

		

		$(this).find("span").stop(true).animate({

			right:"300px",
			zIndex:10,
			opacity:0

		},350);
	
	

	})

	.on('mouseout',function(){

		$(this).find("span").stop(true).animate({

			right:0,
			zIndex:1,
			opacity:1

		},350);

		

		$(this).stop(true).animate({

			right:"-300px"

		},350);

	});



	

	$("#preview_button").on('click',function(){

		if(pre_count===0){

			$("#white_board,#save_button,#WAB_logo").stop(true).animate({
				opacity:"0"
			},1000);
	
			$("#html_tags").stop(true).animate({
				bottom:"-40px"
			},1000);
	
			pre_count=1;

		}else{
			$("#white_board,#save_button,#WAB_logo").stop(true).animate({
				opacity:"1"
			},1000);
	
			$("#html_tags").stop(true).animate({
				bottom:0
			},1000);
	
			pre_count=0;


		}

	});

		
	$("#save_button").on('click',function(){

		$(this).stop(true).animate({marginBottom:1},{

			duration:300,

			step:function(now){
				$(this).css({transform:'rotate(' + (now * 360) + 'deg)'});
			},
			
			complete:function(){
			
				$(this).css('marginBottom', 0);
			}
		});

	});





	$(".menu_button").on('click',function(){
		$(this).animate({
			opacity:0.4
		},200);
	});

	

	$(document).keydown(function(e) {
	 
	    switch (e.keyCode) {
	 
	 		// p--preview
	        case 80:
	            $("#preview_button").click();
	            break;

	        // s--save
	        case 83:
	        $("#save_button").click();
	        break;


	        // m--menu
	        case 77:
	        $("#menu").click();
	        break;
	    }
	 
	});

});