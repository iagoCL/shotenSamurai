$(document).ready(function () {
    $.getJSON("js/languages.json", function (data) {
        let languageData;
        if (localStorage.getItem("languageSelected") == "en") {
            languageData = data.credits.EN;
        }
        else {
            languageData = data.credits.ES;
        }
        $("#creditsTitle").html(languageData.creditsTitle);
        $("#creditsText").html(languageData.creditsText);
    });
});