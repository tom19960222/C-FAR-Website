
$(document).ready(function(e) {
	$('.with-hover-text, .regular-link').click(function(e){
		e.stopPropagation();
	});
	
	/***************
	* = Hover text *
	* Hover text for the last slide
	***************/
	$('.with-hover-text').hover(
		function(e) {
			var self = $(this);
			$(this)
				.css('overflow', 'visible')
				.css('backgroundColor', 'rgba(98, 82, 187, 0.6)');

			$(this).find('.title-float')
				.stop()
				.animate({
					top: '75%',
					opacity: 0.25
				});

			$(this).find('.hover-text')
				.stop()
				.show()
				.css('opacity', 0)
				.delay(150)
				.animate(
					{
						paddingTop: '25px',
						opacity: 1
					},
					'fast',
					'linear'
				);
		},
		function(e) {
			var obj = $(this);
			$(this).find('.hover-text')
				.stop()
				.animate(
					{
						paddingTop: '0',
						opacity: 0
					},
					'fast',
					'linear',
					function() {
						$(this).stop().hide();
						$( obj ).css('overflow', 'hidden')
								.css('backgroundColor', 'rgba(0,0,0,0)');
						$(obj).find('.title-float')
							.stop()
							.animate({
								top: '83%',
								opacity: 1
							});
					}
				);
		}
	);

	
	var img_loaded = 0;
	var j_images = [];
	
	/*************************
	* = Controls active menu *
	* Hover text for the last slide
	*************************/
	$('#slide-3 img').each(function(index, element) {

		var time = new Date().getTime();
		var oldHref = $(this).attr('src');
		var myImg = $('<img />').attr('src', oldHref + '?' + time );
		
		myImg.load(function(e) {
			img_loaded += 1;
			if ( img_loaded == $('#slide-3 img').length ) {

			}
		});
	});
	
});


//scrolling for the nav bar scaling
//from myImg.load(function)
$(function() {
	var pause = 10;
	$(document).scroll(function(e) {
		delay(function() {

				var tops = [];

				$('.story').each(function(index, element) {
					tops.push( $(element).offset().top - 200 );
				});

				var scroll_top = $(this).scrollTop();

				var lis = $('.nav > li');

				for ( var i=tops.length-1; i>=0; i-- ) {
					if ( scroll_top >= tops[i] ) {
						menu_focus( lis[i], i+1, tops.length );
						break;
					}
				}
			},
			pause);
	});
	$(document).scroll();
});

/******************
* = Gallery width *
******************/
$(function() {
	var pause = 50; // will only process code within delay(function() { ... }) every 100ms.
	$(window).resize(function() {
		delay(function() {
				var gallery_images = $('#slide-3 img');
				
				var images_per_row = 0;
				if ( gallery_images.length % 2 == 0 ) {
					images_per_row = gallery_images.length / 2;
				} else {
					images_per_row = gallery_images.length / 2 + 1;
				}
				
				var gallery_width = $('#slide-3 img').width() * $('#slide-3 img').length;
				gallery_width /= 2;
				if ( $('#slide-3 img').length % 2 != 0 ) {
					gallery_width += $('#slide-3 img').width();
				}
				
				$('#slide-3 .row').css('width', gallery_width );
				
				var left_pos = $('#slide-3 .row').width() - $('body').width();
				left_pos /= -2;
				
				$('#slide-3 .row').css('left', left_pos);
			
			},
			pause
		);
	});
	$(window).resize();
});

var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();



function menu_focus( element, i, length ) {
	//console.log(i);
	if ( $(element).hasClass('active') ) {
		if ( i == length ) {
			if ( $('.navbar').hasClass('inv') == false )
				return;
		} else {
			return;
		}
	}
	
	enable_arrows( i, length );
		
	if ( i == 1 || i == length )
		$('.navbar').removeClass('inv');
	else
		$('.navbar').addClass('inv');
	
	$('.nav > li').removeClass('active');
	$(element).addClass('active');
	
	var icon = $(element).find('.icon');
	
	var left_pos = icon.offset().left - $('.nav').offset().left;
	var el_width = icon.width() + $(element).find('.text').width() + 10;
	
	$('.active-menu').stop(false, false).animate(
		{
			left: left_pos,
			width: el_width
		},
		1500,
		'easeInOutQuart'
	);
}

function enable_arrows( dataslide, length ) {
	$('#arrows div').addClass('disabled');
	if ( dataslide != 1 ) {
		$('#arrow-up').removeClass('disabled');
	}
	if ( dataslide != length ) {
		$('#arrow-down').removeClass('disabled');
	}
	//if ( dataslide == 3 ) {
	//	$('#arrow-left').removeClass('disabled');
	//	$('#arrow-right').removeClass('disabled');
	//}
}

/*************
* = Parallax *
*************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var links = $('.nav').find('li');
	slide = $('.slide');
	button = $('.button');
	mywindow = $(window);
	htmlbody = $('html,body');
	
	//Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
	//easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
	function goToByScroll(dataslide) {
		var offset_top = ( dataslide == 1 ) ? '0px' : $('.slide[data-slide="' + dataslide + '"]').offset().top;
		
		htmlbody.stop(false, false).animate({
			scrollTop: offset_top
		}, 1500, 'easeInOutQuart');
	}
	
	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	links.click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
		$(".nav-collapse").collapse('hide');
	});
	
	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	$('.navigation-slide').click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
		$(".nav-collapse").collapse('hide');
	});
});

/***************
* = Menu hover *
***************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var menu_item = $('.nav').find('li');
	
	menu_item.hover(
		function(e) {
			var icon = $(this).find('.icon');
			
			var left_pos = icon.offset().left - $('.nav').offset().left;
			var el_width = icon.width() + $(this).find('.text').width() + 10;
			
			var hover_bar = $('<div class="active-menu special-active-menu"></div>')
				.css('left', left_pos)
				.css('width', el_width)
				.attr('id', 'special-active-menu-' + $(this).data('slide') );
			
			$('.active-menu').after( hover_bar );
		},
		function(e) {
			$('.special-active-menu').remove();
		}
	);
});

/******************
* = Gallery hover *
******************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var images = $('#slide-3 a');
	
	images.hover(
		function(e) {
			var asta = $(this).find('img');
			$('#slide-3 img').not( asta ).stop(false, false).animate(
				{
					opacity: .5
				},
				'fast',
				'linear'
			);
			var zoom = $('<div class="zoom"></div>');
			if ( $(this).hasClass('video') ) {
				zoom.addClass('video');
			}
			$(this).prepend(zoom);
		},
		function(e) {
			$('#slide-3 img').stop(false, false).animate(
				{
					opacity: 1
				},
				'fast',
				'linear'
			);
			$('.zoom').remove();
		}
	);
});

/******************
* = Arrows click  *
******************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var arrows = $('#arrows div');
	
	arrows.click(function(e) {
		e.preventDefault();
		
		if ( $(this).hasClass('disabled') )
			return;
		
		var slide = null;
		var datasheet = $('.nav > li.active').data('slide');
		var offset_top = false;
		var offset_left = false;
		
		
		switch( $(this).attr('id') ) {
			case 'arrow-up':
				offset_top = ( datasheet - 1 == 1 ) ? '0px' : $('.slide[data-slide="' + (datasheet-1) + '"]').offset().top;
				break;
			case 'arrow-down':
				offset_top = $('.slide[data-slide="' + (datasheet+1) + '"]').offset().top;
				break;
			case 'arrow-left':
				offset_left = $('#slide-3 .row').offset().left + 452;
				if ( offset_left > 0 ) {
					offset_left = '0px';
				}
				break;
			case 'arrow-right':
				offset_left = $('#slide-3 .row').offset().left - 452;
				if ( offset_left < $('body').width() - $('#slide-3 .row').width() ) {
					offset_left = $('body').width() - $('#slide-3 .row').width();
				}
				break;
		}
		
		if ( offset_top != false ) {
			htmlbody.stop(false, false).animate({
				scrollTop: offset_top
			}, 1500, 'easeInOutQuart');
		}
		
		if ( offset_left != false ) {
			if ( $('#slide-3 .row').width() != $('body').width() ) {
				$('#slide-3 .row').stop(false, false).animate({
					left: offset_left
				}, 1500, 'easeInOutQuart');
			}
		}
	});
});






//jQuery(document).ready(function ($) {
//	$('member').parent().hover(
//		function (e) {
//			console.log(getEventTarget(e));
//		},
//		function (e) {
//
//		}
//	);
//});





function getEventTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement;
}

var lastmem;
function changeMember(num){
	var mem = getEventTarget(event);
	var a = [
		'淡江大學未來學研究所助理教授，學歷是哥倫比亞大學教育博士與碩士，沒有名片的職稱是人生意義的學習者，目前找到最令我折服的路徑就是未來學。 最大的樂趣在不斷穿梭於各種時間與空間—過去/現在/未來，台灣/世界。',
		'喜歡傳播學中麥克魯漢（M. McLuhan）式的預言語法，也喜歡未來研究中強調的創意思維，兩者都進行跨界的思考，也始終對科技與人的關係進行關懷，這些喜愛融雜成為自己成長中的養分。目前在大學任教，主要以傳播相關學科為主，期望台灣傳播環境能更好，人人都能握有信心走向未來。',
		'橫跨組織溝通研究、未來學、科學哲學、社會學、語藝批評、文化研究的跨領域研究者，對於社會文化的傳承流轉與創新趨勢有著熱烈的興趣，無時無刻保持冒險的好奇心。我認為，帶有美好未來想像的語言行動，將清晰地指出並誘導我們航向希望之地。我是李長潔，於大學教授社會未來、多元文化、全球社會等課程，並從事推動台灣科學與科技傳播之事務。',
		'是法律人、飛機修護員、補教老師、鉗工工匠、職業軍人、電腦維修員、行銷人、保險規劃師、自幼好奇頑皮，喜愛探索新奇事物當個初心者，習慣使用跨領域的思維去尋找難題的解決之道。現正於未來學領域玩耍，望能習得一招半式嬉鬧於世界的角落。'
	];

	mem.parentNode.parentNode.className = "col-12 col-lg-3 col-sm-6";
	if(lastmem != undefined) lastmem.className = "col-12 col-lg-3 col-sm-6 mem";
	lastmem = mem.parentNode.parentNode;

	document.getElementById('member').innerHTML = a[num];
}




//owl-slide page
$(document).ready(function() {

	$("#owl-img").owlCarousel({

		autoPlay: 3000, //Set AutoPlay to 3 seconds

		items : 4,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3]

	});

});


$(document).ready(function() {

	$("#owl-share").owlCarousel({
		navigation : true, // Show next and prev buttons
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true
	});

});