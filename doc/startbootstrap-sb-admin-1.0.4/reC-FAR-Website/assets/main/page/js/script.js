$(document).ready(function(e) {
    $('.with-hover-text, .regular-link, .link').click(function(e) {
        e.stopPropagation();
    });

    /***************
     * = Hover text *
     * Hover text for the last slide
     ***************/
    $('.with-hover-text').hover(
        function(e) {
            var self = $(this);

            if ($(this).parent().attr('id') === 'XDD') {
                $(this).css('overflow', 'visible');
                $(this).children('a').css('color', 'black');
                $(this).children('p').children('a').css('color', 'black');
            } else if ($(this).parent().attr('class') === 'row index') {
                $(this).css('overflow', 'visible');
                $(this)
                    .children('.bg-link')
                    .children('.bg-img')
                    .stop()
                    .css('opacity', 0)
                    .delay(150)
                    .animate({
                            opacity: 1
                        },
                        'fast',
                        'linear'
                    );
            } else {
                $(this)
                    .css('overflow', 'visible')
                    .css('backgroundColor', 'rgba(98, 82, 187, 0.6)');
            }



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
                .animate({
                        //paddingTop: '25px',
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
                .animate({
                        //paddingTop: '0',
                        opacity: 0
                    },
                    'fast',
                    'linear',
                    function() {
                        $(this).stop().hide();

                        if (obj.parent().attr('id') === 'XDD') {
                            $(obj).css('overflow', 'hidden');
                            $(obj).children('a').css('color', 'white');
                            $(obj).children('p').children('a').css('color', 'white');
                        } else if (obj.parent().attr('class') === 'row index') {
                            $(obj).css('overflow', 'visible');
                            $(obj)
                                .children('.bg-link')
                                .children('.bg-img')
                                .stop()
                                .animate({
                                        //paddingTop: '0',
                                        opacity: 0
                                    },
                                    'fast',
                                    'linear'
                                );
                        } else {
                            $(obj).css('overflow', 'hidden')
                                .css('backgroundColor', 'rgba(0,0,0,0)');
                        }





                        $(obj).find('.title-float')
                            .stop()
                            .animate({
                                top: '80%',
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
        var myImg = $('<img />').attr('src', oldHref + '?' + time);

        myImg.load(function(e) {
            img_loaded += 1;
            if (img_loaded == $('#slide-3 img').length) {

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
                    tops.push($(element).offset().top - 200);
                });

                var scroll_top = $(this).scrollTop();

                var lis = $('.nav > li');

                for (var i = tops.length - 1; i >= 0; i--) {
                    if (scroll_top >= tops[i]) {
                        menu_focus(lis[i], i + 1, tops.length);
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
                if (gallery_images.length % 2 == 0) {
                    images_per_row = gallery_images.length / 2;
                } else {
                    images_per_row = gallery_images.length / 2 + 1;
                }

                var gallery_width = $('#slide-3 img').width() * $('#slide-3 img').length;
                gallery_width /= 2;
                if ($('#slide-3 img').length % 2 != 0) {
                    gallery_width += $('#slide-3 img').width();
                }

                $('#slide-3 .row').css('width', gallery_width);

                var left_pos = $('#slide-3 .row').width() - $('body').width();
                left_pos /= -2;

                $('#slide-3 .row').css('left', left_pos);

            },
            pause
        );
    });
    $(window).resize();
});

var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();



function menu_focus(element, i, length) {
    //console.log(i);
    if ($(element).hasClass('active')) {
        if (i == length) {
            if ($('.navbar').hasClass('inv') == false)
                return;
        } else {
            return;
        }
    }

    enable_arrows(i, length);

    if (i == 1 || i == length)
        $('.navbar').removeClass('inv');
    else
        $('.navbar').addClass('inv');

    $('.nav > li').removeClass('active');
    $(element).addClass('active');

    var icon = $(element).find('.icon');
    var left_pos = icon.offset().left - $('.nav').offset().left;
    var el_width = icon.width() + $(element).find('.text').width() + 10;

    $('.active-menu').stop(false, false).animate({
            left: left_pos,
            width: el_width
        },
        1500,
        'easeInOutQuart'
    );
}

function enable_arrows(dataslide, length) {
    $('#arrows div').addClass('disabled');
    if (dataslide != 1) {
        $('#arrow-up').removeClass('disabled');
    }
    if (dataslide != length) {
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
jQuery(document).ready(function($) {
    //Cache some variables
    var links = $('.nav').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');

    //Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
    //easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
    function goToByScroll(dataslide) {
        var offset_top = (dataslide == 1) ? '0px' : $('.slide[data-slide="' + dataslide + '"]').offset().top;

        htmlbody.stop(false, false).animate({
            scrollTop: offset_top
        }, 1500, 'easeInOutQuart');
    }

    //When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
    links.click(function(e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
        $(".nav-collapse").collapse('hide');
    });

    //When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
    $('.navigation-slide').click(function(e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
        $(".nav-collapse").collapse('hide');
    });
});

/***************
 * = Menu hover *
 ***************/
jQuery(document).ready(function($) {
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
                .attr('id', 'special-active-menu-' + $(this).data('slide'));

            $('.active-menu').after(hover_bar);
        },
        function(e) {
            $('.special-active-menu').remove();
        }
    );
});

/******************
 * = Gallery hover *
 ******************/
jQuery(document).ready(function($) {
    //Cache some variables
    var images = $('#slide-3 a');

    images.hover(
        function(e) {
            var asta = $(this).find('img');
            $('#slide-3 img').not(asta).stop(false, false).animate({
                    opacity: .5
                },
                'fast',
                'linear'
            );
            var zoom = $('<div class="zoom"></div>');
            if ($(this).hasClass('video')) {
                zoom.addClass('video');
            }
            $(this).prepend(zoom);
        },
        function(e) {
            $('#slide-3 img').stop(false, false).animate({
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
jQuery(document).ready(function($) {
    //Cache some variables
    var arrows = $('#arrows div');

    arrows.click(function(e) {
        e.preventDefault();

        if ($(this).hasClass('disabled'))
            return;

        var slide = null;
        var datasheet = $('.nav > li.active').data('slide');
        var offset_top = false;
        var offset_left = false;


        switch ($(this).attr('id')) {
            case 'arrow-up':
                offset_top = (datasheet - 1 == 1) ? '0px' : $('.slide[data-slide="' + (datasheet - 1) + '"]').offset().top;
                break;
            case 'arrow-down':
                offset_top = $('.slide[data-slide="' + (datasheet + 1) + '"]').offset().top;
                break;
            case 'arrow-left':
                offset_left = $('#slide-3 .row').offset().left + 452;
                if (offset_left > 0) {
                    offset_left = '0px';
                }
                break;
            case 'arrow-right':
                offset_left = $('#slide-3 .row').offset().left - 452;
                if (offset_left < $('body').width() - $('#slide-3 .row').width()) {
                    offset_left = $('body').width() - $('#slide-3 .row').width();
                }
                break;
        }

        if (offset_top != false) {
            htmlbody.stop(false, false).animate({
                scrollTop: offset_top
            }, 1500, 'easeInOutQuart');
        }

        if (offset_left != false) {
            if ($('#slide-3 .row').width() != $('body').width()) {
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






//owl-slide page
$(document).ready(function() {

    $("#owl-img").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds

        items: 5,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [700, 1]

    });

});


$(document).ready(function() {

    $("#owl-share").owlCarousel({
        autoPlay: 10000, //Set AutoPlay to 3 seconds

        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]

    });

});

$(document).ready(function() {

    $("#owl-future").owlCarousel({

        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [979, 2],

        navigation: true

    });

});





$(document).ready(function() {
    var time = 7; // time in seconds

    var $progressBar,
        $bar,
        $elem,
        isPause,
        tick,
        percentTime;

    $("#owl-newthing").owlCarousel({
        slideSpeed: 500,
        paginationSpeed: 500,
        singleItem: true,
        afterInit: progressBar,
        afterMove: moved,
        startDragging: pauseOnDragging,
    });

    //Init progressBar where elem is $("#owl-demo")
    function progressBar(elem) {
        $elem = elem;
        //build progress bar elements
        buildProgressBar();
        //start counting
        start();
    }

    //create div#progressBar and div#bar then prepend to $("#owl-demo")
    function buildProgressBar() {
        $progressBar = $("<div>", {
            id: "progressBar",
            style: `
            	background-color: rgba(255,178,127,0.611764705882353);
            	height: "auto";
            	margin: 0 auto;
            `
        });
        $bar = $("<div>", {
            id: "bar"
        });
        $progressBar.append($bar).prependTo($elem);
        console.log($elem);
    }

    function start() {
        //reset timer
        percentTime = 0;
        isPause = false;
        //run interval every 0.01 second
        tick = setInterval(interval, 10);
    };

    function interval() {
        if (isPause === false) {
            percentTime += 1 / time;
            $bar.css({
                width: percentTime + "%",
                height: "8px",
                backgroundColor: "rgba(255,127,127,1.0)"
            });
            //if percentTime is equal or greater than 100
            if (percentTime >= 100) {
                //slide to next item 
                $elem.trigger('owl.next')
            }
        }
    }

    //pause while dragging 
    function pauseOnDragging() {
        isPause = true;
    }

    //moved callback
    function moved() {
        //clear interval
        clearTimeout(tick);
        //start again
        start();
    }

    //uncomment this to make pause on mouseover 
    // $elem.on('mouseover',function(){
    //   isPause = true;
    // })
    // $elem.on('mouseout',function(){
    //   isPause = false;
    // })

});






$(document).ready(function() {

    $("#member-owl").owlCarousel({

        autoPlay: true,
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 1],

        //navigation: true,
        afterAction: XDD
    });

    function XDD() {
        changeMember(this.owl.currentItem, null);
    }
});

function showYoutube() {

    $("#owl-youtube").owlCarousel({

        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [979, 2],

        afterInit: function(elem) {
            var that = this;
            that.owlControls.prependTo(elem)
        }
    });

}


console.log(mq.matches);
if (mq.matches) {
    $('#com-youtube').css({ display: 'none' });
    $('#owl-youtube').css({ display: 'block' });
    showYoutube();
} else {
    $('#com-youtube').css({ display: 'block' });
    $('#owl-youtube').css({ display: 'none' });
}
