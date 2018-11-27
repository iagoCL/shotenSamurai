$(document).ready(function () {

    let puntos=sessionStorage.getItem("ultimaPuntuacion");
    $("#puntos").html(parseInt(puntos));
    if(puntos!=null){
        var puntuacionesGuardadas = JSON.parse(sessionStorage.getItem("puntuaciones"));
        if(puntuacionesGuardadas!=null){
            for(var i=0;i<puntuacionesGuardadas.length;i++){
                if(puntos>=puntuacionesGuardadas[i].puntos || puntuacionesGuardadas.length<2){
                    $("#record").show();
                    break;
                }else{
                    $("#record").hide();
                }
            }
        }
     }
    
});

function clicked() {
    let puntos=sessionStorage.getItem("ultimaPuntuacion");
    let nombre=document.getElementById("newRecord").value;
    if(nombre=="   " ||nombre=="  "||nombre==" "||nombre==""){
        nombre="aaa";
    }
    if(puntos!=null){
        var puntuacionesGuardadas = JSON.parse(sessionStorage.getItem("puntuaciones"));
        if(puntuacionesGuardadas!=null){ //Next executions
            for(var i=0;i<puntuacionesGuardadas.length;i++){
                if(puntos>=puntuacionesGuardadas[i].puntos || puntuacionesGuardadas.length<2){
                    let nPuntos={nombre,puntos};
                    puntuacionesGuardadas.push(nPuntos);
                    break;
                }
            }
    
            puntuacionesGuardadas.sort(function(a, b){return b.puntos-a.puntos});
            while(puntuacionesGuardadas.length>2){
                puntuacionesGuardadas.pop();
            }
            sessionStorage.setItem("puntuaciones",JSON.stringify(puntuacionesGuardadas));
        }else{ //For the first execution of gameOver
            let nPuntos={nombre,puntos};
            let primerosPuntos=[];
            primerosPuntos.push(nPuntos);
            sessionStorage.setItem("puntuaciones",JSON.stringify(primerosPuntos));
        }

}

sessionStorage.removeItem("ultimaPuntuacion");
}
