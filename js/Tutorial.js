const aspectRatio = 0.6666666;
var actualImg = 0;
$(document).ready(function () {
    let firstGame = JSON.parse(sessionStorage.getItem("firstGame"));
    if (firstGame != null && firstGame != undefined && !firstGame) {
        location.href = "shotenSamurai.html";
    }
    else {
        $.getJSON("js/languages.json", function (data) {
            let languageData;
            if (localStorage.getItem("languageSelected") == "en") {
                languageData = data.game.EN;
            }
            else {
                languageData = data.game.ES;
            }
            $("#clickText").html(languageData.clickText);
        });
        resizeImages();
        window.addEventListener("resize", function () { resizeImages(); }, false);
        $(document).bind("mousedown", function () { showImage(); });
        $(document).unbind("keypress").bind("keypress", function (e) {
            if (e.which == 32) {//space bar
                showImage();
            }
        });
    }

});
function showImage() {
    if (++actualImg < 5) {
        if (actualImg == 1) {
            $("#clickText").css({ display: "none" });
        }
        $("#panelTutorial" + actualImg).css({ display: "block" });
    }
    else if (actualImg == 5) {
        $("#panelTutorial1, #panelTutorial2, #panelTutorial3, #panelTutorial4 ").attr("src", "images/panel_5.png");
    }
    else {
        sessionStorage.setItem("firstGame", false);
        location.href = "shotenSamurai.html";
    }

}

function resizeImages() {
    console.log("resize");
    let isMobile = window.innerWidth / window.innerHeight < 1;
    let imageWidth = (isMobile ? 0.9 : 0.48) * window.innerWidth;
    let imageHeight = (isMobile ? 0.235 : 0.48) * window.innerHeight;
    let imageWidthB = imageHeight / aspectRatio;
    let imageHeightB = imageWidth * aspectRatio;

    if (imageWidth > imageWidthB) {
        imageWidth = Math.floor(imageWidthB);
        imageHeight = Math.floor(imageHeight);
    }
    else {
        imageHeight = Math.floor(imageHeightB);
        imageWidth = Math.floor(imageWidth);
    }
    if (isMobile) {
        let imageOffsetX = Math.floor(0.46 * (window.innerWidth - imageWidth));
        let imageOffsetY = Math.floor(0.15 * (window.innerHeight - 4 * imageHeight));
        $(".panelTutorial").css({ width: imageWidth, height: imageHeight, left: imageOffsetX });
        $("#panelTutorial1").css({ top: imageOffsetY });
        $("#panelTutorial2").css({ top: 2 * imageOffsetY + imageHeight });
        $("#panelTutorial3").css({ top: 3 * imageOffsetY + 2 * imageHeight });
        $("#panelTutorial4").css({ top: 4 * imageOffsetY + 3 * imageHeight });
    }
    else {
        let imageOffsetX = Math.floor(0.46 * (window.innerWidth - 2 * imageWidth));
        let imageOffsetY = Math.floor(0.33 * (window.innerHeight - 2 * imageHeight));
        let imageOffsetXB = window.innerWidth - imageOffsetX - imageWidth;
        let imageOffsetYB = window.innerHeight - imageOffsetY - imageHeight;
        $(".panelTutorial").css({ width: imageWidth, height: imageHeight });
        $("#panelTutorial1").css({ left: imageOffsetX, top: imageOffsetY });
        $("#panelTutorial2").css({ left: imageOffsetXB, top: imageOffsetY });
        $("#panelTutorial3").css({ left: imageOffsetX, top: imageOffsetYB });
        $("#panelTutorial4").css({ left: imageOffsetXB, top: imageOffsetYB });
    }
}