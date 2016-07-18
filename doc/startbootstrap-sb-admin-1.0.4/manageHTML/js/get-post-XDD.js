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
			image_id: data_album[data_album.length-1].image_id + 1,
			filename: $('#imgFile')[0].value.replace(/.*[\/\\]/, ''),
			content: target.src
		});

		alert(JSON.stringify(postJSON));
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


