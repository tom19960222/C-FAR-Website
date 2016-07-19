


var fn_list = {

	user_login: 	{url: "http://cfar.hsexpert.net/user/login", method: "POST"},
	user_add: 		{url: "http://cfar.hsexpert.net/user/add", method: "POST"},

	image_get: 		{url: "http://cfar.hsexpert.net/image", method: "GET"},
	image_add: 		{url: "http://cfar.hsexpert.net/image", method: "POST"},
	image_update: 	{url: "http://cfar.hsexpert.net/image", method: "PUT"},

	member_get: 	{url: "http://cfar.hsexpert.net/member", method: "GET"},
	member_add: 	{url: "http://cfar.hsexpert.net/member", method: "POST"},
	member_edit: 	{url: "http://cfar.hsexpert.net/member", method: "PUT"},
	member_delete: 	{url: "http://cfar.hsexpert.net/member", method: "DELETE"},

	message_get: 	{url: "http://cfar.hsexpert.net/message", method: "GET"},
	message_add: 	{url: "http://cfar.hsexpert.net/message", method: "POST"},
	message_edit: 	{url: "http://cfar.hsexpert.net/message", method: "PUT"},
	message_delete: {url: "http://cfar.hsexpert.net/message", method: "DELETE"},

	article_get: 	{url: "http://cfar.hsexpert.net/article", method: "GET"},
	article_add: 	{url: "http://cfar.hsexpert.net/article", method: "POST"},
	article_edit: 	{url: "http://cfar.hsexpert.net/article", method: "PUT"},
	article_delete: {url: "http://cfar.hsexpert.net/article", method: "DELETE"},

	ajaxReq: function (doFn, data) {
		$.ajax({
			method: doFn.method,
			url: doFn.url,
			data: data,
			
			success: function (data, status) {

				switch(doFn){
					case fn_list.image_get:
						data.forEach(function(element, index, array) {
							element.path = "http://cfar.hsexpert.net" + element.path;
						})
						a = data;
		    			initAlbum();	
	    			break;

	    			case fn_list.member_get:
	    				data.forEach(function(element, index, array) {
	    					element.head_pic_url = "http://cfar.hsexpert.net" + element.head_pic_url;
	    				})

	    				c = data;
	    				initMember();
	    			break;

	    			case fn_list.message_get:
	    				b = data;
	    			break;
				}
				
			},
			error: function (jqXHR, textStatus, errorMessage) {
				console.log(errorMessage);
			}
		})
	}
};








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
	if(target.src === window.location.href)
		alert("請上傳一張照片");
	else{
		postJSON.push({
			filename: $('#imgFile')[0].value.replace(/.*[\/\\]/, ''),
			content: target.src
		});

		WriteToFile(JSON.stringify(postJSON));
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

    var file='img_add_test.txt';
    var folder ='F:\\work\\HTMLpackage\\C-FAR-Website\\doc\\startbootstrap-sb-admin-1.0.4\\manageHTML\\js\\';
    var f=folder+file;

    var s = fso.CreateTextFile(f, true);
    s.WriteLine("<?xml version='1.0' encoding='utf-8' ?>");
    s.WriteLine(text);
    s.Close();
 }