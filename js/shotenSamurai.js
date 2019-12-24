/*global MainGame boot */
/*exported game*/
var game;
$(document).ready(function () {
    let firstGame = JSON.parse(sessionStorage.getItem("firstGame"));
    if (firstGame != null && firstGame != undefined && !firstGame) {
        game = new MainGame();
        boot();
        $.getJSON("js/languages.json", function (data) {
            let languageData;
            if (localStorage.getItem("languageSelected") == "en") {
                languageData = data.game.EN;
            }
            else {
                languageData = data.game.ES;
            }
            $("#loadingText").html(languageData.loadingText);
            $("#clickText").html(languageData.clickText);
        });
    }
    else {
        location.href = "tutorial.html";
    }
});
