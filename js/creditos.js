$(document).ready(function () {
    $.getJSON("js/languages.json",function(data){
        let langugeData;
        if (localStorage.getItem("idiomaSelected") == "en")
        {
            langugeData = data.creditos.EN;
        }
        else
        {
            langugeData = data.creditos.ES;
        }
        $("#creditsTitle").html(langugeData.creditsTitle);
        $("#creditsText").html(langugeData.creditsText);
    });
});