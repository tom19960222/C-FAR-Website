/**
 * Created by 你好 on 2016/1/14.
 */


var dataType = [
    ""
];


var Container = $('.container');

function CreateTitle(data){
    var title = '<div class="row title"><div class="col-12 font-thin">' + data + '</div></div><!--title-row-->';
    Container.append(title);
}

function CreateSubtitle(data){
    var title = '<div class="row subtitle"><div class="col-12 font-thin">' + data + '</div></div><!--subtitle-row-->';
    Container.append(title);
}


CreateTitle('XDDD');
CreateSubtitle('QAQ');