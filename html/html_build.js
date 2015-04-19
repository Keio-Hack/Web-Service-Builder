$(function(){

	var pre_count = 0;

	$("#menu,#dash_board").on("mouseover",function(){

		$(this).stop(true).animate({

			right:0

		},350);

		// $(this).find("span").css({opcity:0});

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

		// $(this).find("#menu_logo").css({opcity:1});

		$(this).stop(true).animate({

			right:"-300px"

		},350);

	});



	

	$("#preview_button").on('click',function(){

		if(pre_count===0){

			$("#white_board,#save_button,#WAB_logo").animate({
				opacity:"0"
			},1000);
	
			$("#html_tags").animate({
				bottom:"-40px"
			},1000);
	
			pre_count=1;

		}else{
			$("#white_board,#save_button,#WAB_logo").animate({
				opacity:"1"
			},1000);
	
			$("#html_tags").animate({
				bottom:0
			},1000);
	
			pre_count=0;


		}

	});

		
	$("#save_button").on('click',function(){

		$(this).animate({marginBottom:1},{

			duration:300,

			step:function(now){
				$(this).css({transform:'rotate(' + (now * 360) + 'deg)'});
			},
			
			complete:function(){
			
				$(this).css('marginBottom', 0);
			}
		});

	});


	// $("#user_dash_link").on('mouseover',function(){

	// 	$(this).animate({

			

	// 	},300);

	// });

});