const aspectRatio = 0.6666666;

$(document).ready(function () {
    resizeCanvas();
    window.addEventListener("resize", function(){resizeCanvas();}, false);


});

function resizeCanvas() {
    console.log("resize");
    canvasWidth = 0.45 * window.innerWidth;
    canvasHeight = 0.45 * window.innerHeight;
    let canvasWidthB = canvasHeight / aspectRatio;
    let canvasHeightB = canvasWidth * aspectRatio;
    if (canvasWidth > canvasWidthB) {
        canvasWidth = Math.floor(canvasWidthB);
        canvasHeight = Math.floor(canvasHeight);
    }
    else {
        canvasHeight = Math.floor(canvasHeightB);
        canvasWidth = Math.floor(canvasWidth);
    }
    $(".panelTutorial").attr("width",canvasWidth);
    $(".panelTutorial").attr("height",canvasHeight);
    $(".panelTutorial").css({height: canvasHeight, width: canvasWidth});
}