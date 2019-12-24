/*exported clicked */
var points = 0;
$(document).ready(function () {
    $.getJSON("js/languages.json", function (data) {
        let languageData;
        if (localStorage.getItem("languageSelected") == "en") {
            languageData = data.gameOver.EN;
        }
        else {
            languageData = data.gameOver.ES;
        }
        $("#gameOverHeader").html(languageData.gameOverHeader);
        $("#newScoreText").html(languageData.newScoreText);
        $("#newRecordText").html(languageData.newRecordText);
        $("#playButton").html(languageData.playButton);
    });
    points = parseInt(sessionStorage.getItem("lastScore"));
    $("#points").html(points);
    if (points != null) {
        var savedScores = JSON.parse(localStorage.getItem("scores"));
        if (savedScores != null) {
            if (savedScores.length < 10 || points >= parseInt(savedScores[savedScores.length - 1].points)) {
                $("#record").show();
            } else {
                $("#record").hide();
            }
        }
    }
    $(document).bind("keypress", function (e) {
        if (e.which == 32) {//space bar
            clicked();
            location.href = "shotenSamurai.html";
        }
    });

});

function clicked() {
    let name = document.getElementById("newRecord").value;
    if (name == "   " || name == "  " || name == " " || name == "") {
        name = "aaa";
    }
    if (points != null && points != undefined) {
        var savedScores = JSON.parse(localStorage.getItem("scores"));
        if (savedScores != null) { //Next executions
            let nPoints = {
                name,
                points
            };
            savedScores.push(nPoints);
            savedScores.sort(function (a, b) {
                return parseInt(b.points) - parseInt(a.points);
            });
            while (savedScores.length > 10) {
                savedScores.pop();
            }
            localStorage.setItem("scores", JSON.stringify(savedScores));
        } else { //For the first execution of gameOver
            let nPoints = {
                name,
                points
            };
            let primerosPoints = [nPoints];
            localStorage.setItem("scores", JSON.stringify(primerosPoints));
        }

    }
    sessionStorage.removeItem("lastScore");
}