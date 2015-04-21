$(function(){

	var pre_count = 0;

	$("#menu").on("mouseover",function(){

		$(this).stop(true).delay(300).animate({

			right:0

		},500,"swing");

		$(this).find("span").stop(true).animate({

			right:"-20px",
			zIndex:10,
			opacity:0

		},300,"swing");
	
	})

	.on('mouseout',function(){

		$(this).find("span").stop(true).delay(300).animate({

			right:0,
			zIndex:1,
			opacity:1

		},350);

		

		$(this).stop(true).animate({

			right:"-300px"

		},300);

	});



	

	$("#preview_button").on('click',function(){

		if(pre_count===0){

			$("#white_board,#save_button,#WAB_logo").stop(true).animate({
				opacity:"0"
			},1000);
	
			$("#html_tags").stop(true).animate({
				bottom:"-40px"
			},300);
	
			pre_count=1;

		}else{
			$("#white_board,#save_button,#WAB_logo").stop(true).animate({
				opacity:"1"
			},1000);
	
			$("#html_tags").stop(true).animate({
				bottom:0
			},300,"swing");
	
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





	$(".menu_button,.option_button,#keio_hack_link").on('click',function(){
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


	$("li").on('mouseover',function(){
		$(this).stop(true).animate({
			padding:"0 0 30px 0 ",
			backgroundColor:"rgba(150,200,120,1)"
		},300);

		$(this).find("li").stop(true).animate({
			padding:"10px 0 0 0 "
			// backgroundColor:"rgba(150,200,120,1)"
		},300);

		$("#html_tags").stop(true).animate({
			height:"50px",
			// backgroundColor:"rgba(150,200,120,1)"
		},300);
	})
	.on("mouseout",function(){

		$(this).stop(true).animate({
			padding:0,
			backgroundColor:"rgba(150,200,120,0.3)"
		},300)


		$("#html_tags").stop(true).animate({
			height:"30px",
			// backgroundColor:"rgba(150,200,120,0.3)"
		},300);

	})

});