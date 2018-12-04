/*global updateMusicActivated updateIdiomaSelected updateSoundActivated soundActivated idiomaSelected musicActivated */
$(document).ready(function () {
    updateMusicActivated();
    updateIdiomaSelected();
    updateSoundActivated();

    $.getJSON('js/languages.json',function(data){
        console.log(data);
        este=data;
    });
  //  $(".conHeadLabel").text(este.);
  
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
    });
    
    var este;

    
});

