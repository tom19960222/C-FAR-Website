//Coding By JasonXDDD

//work page - Photo Album
var a;
function initAlbum() {
	var target = $('#owl-img');
	var changeAlbum = $('.change_album').children("img");

	console.log(a);
	a.forEach(function(element, index, array) {
		target.data('owlCarousel').addItem(photoFactor(element.path));
		changeAlbum[element.image_id-1].setAttribute("src", element.path);
	})

};

function photoFactor(src) {
	return '<div class="item" style="' + 
				'margin: 5px;' +
				'height: 300px' +
			'">' +
				'<div style="' +
					"background: url(" + src + ") center center; " +
					"background-size: cover;" +
                    "height: 100%; " +
                    "width: 100%; " +
                '"></div>' +
            '</div>';
}

//animate
$(document).ready(function() {

	$("#owl-img").owlCarousel({

		autoPlay: 3000, //Set AutoPlay to 3 seconds

		items : 5,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [700, 1]

	});

});




//work page - Student Share
var b;

function initShare() {
	var target = $('#owl-share');
	var editShare = $('#edit_share');
	var deleteShare = $('#delete_share');


	b.forEach(function(element, index, array) {
		target.data('owlCarousel').addItem(shareFactor(element.content, element.author, element.job_title));
		editShare.append(editShareFactor(element.author, element.job_title, element.message_id));
		deleteShare.append(deleteShareFactor(element.author, element.job_title, element.message_id));
	})
};

function editShareFactor(ch_name, job, index){
	return '<div class="col-sm-6">' +
				'<button class="btn btn-default btn-lg choose_edit_share" onclick="chooseEdit(this)" value="' + index + '">' +
					'<span style="font-weight: 900;">' + ch_name + '</span>' + 
					' <small>' + job + '</small>' + 
				'</button>' +
			'</div>';
}


function deleteShareFactor(ch_name, job, index){
	return '<div class="col-sm-6">' +
				'<button class="btn btn-default btn-lg" onclick="chooseDelete(this)" value="' + index + '">' +
					'<span style="font-weight: 900;">' + ch_name + '</span>' + 
					' <small>' + job + '</small>' +
				'</button>' +
			'</div>';
}

function shareFactor(content, author, job){
	return '<div class="row subtitle-row">' +
				'<div class="col-sm-1 hidden-sm">&nbsp;</div>' +
				'<div class="col-12 col-sm-10 font-semibold content-font" style="font-size: 20px; word-wrap:break-word;">' +
					'<i class="fa fa-commenting-o fa-2x"></i><br>' +
						content +  
						'<br><br>' +
					'<p class="font-light" style="font-size: 18px; text-align: right; font-style: italic;">' +
						author +
						'<span style="font-size: 15px">' +
							'（' + job + '）</span>' +
					'</p>' +
				'</div>' +
				'<div class="col-sm-1 hidden-sm">&nbsp;</div>' +
			'</div><!-- /row -->';
}

//animate
$(document).ready(function() {

	$("#owl-share").owlCarousel({
		autoPlay: 10000, //Set AutoPlay to 3 seconds

		items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3]
	});

});


//story page - member
var c;

function initMember() {
	var target = $('#member-owl');
	var editMember = $('#edit_member');
	var deleteMember = $('#delete_member');

	console.log(c);
	c.forEach(function(element, index, array) {
		target.data('owlCarousel').addItem(memberFactor(element.ch_name, element.en_name, element.job_title, element.head_pic_url, element.member_id));
		editMember.append(editMemberFactor(element.ch_name, element.head_pic_url, element.member_id));
		deleteMember.append(deleteMemberFactor(element.ch_name, element.head_pic_url, element.member_id));
	})

	showIntro();
};

function deleteMemberFactor(ch_name, img, index){
	return '<div class="col-sm-3">' +
				ch_name +
				'<button class="btn btn-default btn-lg" onclick="chooseDelete(this)" value="' + index + '">' +
					'<img src="' + img + '" height="200px" width="auto">' +
				'</button>' +
			'</div>';
}

function editMemberFactor(ch_name, img, index){
	return '<div class="col-sm-3">' +
				ch_name +
				'<button class="btn btn-default btn-lg choose_edit_member" onclick="chooseEdit(this)" value="' + index + '">' +
					'<img src="' + img + '" height="200px" width="auto">' +
				'</button>' +
			'</div>';
}

function memberFactor(ch_name, en_name, job, head, index) {
	return '<div id=' + index + ' class="mem item">' +
				'<p style="height: 250px; width: 200px; overflow: hidden; margin: 0 auto;">' +	
					'<img src="' + head + '" style="height: 250px;">' + 
				'</p>' +
				'<h2 class="font-semibold" style=" font-size: 30px; padding-bottom: 10px">' +
					ch_name + '<br>' +
					job + '<br>' +
					'<span style="font-size: 20px">' +
						en_name +
					'</span>' +
				'</h2>' +
			'</div> <!-- /col12 -->';
}


//media is mobile
var mq = window.matchMedia( "(max-width: 750px)" );

function showIntro(e) {
	$('.mem').mouseenter(
		function(){
			console.log(this);
			changeMember(this.getAttribute('id')-1, this);
		}
	)
};


function getEventTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement;
}

var lastmem;
function changeMember(num, mem){
	var a = [];
	c.forEach(function(element, index, array) {
		a.push(element);
	})

	if(lastmem === mem) return;
	
	document.getElementById('member').innerHTML = a[num].introduction;


	if(mem === null) return;
	mem.style.opacity = 0.6;
	if(lastmem != undefined) lastmem.style.opacity = 1;
	lastmem = mem;
}

//animate
$(document).ready(function(){

	$("#member-owl").owlCarousel({

		autoPlay: true,
		items : 4,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,1],

		//navigation: true,
		afterAction: XDD
	});

	function XDD(){
		changeMember(this.owl.currentItem, null);
	}
});




//future page - article
var d;

(function() {
	var target = $('#owl-future');
	d.forEach(function(element, index, array) {
		target.data('owlCarousel').addItem(futureFactor(element.background, element.title, element.author, element.link));
	})

})();

function futureFactor(bg, title, author, link) {
	return '<div class="item" style="padding-bottom: 10%">' +
				'<div class="demo-card-wide mdl-card mdl-shadow--4dp"' + 
					' style="width: 90%;position: relative; margin: 2% 5% auto">' + 
					'<div class="mdl-card__title"' +
						'style="background-image: url(' + bg + '); height: 300px; color: white; padding: 0">' +
						'<div style="background-color: rgba(0, 0, 0, 0.4); height: inherit; width: 100%; position: absolute"></div>' +
						'<h2 class="mdl-card__title-text" style=" padding: 10px; text-align: left; z-index: 1;' +
							'font-size: 35px; font-family: \'微軟正黑體 Light\';">' +
							title +
						'</h2>' +
					'</div>' +
					'<div class="mdl-card__supporting-text" style="font-size: 20px; text-align: left">' +
						'文/' + author +
					'</div>' +
					'<div class="mdl-card__actions mdl-card--border">' +
						'<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect link"' +
							'href="' + link + '">' +
							'Read More' + 
						'</a>' +
					'</div>' +
				'</div>' +
			'</div>';
}

//animate
$(document).ready(function() {

	$("#owl-future").owlCarousel({

		items : 2,
		itemsDesktop : [1199,2],
		itemsDesktopSmall : [979,2],

		navigation: true

	});

});




//view control function
function imgReload(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $(input).siblings('img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }

}

function enableADD() {
    $('#mask').css('display', 'block');
    $('.formMember').css('display', 'block');
    $('#addForm').css('display', 'block');
}
function disableADD() {
    $('#mask').css('display', 'none');
    $('.formMember').css('display', 'none');
    $('#addForm').css('display', 'none');
}
function enableDELETE() {
    $('#mask').css('display', 'block');
    $('.formMember').css('display', 'block');
    $('#deleteForm').css('display', 'block');
}
function disableDELETE() {
    $('#mask').css('display', 'none');
    $('.formMember').css('display', 'none');
    $('#deleteForm').css('display', 'none');
}
function enableEDIT() {
    $('#mask').css('display', 'block');
    $('.formMember').css('display', 'block');
    $('#editForm').css('display', 'block');
}
function disableEDIT() {
    $('#mask').css('display', 'none');
    $('.formMember').css('display', 'none');
    $('#editForm').css('display', 'none');
}

function enableCHANGE() {
    $('#mask').css('display', 'block');
    $('.formMember').css('display', 'block');
    $('#changeForm').css('display', 'block');
}

function disableCHANGE() {
    $('#mask').css('display', 'none');
    $('.formMember').css('display', 'none');
    $('#changeForm').css('display', 'none');
}