/**
 * Created by 你好 on 2016/1/17.
 */

function restart(){

    //jQuery post
    $.ajax({
        url: 'http://cfar.tku.edu.tw/admin/action/restart',
        type: 'get',
        success: function (data, textStatus, xhr) {
            console.log(data);
            console.log(textStatus);
        }
    });
}