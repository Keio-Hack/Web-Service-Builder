$(function(){

	var click_count = 0,
		pre_count = 0;

	$("#menu").on("mouseover",function(){

		$(this).stop(true).animate({

			right:0,
			zIndex:5

		},350);

		$("#menu span").stop(true).animate({

			right:"300px"

		},350);
	
	

	})

	.on('mouseout',function(){

		$("#menu span").stop(true).animate({

			right:0,
			zIndex:10

		},350);

		$(this).stop(true).animate({

			right:"-300px"

		},350);

	});



	$("#sub_menu").on("mouseover",function(){

		$(this).stop(true).animate({

			right:0,
			zIndex:5

		},500);

		$("#sub_menu span").stop(true).animate({

			right:"300px"

		},500);
	
	

	})

	.on('mouseout',function(){

		$("#sub_menu span").stop(true).animate({

			right:0,
			zInsex:10

		},500);

		$(this).stop(true).animate({

			right:"-300px"

		},500);

	});


	$("#preview_button").on('click',function(){

		if(pre_count===0){

			$("#white_board,#save_button").animate({
				opacity:"0"
			},1000);
	
			$("#html_tags").animate({
				bottom:"-40px"
			},1000);
	
			pre_count=1;

		}else{
			$("#white_board,#save_button").animate({
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

});