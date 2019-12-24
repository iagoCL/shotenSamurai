$(document).ready(function () {
    var pts = JSON.parse(localStorage.getItem("scores"));
    if (pts != null && pts.length != 0) {
        for (var i = 0; i < pts.length; i++) {
            var li = "<li><strong>" + pts[i].name + "</strong> " + Math.trunc(pts[i].points) + "</li>";
            $(".ladder ol").append(li);
        }
    }
    $.getJSON("js/languages.json", function (data) {
        let languageData;
        if (localStorage.getItem("languageSelected") == "en") {
            languageData = data.scores.EN;
        }
        else {
            languageData = data.scores.ES;
        }
        $("#scoresHeader").html(languageData.scoresHeader);
    });
});