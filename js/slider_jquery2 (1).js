$(function(){
	//Object Variables
	var sliders = $("#slider>div>:nth-child(1)>section");
	var arrows = $("#slider>div>:nth-child(2)>div");
	var pos = 0;
	var len = sliders.length;
	var speed = 1000;
	var timer = 0;
	var timerspeed = 5000;
	var flag = true;

	//Functions Define
	function initial(){
		sliders.eq(pos).animate({left:"0"},speed);
		timer = setTimeout(function(){
			rs();
		},timerspeed);
	}

	function ls(){
		if(flag){
			flag = false;
			clearTimeout(timer);
			sliders.eq(pos--).animate({left:"101%"},speed);
			if(pos < 0){
				pos = len - 1;
			}
			sliders.eq(pos).css({"left":"-101%"}).animate(
				{left:"0"},{
				duration:speed,
				complete:function(){
					flag = true;
					timer = setTimeout(function(){
						rs();
					},timerspeed);
				}
			});
		}
	}

	/*function ls(){
		clearTimeout(timer);
		sliders.eq(pos--).animate({left:"101%"},speed);
		if(pos < 0){
			pos = len - 1;
		}
		sliders.eq(pos).css({"left":"-101%"}).animate({left:"0"},speed);
		timer = setTimeout(function(){
			rs();
		},timerspeed);
	}*/



	function rs(){
		if(flag){
			flag = false;
			clearTimeout(timer);
			sliders.eq(pos++).animate({left:"-101%"},speed)
			if(pos == len){
				pos = 0;
			}
			sliders.eq(pos).css({"left":"101%"}).animate(
				{left:"0"},{
				duration:speed,
				complete:function(){
					flag = true;
					timer = setTimeout(function(){
						rs();
					},timerspeed);
				}
			});
		}
	}

	/*function rs(){
		clearTimeout(timer);
		sliders.eq(pos++).animate({left:"-101%"},speed);
		if(pos == len){
			pos = 0;
		}
		sliders.eq(pos).css({"left":"101%"}).animate({left:"0"},speed);
		timer = setTimeout(function(){
			rs();
		},timerspeed);
	}*/


	//Events Define
	arrows.on({
		click:function(){
			switch($(this).index()){
				case 0:
					ls();
					break;
				case 1:
					rs();
			}
		}
	});

	initial();
})