/*exported clicked */
var puntos = 0;
$(document).ready(function () {
    $.getJSON("js/languages.json",function(data){
        let langugeData;
        if (localStorage.getItem("idiomaSelected") == "en")
        {
            langugeData = data.gameOver.EN;
        }
        else
        {
            langugeData = data.gameOver.ES;
        }
        $("#gameOverHeader").html(langugeData.gameOverHeader);
        $("#nuevaPuntuacionText").html(langugeData.nuevaPuntuacionText);
        $("#nuevoRecordText").html(langugeData.nuevoRecordText);
        $("#botonJugar").html(langugeData.botonJugar);
    });
    puntos = parseInt(sessionStorage.getItem("ultimaPuntuacion"));
    $("#puntos").html(puntos);
    if (puntos != null) {
        var puntuacionesGuardadas = JSON.parse(localStorage.getItem("puntuaciones"));
        if (puntuacionesGuardadas != null) {
            if (puntuacionesGuardadas.length<10 ||puntos >= parseInt(puntuacionesGuardadas[puntuacionesGuardadas.length - 1].puntos)) {
                $("#record").show();
            } else {
                $("#record").hide();
            }
        }
    }

});

function clicked() {
    let nombre = document.getElementById("newRecord").value;
    if (nombre == "   " || nombre == "  " || nombre == " " || nombre == "") {
        nombre = "aaa";
    }
    if (puntos != null && puntos != undefined && !puntos.isNan()) {
        var puntuacionesGuardadas = JSON.parse(localStorage.getItem("puntuaciones"));
        if (puntuacionesGuardadas != null) { //Next executions
            let nPuntos = {
                nombre,
                puntos
            };
            puntuacionesGuardadas.push(nPuntos);
            puntuacionesGuardadas.sort(function (a, b) {
                return parseInt(b.puntos) - parseInt(a.puntos);
            });
            while (puntuacionesGuardadas.length > 10) {
                puntuacionesGuardadas.pop();
            }
            localStorage.setItem("puntuaciones", JSON.stringify(puntuacionesGuardadas));
        } else { //For the first execution of gameOver
            let nPuntos = {
                nombre,
                puntos
            };
            let primerosPuntos = [nPuntos];
            localStorage.setItem("puntuaciones", JSON.stringify(primerosPuntos));
        }

    }
    sessionStorage.removeItem("ultimaPuntuacion");
}