$(function(){
	//Object Variables
	var sliders = $("#footer>div>div:nth-child(1)>section:nth-child(1)>div");
	var arrows = $("#footer>div>div:nth-child(1)>section:nth-child(2)>div");
	var pos = 0;
	var len = sliders.length;
	var speed = 500;

	//Functions Define
	function initial(){
		sliders.eq(pos).animate({left:"0"},speed);
		//console.log(sliders.length+"  "+arrows.length);
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


	//Events Define
	arrows.on({
		click:function(e){
			e.preventDefault();
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