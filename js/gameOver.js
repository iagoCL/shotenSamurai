$( document ).ready(function() {
    $("#puntos").html(parseInt(sessionStorage.getItem("ultimaPuntuacion")));
    sessionStorage.removeItem("ultimaPuntuacion");
});