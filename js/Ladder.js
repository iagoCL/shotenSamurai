$(document).ready(function(){
    var pts=JSON.parse(localStorage.getItem("puntuaciones"));
    if(pts!=null && pts.length!=0){
        for(var i=0;i<pts.length;i++){
            var li="<li><strong>"+pts[i].nombre+"</strong> "+Math.trunc(pts[i].puntos)+"</li>";
            $(".ladder ol").append(li);
        }
    }
    $.getJSON("js/languages.json",function(data){
        let langugeData;
        if (localStorage.getItem("idiomaSelected") == "en")
        {
            langugeData = data.puntuaciones.EN;
        }
        else
        {
            langugeData = data.puntuaciones.ES;
        }
        $("#scoresHeader").html(langugeData.scoresHeader);
    });
});