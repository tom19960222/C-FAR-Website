


var fn_list = {

	user_login: 	{fn_name: "user_login", url: "http://cfar.hsexpert.net/user/login", method: "POST"},
	user_add: 		{fn_name: "user_add", url: "http://cfar.hsexpert.net/user/add", method: "POST"},

	image_get: 		{fn_name: "image_get", url: "http://cfar.hsexpert.net/image", method: "GET"},
	image_add: 		{fn_name: "image_add", url: "http://cfar.hsexpert.net/image", method: "POST"},
	image_edit: function(image_id) {
		return	{fn_name: "image_edit", url: "http://cfar.hsexpert.net/image/" + image_id, method: "PUT"}		
	},

	member_get: 	{fn_name: "member_get", url: "http://cfar.hsexpert.net/member", method: "GET"},
	member_add: 	{fn_name: "member_add", url: "http://cfar.hsexpert.net/member", method: "POST"},
	member_edit: 	{fn_name: "member_edit", url: "http://cfar.hsexpert.net/member", method: "PUT"},
	member_delete: 	{fn_name: "member_delete", url: "http://cfar.hsexpert.net/member", method: "DELETE"},

	message_get: 	{fn_name: "message_get", url: "http://cfar.hsexpert.net/message", method: "GET"},
	message_add: 	{fn_name: "message_add", url: "http://cfar.hsexpert.net/message", method: "POST"},
	message_edit: 	{fn_name: "message_edit", url: "http://cfar.hsexpert.net/message", method: "PUT"},

	article_get: 	{fn_name: "article_get", url: "http://cfar.hsexpert.net/article", method: "GET"},
	article_get_one: function (article_id) {
		return	{fn_name: "article_get_one", url: "http://cfar.hsexpert.net/article/" + article_id, method: "GET"}
	},
	article_add: 	{fn_name: "article_add", url: "http://cfar.hsexpert.net/article", method: "POST"},
	article_edit: 	{fn_name: "article_edit", url: "http://cfar.hsexpert.net/article", method: "PUT"},
	article_delete: {fn_name: "article_delete", url: "http://cfar.hsexpert.net/article", method: "DELETE"},

	news_get: 		{fn_name: "news_get", url: "http://cfar.hsexpert.net/news", method: "GET"},
	news_add:  		{fn_name: "news_add", url: "http://cfar.hsexpert.net/news", method: "POST"},
	news_edit: 		{fn_name: "news_edit", url: "http://cfar.hsexpert.net/news", method: "PUT"},
	news_delete: 	{fn_name: "news_delete", url: "http://cfar.hsexpert.net/news", method: "DELETE"},

	ajaxReq: function (doFn, data) {
		var dfrd = $.Deferred();

		$.ajax({
			method: doFn.method,
			url: doFn.url,
			data: JSON.stringify(data),
			headers: {
	            "Content-Type": 'application/json'
	        },
			success: function (data, status) {
				console.log(status);


				switch(doFn.fn_name){
					case "image_get":
						data.forEach(function(element, index, array) {
							element.path = "http://cfar.hsexpert.net" + element.path;
						})
						a = data;
	    			break;

	    			case "member_get":
	    				data.forEach(function(element, index, array) {
	    					element.head_pic_url = "http://cfar.hsexpert.net" + element.head_pic_url;
	    				})
	    				c = data;
	    			break;

	    			case "message_get":
	    				b = data;
	    			break;

	    			case "article_get":
	    				d = data;
	    			break;
    				
    				case "article_get_one":
    					chooseArticle = data;
    				break;

    				case "news_get":
    					e = data;
    				break;

	    			default:
	    				alert(status);
	    				window.location.reload();
	    			break;
				}
				
				dfrd.resolve();
			},
			error: function (jqXHR, textStatus, errorMessage) {
				console.log(errorMessage);
			}
		})

		return dfrd.promise();
	}
};


var formSubmit = {
	member_add: function() {
		var data = {
			ch_name: $('#add_chname')[0].value,
			job_title: $('#add_job')[0].value,
			en_name: $('#add_enname')[0].value,
			introduction: $('#add_intro')[0].value,
			head_pic_data: $('#add_img_data')[0].src.split(',')[1],
			head_pic_filename: $('#add_img_file')[0].value.replace(/.*[\/\\]/, '')
		};

		var isFillBlank = false;
		for(element in data) {
			if(data[element] === "" || data[element] === window.location.href)
				isFillBlank = true;
		}
		if(isFillBlank === true){
			alert("請輸入完整資料!!");
			return;
		}
		else{
			console.log(data);
			fn_list.ajaxReq(fn_list.member_add, data);
		}
	},

	member_edit: function() {

		var data = [{
			member_id: member_id,
			ch_name: $('#edit_chname')[0].value,
			job_title: $('#edit_job')[0].value,
			en_name: $('#edit_enname')[0].value,
			introduction: $('#edit_intro')[0].value
		}];

			
		if($('#edit_img_file')[0].value !== ""){
			data[0].head_pic_data = $('#edit_img_data')[0].src.split(',')[1];
			data[0].head_pic_filename = $('#edit_img_file')[0].value.replace(/.*[\/\\]/, '');
		}

		var isFillBlank = false;
		for(element in data) {
			if(data[element] === "" || data[element] === window.location.href)
				isFillBlank = true;
		}
		if(isFillBlank === true){
			alert("請輸入完整資料!!");
			return;
		}
		else{
			console.log(data);
			fn_list.ajaxReq(fn_list.member_edit, data);
		}
	},

	member_delete: function () {
		var data = {
			member_id: deleteItem
		};

		if(data.member_id.length === 0)
			alert("請選擇刪除的成員");
		else
			fn_list.ajaxReq(fn_list.member_delete, data);
	},

	image_change: function() {
		var target = $('#imgShow')[0];
		var img_data = target.src.split(',')[1];
		var img_file = $('#imgFile')[0].value.replace(/.*[\/\\]/, '');

		if(target.src === window.location.href 
			|| target.src + "#" === window.location.href
			|| target.src === img.choose_img.img_src){

			alert("請上傳一張照片");
			return;
		}
		else{
			img.update_img.filename = img_file;
			img.update_img.content = img_data;

		}
		
		if(img.choose_img.img_src === "")
			formSubmit.image_add();
		else 
			formSubmit.image_edit();
		

	},

	image_add: function () {
		var data = {
			filename: img.update_img.filename,
			content: img.update_img.content
		};

		fn_list.ajaxReq(fn_list.image_add, data);	
	},

	image_edit: function () {
		var data = {
			filename: img.update_img.filename,
			content: img.update_img.content
		}

		fn_list.ajaxReq(fn_list.image_edit(img.choose_img.img_id), data);
	},


	message_add: function() {
		var data = {
			author: $('#add_author')[0].value,
			job_title: $('#add_job')[0].value,
			content: $('#add_content')[0].value
		};

		var isFillBlank = false;
		for(element in data) {
			if(data[element] === "" || data[element] === window.location.href)
				isFillBlank = true;
		}
		if(isFillBlank === true){
			alert("請輸入完整資料!!");
			return;
		}
		else{
			console.log(data);
			fn_list.ajaxReq(fn_list.message_add, data);
		}
	},

	message_edit: function () {
		var data = [
			{
				message_id: message_id,
				author: $('#edit_author')[0].value,
				job_title: $('#edit_job')[0].value,
				content: $('#edit_content')[0].value
			}
		];

		var isFillBlank = false;
		for(element in data) {
			if(data[element] === "" || data[element] === window.location.href)
				isFillBlank = true;
		}
		if(isFillBlank === true){
			alert("請輸入完整資料!!");
			return;
		}
		else{
			console.log(data);
			fn_list.ajaxReq(fn_list.message_edit, data);
		}
	},

	article_add: function () {
		var data = {
			author: $('#add_author')[0].value,
			title: $('#add_title')[0].value,
			background_data: $('#add_background_data')[0].src.split(',')[1],
			background_filename: $('#add_background_file')[0].value.replace(/.*[\/\\]/, ''),
			content:[]
		};

		var isFillBlank = false;
		for(element in data) {
			if(data[element] === "" || data[element] === window.location.href)
				isFillBlank = true;
		}
		if(isFillBlank === true){
			alert("請輸入完整資料!!");
			return;
		}


		$('#add-content > div').each(function() {
			if($(this).attr('class') === "text"){
				data.content.push({
					type: "content",
					content: $(this).find('textarea')[0].value
				});
			}
			else if($(this).attr('class') === "img"){
				data.content.push({
					type: "image",
					image_data: $(this).find('img')[0].src.split(',')[1],
					image_filename: $(this).find('input')[0].value.replace(/.*[\/\\]/, '')
				});
			}
			else
				alert("解析錯誤");
		});

		
		fn_list.ajaxReq(fn_list.article_add, data);
	},

	article_edit: function () {
		var data = [
			{
				article_id: chooseArticle.article_id,
				author: $('#edit_author')[0].value,
				title: $('#edit_title')[0].value,
				content:[]
			}
		];

		if($('#edit_background_file')[0].value !== ""){
			data[0].head_pic_data = $('#edit_background_data')[0].src.split(',')[1];
			data[0].head_pic_filename = $('#edit_background_file')[0].value.replace(/.*[\/\\]/, '');
		}

		var isFillBlank = false;
		for(element in data[0]) {
			if(data[0][element] === "" || data[0][element] === window.location.href)
				isFillBlank = true;
		}
		if(isFillBlank === true){
			alert("請輸入完整資料!!");
			return;
		}


		$('#edit-content > div').each(function() {
			if($(this).attr('class') === "text"){
				data[0].content.push({
					type: "content",
					content: $(this).find('textarea')[0].value
				});
			}
			else if($(this).attr('class') === "img"){

				if($(this).find('input')[0].value === ""){
					data[0].content.push({
						type: "image",
						image_url: $(this).find('img')[0].src
					});
				}

				else{
					data[0].content.push({
						type: "image",
						image_data: $(this).find('img')[0].src.split(',')[1],
						image_filename: $(this).find('input')[0].value.replace(/.*[\/\\]/, '')
					});
				}
			}
			else
				alert("解析錯誤");
		});

		console.log(data);
		fn_list.ajaxReq(fn_list.article_edit, data);
	},

	article_delete: function () {
		var data = {
			article_id: deleteItem
		};

		if(data.article_id.length === 0)
			alert("請選擇刪除的文章");
		else
			fn_list.ajaxReq(fn_list.article_delete, data);
	},

	news_add: function () {
		var data = {
			title: $('#add_title')[0].value,
			content: $('#add_content')[0].value,
			background_data: $('#add_background_data')[0].src.split(',')[1],
			background_filename: $('#add_background_file')[0].value.replace(/.*[\/\\]/, ''),
			link:[]
		};

		var isFillBlank = false;
		for(element in data) {
			if(data[element] === "" || data[element] === window.location.href)
				isFillBlank = true;
		}
		if(isFillBlank === true){
			alert("請輸入完整資料!!");
			return;
		}


		$('#add_link > div').each(function() {
			
			data.link.push({
				link_name: $(this).find('.link_name')[0].value,
				link_url: $(this).find('.link_url')[0].value
			});
			
		});

		console.log(data);
		fn_list.ajaxReq(fn_list.news_add, data);
	},

	news_edit: function () {
		var data = [
			{
				news_id: news_id,
				title: $('#edit_title')[0].value,
				content: $('#edit_content')[0].value,
				link:[]
			}
		];

		if($('#edit_background_file')[0].value !== ""){
			data[0].head_pic_data = $('#edit_background_data')[0].src.split(',')[1];
			data[0].head_pic_filename = $('#edit_background_file')[0].value.replace(/.*[\/\\]/, '');
		}

		var isFillBlank = false;
		for(element in data[0]) {
			if(data[0][element] === "" || data[0][element] === window.location.href)
				isFillBlank = true;
		}
		if(isFillBlank === true){
			alert("請輸入完整資料!!");
			return;
		}


		$('#edit_link > div').each(function() {
			
			data[0].link.push({
				link_name: $(this).find('.link_name')[0].value,
				link_url: $(this).find('.link_url')[0].value
			});
			
		});

		console.log(data);
		fn_list.ajaxReq(fn_list.news_edit, data);
	},

	news_delete: function () {
		var data = {
			news_id: deleteItem
		};

		if(data.news_id.length === 0)
			alert("請選擇刪除的文章");
		else
			fn_list.ajaxReq(fn_list.news_delete, data);
	}
}



var data_album = [
	{
		image_id: 1,
		path: "/assets/balabala.jpg"
	},
	{
		image_id: 2,
		path: "/assets/balabala2.jpg"
	},

	//... 20 objs
];
var empty_photo;
var choose_photo;

function postADD_album() {
	var postJSON = [];
	var target = $('#imgShow')[0];
	var img_data = target.src.split(',')[1];
	alert(img_data);

	if(target.src === window.location.href)
		alert("請上傳一張照片");
	else{
		postJSON.push({
			filename: $('#imgFile')[0].value.replace(/.*[\/\\]/, ''),
			content: img_data
		});

		// WriteToFile(JSON.stringify(postJSON));
	}

}


function getData_album(){
	$.ajax({
		method: "GET",
		url: "http://cfar.tku.edu.tw/image",

		success: function (data, status) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorMessage) {
			console.log(errorMessage);
		}
	});
}


//寫檔案
 function WriteToFile(text) {
   
    var fso = new ActiveXObject('Scripting.FileSystemObject');

    var file='XDD.txt';
    var folder ='E:\\work\\HTMLpackage\\C-FAR-Website\\doc\\startbootstrap-sb-admin-1.0.4\\manageHTML\\js\\';
    var f=folder+file;

    var s = fso.CreateTextFile(f, true);
    s.WriteLine("<?xml version='1.0' encoding='utf-8' ?>");
    s.WriteLine(text);
    s.Close();
 }