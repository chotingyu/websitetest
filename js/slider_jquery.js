$(function(){
	//Object Variables
	var sliders = $("#slider>div>:nth-child(1)>section");
	var arrows = $("#slider>div>:nth-child(2)>div");
	var pos = 0;
	var len = sliders.length;
	var speed = 2000;
	var timer = 0;
	var timerspeed = 3000;

	//Functions Define
	function initial(){
		sliders.eq(pos).animate({left:"0"},speed);
		sliderTimer(1);
	}

	function ls(){
		sliders.eq(pos--).animate({left:"101%"},speed);
		if(pos < 0){
			pos = len - 1;
		}
		sliders.eq(pos).css({"left":"-101%"}).animate({left:"0"},speed);
	}

	function rs(){
		sliders.eq(pos++).animate({left:"-101%"},speed)
		if(pos == len){
			pos = 0;
		}
		sliders.eq(pos).css({"left":"101%"}).animate({left:"0"},speed);
	}

	function sliderTimer (idx){
		clearTimeout(timer);
		switch(idx){
			case 0:
					ls();
					break;
			case 1:
					rs();
		}
		timer = setTimeout(function(){
			sliderTimer(idx);
		},timerspeed);
	};


	//Events Define
	arrows.on({
		click:function(){
			sliderTimer($(this).index());
			/*switch($(this).index()){
				case 0:
					ls();
					break;
				case 1:
					rs();
			}*/
		}
	});

	initial();
})