//work page - Photo Album  
var a;
var ab = [
	{
		image_id: 1,
		path: "img/album/1.jpg"
	},
	{
		image_id: 2,
		path: "img/album/2.jpg"
	},
	{
		image_id: 3,
		path: "img/album/3.jpg"
	},
	{
		image_id: 4,
		path: "img/album/4.jpg"
	},
	{
		image_id: 5,
		path: "img/album/5.jpg"
	},
	{
		image_id: 6,
		path: "img/album/6.jpg"
	},
	{
		image_id: 7,
		path: "img/album/7.jpg"
	},
	{
		image_id: 8,
		path: "img/album/8.jpg"
	}
];


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
var bc = [
	{
		message_id: 1,
		content: "這個課程對我們人生以後的事情會有幫助，對將來發展的事業可以有很大的幫助。",
		author: "周介石",
		job_title: "台華貿易股份有限公司 董事長" 
	},
	{
		message_id: 2,
		content: "未來學本身是可以用科學的方法，讓我預見30年後的我。這是很好的一門科學。",
		author: "高增堯",
		job_title: "新日健國際公司 總經理" 

	},
	{
		message_id: 3,
		content: "這三天的課程，讓我在反省自己過去的時候能更有系統地去整理。對於未來應變除了直覺之外，我更能有組織、有系統、有技巧、有步驟地去把策略給擬建好。我想這個對我來講不管在事業上或是個人各方面的使用上都有很大的幫助。",
		author: "董煥新",
		job_title: "亨嘉企業有限公司 董事長" 

	},
	{
		message_id: 4,
		content: "從這個訓練過程裡面，讓我們更清楚，如何經由過去、現在、未來，來掌握現在和掌握未來，這是對我最大的收穫。不管跟我們專業、邏輯的論證、還有過去所受的哲學訓練，（未來思考）都達成相輔相成的效果，也讓我認識了許多社會賢達，給我很多啟發跟影響，我非常感謝這樣的過程。",
		author: "蕭力仁",
		job_title: "蕭力仁建築師事務所 主持建築師" 

	},
	{
		message_id: 5,
		content: "（這個課程要我們）開創自己的思路…讓我知道凡事沒有絕對的錯或是絕對的對，因為一切都可能未來在應用，希望自己未來在生活中或工作當中，對CLA能夠多加揣摩、運用，我想這個未來學對我們生活幫助很大。",
		author: "吳進和",
		job_title: "富記實業有限公司總經理" 

	},
	{
		message_id: 6,
		content: "我們常常會對未來感覺茫然，不知道10年、20年後，社會、世界會變成甚麼樣子。但是經過學習、研討、分析，就知道說未來社會從這裡可能會發展的狀況是甚麼，每一個支點又可以產生未來更細緻的未來狀況。所以我們就可以從每一個議題去知道說未來的20年後、30年後，可能會產生甚麼狀況，可以針對狀況預作準備，就不會到時候感覺很茫然。",
		author: "謝麗鶯",
		job_title: "上毅國際室內設計公司 負責人" 

	},
	{
		message_id: 7,
		content: "（讓我們）在變動的過程當中，能夠找出過去整個一路走來，到目前為止整個可能的方向，我想對我們人生來講當然是一個好的體驗。",
		author: "林敏霖",
		job_title: "總統府國策顧問" 

	},
	{
		message_id: 8,
		content: "希望這個課程以後還會繼續下去，因為說真的三天實在是有點短，以後只要再有這個課程，我一定來！",
		author: "張榮欽",
		job_title: "西頓實業公司負責人" 

	}
];


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
var cd = [
	{	
		member_id: 0,  //indenty key
		ch_name: "宋玫玫",
		job_title: "EdD",
		en_name: "Mei-Mei Song, EdD",
		introduction: "名片上的職稱是淡江大學未來學研究所助理教授，學歷是哥倫比亞大學教育博士與碩士，沒有名片的職稱是人生意義的學習者，目前找到最令我折服的路徑就是未來學。 最大的樂趣在不斷穿梭於各種時間與空間—過去/現在/未來，台灣/世界。",
		head_pic_url: "img/member/宋玫玫.jpg"  //image route
	},
	{
		member_id: 1,
		ch_name: "吳裕勝",
		job_title: "PhD",
		en_name: "Yu-Sheng Wu, PhD",
		introduction: "喜歡傳播學中麥克魯漢（M. McLuhan）式的預言語法，也喜歡未來研究中強調的創意思維，兩者都進行跨界的思考，也始終對科技與人的關係進行關懷，這些喜愛融雜成為自己成長中的養分。目前在大學任教，主要以傳播相關學科為主，期望台灣傳播環境能更好，人人都能握有信心走向未來。",
		head_pic_url: "img/member/吳裕勝.jpg"
	},
	{
		member_id: 2,
		ch_name: "李長潔",
		job_title: "PhD",
		en_name: "Chang-Chieh Lee, PhD",
		introduction: "橫跨組織溝通研究、未來學、科學哲學、社會學、語藝批評、文化研究的跨領域研究者，對於社會文化的傳承流轉與創新趨勢有著熱烈的興趣，無時無刻保持冒險的好奇心。我認為，帶有美好未來想像的語言行動，將清晰地指出並誘導我們航向希望之地。我是李長潔，於大學教授社會未來、多元文化、全球社會等課程，並從事推動台灣科學與科技傳播之事務。",
		head_pic_url: "img/member/李長潔.jpg"
	},
	{
		member_id: 3,
		ch_name: "林青岳",
		job_title: " ",
		en_name: "Cing-Yue Lin",
		introduction: "是法律人、飛機修護員、補教老師、鉗工工匠、職業軍人、電腦維修員、行銷人、保險規劃師、自幼好奇頑皮，喜愛探索新奇事物當個初心者，習慣使用跨領域的思維去尋找難題的解決之道。現正於未來學領域玩耍，望能習得一招半式嬉鬧於世界的角落。",
		head_pic_url: "img/member/林青岳.jpg"
	},
	{
		member_id: 4,
		ch_name: "林青岳",
		job_title: " ",
		en_name: "Cing-Yue Lin",
		introduction: "是法律XDDD人、飛機修護員、補教老師、鉗工工匠、職業軍人、電腦維修員、行銷人、保險規劃師、自幼好奇頑皮，喜愛探索新奇事物當個初心者，習慣使用跨領域的思維去尋找難題的解決之道。現正於未來學領域玩耍，望能習得一招半式嬉鬧於世界的角落。",
		head_pic_url: "img/member/林青岳.jpg"
	}
];

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
			// console.log(this);
			changeMember(this);
		}
	)
};


function getEventTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement;
}

function changeMember(target) {
	if(typeof(target) === 'number') return;

	$('.mem.item').css('opacity', 1);

	if(target === undefined	|| target === 0) return;
	target.style.opacity = .6;

	//find the data of target id
	var a = $.grep(c, function(e){
		return e.member_id == target.getAttribute('id');
	});

	$('#member')[0].innerHTML = a[0].introduction;

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
var da = [];
var d = [
	{
		background: "img/future/f10.png",
		title: "何謂隱現議題（emerging issue）",
		author: "李長潔",
		link: "/ten"
	},

	{
		background: "img/future/f9.png",
		title: "台灣未來將邁向何處 公民願望大調查",
		author: "李長潔",
		link: "/nine"
	},

	{
		background: "img/future/f8.png",
		title: "日劇裡的科技社會變遷 黑柳徹子的《荳荳電視台》",
		author: "李長潔",
		link: "/eight"
	},

	{
		background: "img/future/f7.png",
		title: "規劃人生的十年",
		author: "邱懷瑤",
		link: "/seven"
	},

	{
		background: "img/future/f6.png",
		title: "透過情境分析開創未來",
		author: "",
		link: "/six"
	},

	{
		background: "img/future/f5.png",
		title: "何謂未來情境(scenarios)？",
		author: "李長潔",
		link: "/five"
	},

	{
		background: "img/future/f4.png",
		title: "創新X創意：跳出框架思考",
		author: "邱懷瑤",
		link: "/four"
	},

	{
		background: "img/future/f3.jpg",
		title: "香港作為一種未來城市想像",
		author: "李長潔",
		link: "/three"
	},

	{
		background: "img/future/f2.jpg",
		title: "《回到未來》中的未來就是今天時，我們實現了什麼？",
		author: "李長潔",
		link: "/two"
	},

	{
		background: "img/future/f1.jpg",
		title: "遠見預測真是無用？",
		author: "李長潔",
		link: "/one"
	}
];

function initArticle() {
	var target = $('#owl-future');
	console.log(target);
	d.forEach(function(element, index, array) {
		target.data('owlCarousel').addItem(futureFactor(element.background, element.title, element.author, element.link));
	})

}

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





function imgReload(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $(input).siblings('img').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }

    }