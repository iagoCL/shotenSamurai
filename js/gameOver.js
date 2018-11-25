$(document).ready(function () {
    var puntos=sessionStorage.getItem("ultimaPuntuacion");
    var puntuacionesGuardadas = JSON.parse(sessionStorage.getItem("puntuaciones"));

    if(puntuacionesGuardadas!=null){
    for(var i=0;i<puntuacionesGuardadas.length;i++){
     if(puntos>=puntuacionesGuardadas[i]){
        puntuacionesGuardadas.push(puntos);
        return null;
     }
    }
    puntuacionesGuardadas.sort(function(a, b){return b - a});
    if(puntuacionesGuardadas.length>2){
        puntuacionesGuardadas.pop;
    }
    sessionStorage.setItem("puntuaciones",JSON.stringify(puntuacionesGuardadas));
    }else{
        let puntuacionesGuardadas= [];
        puntuacionesGuardadas.push(puntos);
        sessionStorage.setItem("puntuaciones",JSON.stringify(puntuacionesGuardadas));

    }
    $("#puntos").html(parseInt(puntos));
    sessionStorage.removeItem("ultimaPuntuacion");
    
});