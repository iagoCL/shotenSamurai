const aspectRatio = 0.6666666;

$(document).ready(function () {
    resizeCanvas();
    window.addEventListener("resize", function(){resizeCanvas();}, false);
});

function resizeCanvas() {
    console.log("resize");
    canvasWidth = 0.490 * window.innerWidth;
    canvasHeight = 0.490 * window.innerHeight;
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
    let canvasOffset = Math.floor(0.45*(window.innerWidth-2*canvasWidth));
    let canvasOffsetY = Math.floor(0.45*(window.innerHeight-2*canvasHeight));
    $(".panelTutorial").css({width: canvasWidth, height: canvasHeight});
    $("#panelTutorial1").css({left: canvasOffset, top: canvasOffsetY});
    $("#panelTutorial2").css({left: (window.innerWidth - canvasOffset-canvasWidth) ,top: canvasOffsetY});
    $("#panelTutorial3").css({left: canvasOffset,top: (window.innerHeight - canvasOffsetY-canvasHeight)});
    $("#panelTutorial4").css({left: (window.innerWidth - canvasOffset-canvasWidth),top: (window.innerHeight - canvasOffsetY-canvasHeight)});
}