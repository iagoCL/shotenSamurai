/*global MainGame boot */
/*exported game*/
var game;
$(document).ready(function () {
    let firstGame = JSON.parse(sessionStorage.getItem("firstGame"));
    if(firstGame != null && firstGame != undefined && !firstGame)
    {
        game = new MainGame();
        boot();
        $.getJSON("js/languages.json",function(data){
            let langugeData;
            if (localStorage.getItem("idiomaSelected") == "en")
            {
                langugeData = data.game.EN;
            }
            else
            {
                langugeData = data.game.ES;
            }
            $("#loadingText").html(langugeData.loadingText);
            $("#clickText").html(langugeData.clickText);
        });
    }
    else
    {
        location.href = "tutorial.html";
    }
});
