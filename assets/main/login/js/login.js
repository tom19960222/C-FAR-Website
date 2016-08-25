$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});


$('#portfolio').on('click', function() {
	// body...
	alert("Don't hack me !!");
});

$('#codepen').on('click', function() {
	// body...
	alert("Go back to MainPage~~");
});


//post/get data

function postUser(){
    var userName = document.getElementById('Username');
    var userPasswd = document.getElementById('Password');

    var data = {
        email: userName.value,
        password: userPasswd.value
    };
    console.log(JSON.stringify(data));


    //jQuery post
    $.ajax({
        url: 'http://cfar.hsexpert.net/user/login',
        type: 'post',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json'
        },
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if(textStatus === 'success')
                window.location = "/member-manage";
        }
    });
}