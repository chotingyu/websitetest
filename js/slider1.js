$(function(){
	//Object Variables
	var sliders = $("#slider>div>:nth-child(1)>section");
	var len = sliders.length; //value = 4
	var arrows = $('#slider>div>:nth-child(2)>div');
	var pos = 0;
	var timer = 0;
	var c = 0;

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


	//Function Define
	function rs(){
		clearTimeout(timer);
		
		c = pos++;
		sliders.eq(c).removeClass('ro2c c2lo lo2c c2ro').addClass('c2lo');
		if(pos == len){
			pos = 0;
		}
		sliders.eq(pos).addClass('ro2c');

		setTimer();
	}

	function ls(){
		clearTimeout(timer);

		c = pos--;
		sliders.eq(c).removeClass('ro2c c2lo lo2c c2ro').addClass('c2ro');
		if(pos < 0){
			pos = len-1;
		}
		sliders.eq(pos).addClass('lo2c');

		setTimer();
	}

	function setTimer(){
		timer = setTimeout(function(){
			sliders.eq(c).removeClass('ro2c c2lo lo2c c2ro')
		},1000);
	}

	function initial(){
		sliders.eq(pos).addClass('ro2c');
	}

	initial();
})