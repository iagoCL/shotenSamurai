$(document).ready(function () {

    var puntos=sessionStorage.getItem("ultimaPuntuacion");
    if(puntos!=null){
    var puntuacionesGuardadas = JSON.parse(sessionStorage.getItem("puntuaciones"));

    if(puntuacionesGuardadas!=null){ //Next executions
        for(var i=0;i<puntuacionesGuardadas.length;i++){
            if(puntos>=puntuacionesGuardadas[i]){
                puntuacionesGuardadas.push(puntos);
                break;
            }
        }

        puntuacionesGuardadas.sort(function(a, b){return b-a});
        if(puntuacionesGuardadas.length>1){
            puntuacionesGuardadas.pop();
        }
        sessionStorage.setItem("puntuaciones",JSON.stringify(puntuacionesGuardadas));
    }else{ //For the first execution of gameOver
        let primerosPuntos=[];
        primerosPuntos.push(puntos);
        sessionStorage.setItem("puntuaciones",JSON.stringify(primerosPuntos));
    }
    $("#puntos").html(parseInt(puntos));
    sessionStorage.removeItem("ultimaPuntuacion");
    }   
    
});