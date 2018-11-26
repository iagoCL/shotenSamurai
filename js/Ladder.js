$(document).ready(function(){
    var pts=JSON.parse(sessionStorage.getItem("puntuaciones"));
    var ladder=document.getElementsByClassName('ladder');
    var ol=document.createElement('ol');
    ladder.appendChild(ol);
    if(pts!=null && pts.length!=0){
    for(var i=0;i<pts.length;i++){
        var li=document.createElement('li');
        ol.appendChild(li);
        li.innerHTML=li.innerHTML+pts[i];
    }
}
});