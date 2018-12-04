/*global updateMusicActivated updateIdiomaSelected updateSoundActivated soundActivated idiomaSelected musicActivated */
var jsonData;
$(document).ready(function () {
    updateMusicActivated();
    updateIdiomaSelected();
    updateSoundActivated();
    $.getJSON("js/languages.json",function(data){
        //console.log(data);
        jsonData=data;
        updateIdiom();
    });
    
    $("#soundSwitch").prop("checked", soundActivated);
    $("#musicSwitch").prop("checked", musicActivated);
    $("#idiomaSelector").val(idiomaSelected);

    $("#soundSwitch").change(function () {
        localStorage.setItem("soundActivated", JSON.stringify(this.checked));
    });
    $("#musicSwitch").change(function () {
        localStorage.setItem("musicActivated", JSON.stringify(this.checked));
    });
    $("#idiomaSelector").change(function () {
        localStorage.setItem("idiomaSelected", $("#idiomaSelector").val());
        updateIdiom();
    });
});

function updateIdiom(){
    let langugeData;
    if (localStorage.getItem("idiomaSelected") == "en")
    {
        langugeData = jsonData.configuracion.EN;
    }
    else
    {
        langugeData = jsonData.configuracion.ES;
    }
    $("#idiomaLabel").html(langugeData.idiomaLabel);
    $("#musicaLabel").html(langugeData.musicaLabel);
    $("#sonidoLabel").html(langugeData.sonidoLabel);
    $("#configLabel").html(langugeData.configLabel);
}

