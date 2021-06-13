$(function(){
	//Objects Variable
	//Global Variable
	var ball = $("#ball");
	var btns = $("#btns>input[type=button]");
	var t = 0 , l = 0;
	var v = 2;
	var timer = 0;

	//Event Define
	btns.on({
		click:function(){
			switch($(this).index()){
				case 0:
					moveAction('t',-v);break;
				case 1:
					moveAction('l',v);break;
				case 2:
					moveAction('t',v);break;
				case 3:
					moveAction('l',-v);break;
				case 4:
					stopAction();
			}
		}
	});

	//Function Define
	function moveAction(side,val){
		clearInterval(timer);

		if(side == 't'){
			t+=val;
			ball.css({'top':t+'px'});
		} else {
			l+=val;
			ball.css({'left':l+'px'});
		}

		timer = setInterval(function(){
			moveAction(side,val)},10);
		/*timer = setInterval(function(){

		},100);*/
	}

	function stopAction(){
		clearInterval(timer);
	}


	function initial(){
		//Local Variable
		t = (window.innerHeight - parseInt(ball.css('height'))) / 2;
		l = (window.innerWidth - parseInt(ball.css('width'))) / 2;
		ball.css({'top':t+'px','left':l+'px'});

		//alert('Window.Top = '+t+'\nWindow.Left = '+l);
	}

	initial();
});