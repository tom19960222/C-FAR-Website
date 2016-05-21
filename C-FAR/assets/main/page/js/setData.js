

//work page - Photo Album
var a = [
	{
		index: 1,
		content: "assets/main/page/images/album/1.jpg"
	},
	{
		index: 2,
		content: "assets/main/page/images/album/2.jpg"
	},
	{
		index: 3,
		content: "assets/main/page/images/album/3.jpg"
	},
	{
		index: 4,
		content: "assets/main/page/images/album/4.jpg"
	},
	{
		index: 5,
		content: "assets/main/page/images/album/5.jpg"
	},
	{
		index: 6,
		content: "assets/main/page/images/album/6.jpg"
	},
	{
		index: 7,
		content: "assets/main/page/images/album/7.jpg"
	},
	{
		index: 8,
		content: "assets/main/page/images/album/8.jpg"
	}
];


(function() {
	var target = $('#owl-img');
	a.forEach(function(element, index, array) {
		target.append(photoFactor(element.content));
	})

})();

function photoFactor(src) {
	return '<div class="item">' +
				'<div style="' +
					"background: url(" + src + ") center center; " +
					"background-size: cover;" +
                    "height: 100%; " +
                    "width: 100%; " +
                '"></div>' +
            '</div>';
}





//work page - Student Share
var b = [
	{
		index: 1,
		content: "這個課程對我們人生以後的事情會有幫助，對將來發展的事業可以有很大的幫助。",
		author: "周介石XD",
		job_title: "台華貿易股份有限公司 董事長" 
	},
	{
		index: 2,
		content: "未來學本身是可以用科學的方法，讓我預見30年後的我。這是很好的一門科學。",
		author: "高增堯",
		job_title: "新日健國際公司 總經理" 

	},
	{
		index: 3,
		content: "這三天的課程，讓我在反省自己過去的時候能更有系統地去整理。對於未來應變除了直覺之外，我更能有組織、有系統、有技巧、有步驟地去把策略給擬建好。我想這個對我來講不管在事業上或是個人各方面的使用上都有很大的幫助。",
		author: "董煥新",
		job_title: "亨嘉企業有限公司 董事長" 

	},
	{
		index: 4,
		content: "從這個訓練過程裡面，讓我們更清楚，如何經由過去、現在、未來，來掌握現在和掌握未來，這是對我最大的收穫。不管跟我們專業、邏輯的論證、還有過去所受的哲學訓練，（未來思考）都達成相輔相成的效果，也讓我認識了許多社會賢達，給我很多啟發跟影響，我非常感謝這樣的過程。",
		author: "蕭力仁",
		job_title: "蕭力仁建築師事務所 主持建築師" 

	},
	{
		index: 5,
		content: "（這個課程要我們）開創自己的思路…讓我知道凡事沒有絕對的錯或是絕對的對，因為一切都可能未來在應用，希望自己未來在生活中或工作當中，對CLA能夠多加揣摩、運用，我想這個未來學對我們生活幫助很大。",
		author: "吳進和",
		job_title: "富記實業有限公司總經理" 

	},
	{
		index: 6,
		content: "我們常常會對未來感覺茫然，不知道10年、20年後，社會、世界會變成甚麼樣子。但是經過學習、研討、分析，就知道說未來社會從這裡可能會發展的狀況是甚麼，每一個支點又可以產生未來更細緻的未來狀況。所以我們就可以從每一個議題去知道說未來的20年後、30年後，可能會產生甚麼狀況，可以針對狀況預作準備，就不會到時候感覺很茫然。",
		author: "謝麗鶯",
		job_title: "上毅國際室內設計公司 負責人" 

	},
	{
		index: 7,
		content: "（讓我們）在變動的過程當中，能夠找出過去整個一路走來，到目前為止整個可能的方向，我想對我們人生來講當然是一個好的體驗。",
		author: "林敏霖",
		job_title: "總統府國策顧問" 

	},
	{
		index: 8,
		content: "希望這個課程以後還會繼續下去，因為說真的三天實在是有點短，以後只要再有這個課程，我一定來！",
		author: "張榮欽",
		job_title: "西頓實業公司負責人" 

	}
];


(function() {
	var target = $('#owl-share');
	b.forEach(function(element, index, array) {
		target.append(shareFactor(element.content, element.author, element.job_title));
	})

})();

function shareFactor(content, author, job){
	return '<div class="row subtitle-row">' +
				'<div class="col-sm-1 hidden-sm">&nbsp;</div>' +
				'<div class="col-12 col-sm-10 font-semibold content-font" style="font-size: 20px;">' +
					'<i class="fa fa-commenting-o fa-2x"></i><br>' +
						content + '<br><br>' +
					'<p class="font-light" style="font-size: 18px; text-align: right; font-style: italic;">' +
						author +
						'<span style="font-size: 15px">' +
							'（' + job + '）</span>' +
					'</p>' +
				'</div>' +
				'<div class="col-sm-1 hidden-sm">&nbsp;</div>' +
			'</div><!-- /row -->';
}



//story page - member