const aspectRatio = 0.817;

$(document).ready(function () {
    $.getJSON("js/languages.json", function (data) {
        let languageData;
        if (localStorage.getItem("languageSelected") == "en") {
            languageData = data.menu.EN;
        }
        else {
            languageData = data.menu.ES;
        }
        $("#play").html(languageData.play);
        $("#credits").html(languageData.credits);
        $("#scores").html(languageData.scores);
        $("#config").html(languageData.config);
    });
    let firstLoad = JSON.parse(sessionStorage.getItem("firstLoad"));
    if (firstLoad != null && firstLoad != undefined && !firstLoad) {
        $("#mainMenu").css({ display: "block" });
    }
    else {
        $("#firstGame").css({ display: "block" });
        $(document).click(function () {
            sessionStorage.setItem("firstLoad", false);
            $("#mainMenu").css({ display: "block" });
            $("#firstGame").css({ display: "none" });
            $(document).unbind("click");
        });
    }
    resizeMenu();
    window.addEventListener("resize", resizeMenu, false);
});
function resizeMenu() {
    let imageWidth = 0.895 * window.innerWidth;
    let imageHeight = 0.895 * window.innerHeight;
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

    $("#firstGame").css({ left: Math.floor(0.5 * (window.innerWidth - imageWidth)), top: Math.floor(0.5 * (window.innerHeight - imageHeight)), width: imageWidth, height: imageHeight });
    //console.log("resize to w: "+imageWidth + " h: "+imageHeight);
}