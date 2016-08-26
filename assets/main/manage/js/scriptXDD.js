//Coding By JasonXDDD

//work page - Photo Album  
var a;

function initAlbum() {
    var target = $('#owl-img');
    var changeAlbum = $('.change_album').children("img");

    a.forEach(function(element, index, array) {
        target.data('owlCarousel').addItem(photoFactor(element.path));
        if (changeAlbum.length !== 0)
            changeAlbum[element.image_id - 1].setAttribute("src", element.path);
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


        items: 5,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [700, 1]

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

function editShareFactor(ch_name, job, index) {
    return '<div class="col-sm-6">' +
        '<button class="btn btn-default btn-lg choose_edit_share" onclick="chooseEdit(this)" value="' + index + '">' +
        '<span style="font-weight: 900;">' + ch_name + '</span>' +
        ' <small>' + job + '</small>' +
        '</button>' +
        '</div>';
}


function deleteShareFactor(ch_name, job, index) {
    return '<div class="col-sm-6">' +
        '<button class="btn btn-default btn-lg" onclick="chooseDelete(this)" value="' + index + '">' +
        '<span style="font-weight: 900;">' + ch_name + '</span>' +
        ' <small>' + job + '</small>' +
        '</button>' +
        '</div>';
}

function shareFactor(content, author, job) {
    content = content.replace(/\n/g, "<br />");

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

        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });

});


//story page - member
var c;

function initMember() {
    var target = $('#member-owl');
    var editMember = $('#edit_member');
    var deleteMember = $('#delete_member');

    c.forEach(function(element, index, array) {
        memberFactor(element.ch_name, element.en_name, element.job_title, element.head_pic_url, element.member_id, array);
        editMember.append(editMemberFactor(element.ch_name, element.head_pic_url, element.member_id));
        deleteMember.append(deleteMemberFactor(element.ch_name, element.head_pic_url, element.member_id));
    })
    target.append(memberData);
    showIntro();
};

function deleteMemberFactor(ch_name, img, index) {
    return '<div class="col-sm-3">' +
        ch_name +
        '<button class="btn btn-default btn-lg" onclick="chooseDelete(this)" value="' + index + '">' +
        '<img src="' + img + '" height="200px" width="auto">' +
        '</button>' +
        '</div>';
}

function editMemberFactor(ch_name, img, index) {
    return '<div class="col-sm-3">' +
        ch_name +
        '<button class="btn btn-default btn-lg choose_edit_member" onclick="chooseEdit(this)" value="' + index + '">' +
        '<img src="' + img + '" height="200px" width="auto">' +
        '</button>' +
        '</div>';
}

var memberData = "";
function memberFactor(ch_name, en_name, job, head, index, array){
    if(index%4 === 1){
        memberData += `<div class="row member_term_` + index%4 + `">`;
        memberData += memberElementFactor(ch_name, en_name, job, head, index);
    }
    else if(index%4 === 0){
        memberData += memberElementFactor(ch_name, en_name, job, head, index);
        memberData +=
            `<div class="col-lg-12 subtitle-row">
                <div class="col-12 font-thin member_intro" style="font-size: 25px; height: 200px">
                </div>
            </div>
        </div>
        <!-- /row -->`;
    }
    else{
        memberData += memberElementFactor(ch_name, en_name, job, head, index);
    }


    if(index === array.length && index%4 !== 0){
        memberData +=
            `<div class="col-lg-12 subtitle-row">
                <div class="col-12 font-thin member_intro" style="font-size: 25px; height: 200px">
                </div>
            </div>
        </div>
        <!-- /row -->`;
    }

}

function memberElementFactor(ch_name, en_name, job, head, index) {
    return `<div id=` + index + ` class="mem col-lg-3">
                <p style="height: 250px; width: 200px; overflow: hidden; margin: 0 auto;">  
                    <img src="` + head + `" style="height: 250px;"> 
                </p>
                <h2 class="font-semibold" style=" font-size: 30px; padding-bottom: 10px">` +
                    ch_name + `<br>` + job + `<br>
                    <span style="font-size: 20px">` +
                        en_name +
                    `</span>
                </h2>
            </div> <!-- /col12 -->`;
}


//media is mobile
var mq = window.matchMedia( "(max-width: 750px)" );

function showIntro(e) {
    $('.mem').mouseenter(
        function(){
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
    //reset all style
    $('.mem').css('opacity', 1);

    if(target === undefined || target === 0) return;
    target.style.opacity = .6;

    //find the data of target id
    var a = $.grep(c, function(e){
        return e.member_id == target.getAttribute('id');
    });

    $(target).parent().find(".member_intro")[0].innerHTML = a[0].introduction;

}

//future page - article
var d;

function initArticle() {
    var target = $('#owl-future');
    var editArticle = $('#edit_article');
    var deleteArticle = $('#delete_article');

    d.reverse();

    d.forEach(function(element, index, array) {
        target.data('owlCarousel').addItem(articleFactor(element.background_url, element.title, element.author, "http://cfar.tku.edu.tw" + element.link));
        editArticle.append(editArticleFactor(element.title, element.author, element.article_id));
        deleteArticle.append(deleteArticleFactor(element.title, element.author, element.article_id));

    })

}

function articleFactor(bg, title, author, link) {
    return '<div class="item" style="padding-bottom: 10%">' +
        '<div class="demo-card-wide mdl-card mdl-shadow--4dp"' +
        ' style="width: 90%;position: relative; margin: 2% 5% auto">' +
        '<div class="mdl-card__title"' +
        'style="background-image: url(' + bg + '); height: 300px; color: white; padding: 0; background-size: cover; background-position: 50% 50%;">' +
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

function deleteArticleFactor(title, author, index) {
    return '<div class="col-sm-3">' +
        '<button class="btn btn-default btn-lg" onclick="chooseDelete(this)" value="' + index + '">' +
        title + '<br>' +
        author +
        '</button>' +
        '</div>';
}

function editArticleFactor(title, author, index) {
    return '<div class="col-sm-6">' +
        '<button class="btn btn-default btn-lg choose_edit_member" onclick="chooseEdit(this)" value="' + index + '">' +
        title + '<br>' +
        author +
        '</button>' +
        '</div>';
}


//animate
$(document).ready(function() {

    $("#owl-future").owlCarousel({

        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [979, 2],

        navigation: true

    });

});




//new-things page news
var e;

function initNews() {
    var target = $('#owl-newthing');
    var editNews = $('#edit_news');
    var deleteNews = $('#delete_news');

    e.forEach(function(element, index, array) {
        target.data('owlCarousel').addItem(newsFactor(element.title, element.background, element.content, element.link));
        editNews.append(editNewsFactor(element.title, element.news_id));
        deleteNews.append(deleteNewsFactor(element.title, element.news_id));
    })

}


function newsFactor(title, bg, content, link) {
    content = content.replace(/\n/g, "<br />");

    var x = `
		<div class="item">
            <!-- /row -->
            <div class="row subtitle-row" style="padding: 0; margin: 0;">
                <div class="col-sm-1 hidden-sm">&nbsp;</div>
                <div class="col-12 col-sm-10">
                    <img src="` + bg + `" style="width: 100%; height: auto">
                </div>
                <div class="col-sm-1 hidden-sm">&nbsp;</div>
            </div>
            <div class="row subtitle-row">
                <div class="col-sm-1 hidden-sm">&nbsp;</div>
                <div class="col-12 col-sm-10 font-light content-font">
                    <span class="font-semibold">` + title + `</span><br>
					` + content + '<br>' +
        `
                    <br>
                    <span class="font-semibold">網站連結:</span><br>
                    `;
    link = JSON.parse(link);
    link.forEach(function(element, index, array) {
        x +=
            '<a class="link" href="' + element.link_url + '">' +
            element.link_name +
            '</a><br>';
    })

    x += `                
                </div>
                <div class="col-sm-1 hidden-sm">&nbsp;</div>
            </div> 
        </div>

        `;

    return x;
}

function deleteNewsFactor(title, index) {
    return '<div class="col-sm-12" style="padding-bottom: 3px">' +
        '<button class="btn btn-default btn-lg" onclick="chooseDelete(this)" value="' + index + '">' +
        title +
        '</button>' +
        '</div>';
}

function editNewsFactor(title, index) {
    return '<div class="col-sm-12" style="padding-bottom: 3px">' +
        '<button class="btn btn-default btn-lg choose_edit_member" onclick="chooseEdit(this)" value="' + index + '">' +
        title +
        '</button>' +
        '</div>';
}

//animate
$(document).ready(function() {

    $("#owl-newthing").owlCarousel({
        autoPlay: true,
        stopOnHover: true,
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],

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


