$(document).ready(function () {
    $.getJSON("js/languages.json",function(data){
        let langugeData;
        if (localStorage.getItem("idiomaSelected") == "en")
        {
            langugeData = data.menu.EN;
        }
        else
        {
            langugeData = data.menu.ES;
        }
        $("#jugar").html(langugeData.jugar);
        $("#creditos").html(langugeData.creditos);
        $("#puntuaciones").html(langugeData.puntuaciones);
        $("#config").html(langugeData.config);
    });
});