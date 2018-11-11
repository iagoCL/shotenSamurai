/*global updateMusicActivated updateIdiomaSelected updateSoundActivated soundActivated idiomaSelected musicActivated */
$( document ).ready(function() {
    updateMusicActivated();
    updateIdiomaSelected();
    updateSoundActivated();
    $("#soundSwitch").prop("checked", soundActivated);
    $("#musicSwitch").prop("checked", musicActivated);
    $("#idiomaSelector").val(idiomaSelected);

    $("#soundSwitch").change(function() {
        localStorage.setItem("soundActivated",JSON.stringify(this.checked));   
    });
    $("#musicSwitch").change(function() {
        localStorage.setItem("musicActivated",JSON.stringify(this.checked));   
    });
    $("#idiomaSelector").change(function() {
        localStorage.setItem("idiomaSelected", $("#idiomaSelector").val());   
    });
});
