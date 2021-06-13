$(function(){
	//Objects Define
	var albumLabels = $('#albums>div>:nth-child(1)>ul>li');//Lables of albums
	var albums = $('#albums>div>:nth-child(2)>div:nth-child(1)>section');//all albums
	var albumsAarows = $('#albums>div>:nth-child(2)>div:nth-child(2)>div>div>a');
	var pos = 0;
	var albumGroup = albums.eq(0).children();//Groups in single album
	var albumA = albumGroup.find('a');
	var flagGroup = flagPic = true;
  var picDots = '';
  var lightbox = $('#lightbox');
  var lightboxPic = $('#lightboxPic');
  var lightboxClose = $('#lightbox>div:nth-child(2)>:nth-child(1)');
  var lightboxArrows = $('#lightbox>div:nth-child(2)>:nth-child(1)~div');
  var picPos = 0;

	//Events Define
	albumLabels.on({
		click:function(e){
			albumLabels.removeClass('activeAlbum');
			$(this).addClass('activeAlbum');
			albums.hide().eq($(this).index()).show();
			albumGroup = albums.eq($(this).index()).children();
			albumA = albumGroup.find('a');
			pos = 0;
			albumGroup.eq(pos).css('left','0').nextAll().css('left','102%');
			albumA_addEvent();
			if(window.matchMedia("(max-width: 800px)").matches){
				picDots.removeClass('activePic').eq(0).addClass('activePic');
			}
			console.log(albumA.length);
		}
	});

	albumsAarows.on({
		click:function(e){
			e.preventDefault();
			var u = 0;
			if (window.matchMedia("(min-width:801px)").matches) {
				u = 102;
			} else {
				u = 602;
			}
			switch($(this).parent().index()){
				case 0:
					la(u);//left Album
					break;
				case 1:
					ra(u);//right Album
			}
		}
	});

	lightboxClose.on({
		click:function(e){
			e.preventDefault();
			lightbox.hide();
		}
	});

	lightboxArrows.on({
		click:function(e){
			e.preventDefault();
			switch($(this).index()){
				case 1:
					lp();
					break;
				case 2:
					rp();
			}
		}
	});


	//Functions Define
	function lp(){
		if(flagPic){
			flagPic = false;
			if(--picPos < 0){
				picPos = albumA.length - 1;
			}
			var inx = picPos % 6;
			var gInx = Math.floor(picPos / 6);
			var href = albumGroup.eq(gInx).children().children().eq(inx).children().attr('href');
			lightBoxPicChange(href);
			//console.log("Index = "+ inx +"\nG-Index = "+gInx);
		}
	}

	function rp(){
		if(flagPic){
			flagPic = false;
			if(++picPos == albumA.length){
				picPos = 0;
			}
			var inx = picPos % 6;
			var gInx = Math.floor(picPos / 6);
			var href = albumGroup.eq(gInx).children().children().eq(inx).children().attr('href');
			lightBoxPicChange(href);
			//console.log("Index = "+ inx +"\nG-Index = "+gInx);
		}
	}

	function albumA_addEvent(){
		albumA.on({
			click:function(e){
				e.preventDefault();
				lightbox.show();
				lightBoxPicChange($(this).attr('href'));
				picPos = 6 * pos + $(this).parent().index();
				console.log($(this).parent().index());
			}
		});
	}

	function lightBoxPicChange(href){
		lightboxPic.hide().attr('src',href);
		document.getElementById('lightboxPic').onload = function(){
			lightboxPic.fadeIn();
			flagPic = true;
		}		
	}

	function la(u){
		if(flagGroup){
			flagGroup = false;
			var c = pos--;
			albumGroup.eq(c).animate({left:u+"%"});
			if(pos < 0){
				pos = albumGroup.length - 1;
			}
			albumGroup.eq(pos).css('left',-u+'%').animate({left:"0"},function(){
				if(window.matchMedia("(max-width: 800px)").matches){
					picDots.removeClass('activePic').eq(0).addClass('activePic');
				}
				flagGroup = true;
			});
		}
	}

	function ra(u){
		if(flagGroup){
			flagGroup = false;
			var c = pos++;
			albumGroup.eq(c).animate({left:-u+"%"});
			if(pos == albumGroup.length){
				pos = 0;
			}
			albumGroup.eq(pos).css('left',u+'%').animate({left:"0"},function(){
				if(window.matchMedia("(max-width: 800px)").matches){
					picDots.removeClass('activePic').eq(0).addClass('activePic');
				}
				
				flagGroup = true;
			});
		}
	}

	function setSectionH(){
		var picH = $('#albums>div>div:nth-child(2)>div:nth-child(1)>section:nth-child(1) img').eq(0).height();
		var h = 0;
		if(window.matchMedia("(max-width: 800px)").matches){
			h = picH;
		} else {
			h = 2 * picH;
		}
		$('#albums>div>div:nth-child(2)>div:nth-child(1)>section').height(h);
	}

	function createPicDot(){
		for(var i = 0; i < $("#albums>div>:nth-child(2)>:first-child>:first-child>:first-child>ul>li").length; i++){
			$('<li></li>').appendTo($('#albums .picDot'));
		}
		picDots = $('#albums .picDot>li');
		picDots.eq(0).addClass('activePic');
		picDots.on({
			click:function(){
				if(flagPic){
					flagPic = false;
					picDots.removeClass('activePic').eq($(this).index()).addClass('activePic');
					var l = $(this).index() * 100;
					albumGroup.eq(pos).animate({left:-l+"%"},function(){
						flagPic = true;
					});
				}
			}
		});
	}

	function initial(){
		albumLabels.eq(0).addClass('activeAlbum');
		setSectionH();
		if (window.matchMedia("(max-width:800px)").matches) {
			createPicDot();
		}
		albumA_addEvent();
		//console.log(albumA.length);
	}

	//Initial Function call
	initial();
});