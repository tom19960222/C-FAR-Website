/**
 * Created by 你好 on 2016/1/14.
 */


function getRangeValue (){
    var RangeValue = document.getElementById('myRange');
    var ShowValue = document.getElementById('myShow');
    ShowValue.innerHTML = RangeValue.value;
}


// IE does not know about the target attribute. It looks for srcElement
// This function will get the event target in a browser-compatible way
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

var Choose = document.getElementById('myChoose');
Choose.onclick = function(e){
    var target = getEventTarget(e);
    var Ans = document.getElementsByClassName('myAns')[0];
    Ans.innerHTML = target.innerHTML;
};