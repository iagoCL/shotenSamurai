/*exported soundActivated musicActivated idiomaSelected updateSoundActivated updateIdiomaSelected updateMusicActivated */
var soundActivated;
var musicActivated;
var idiomaSelected;
function updateIdiomaSelected() {
    let value = localStorage.getItem("idiomaSelected");
    if (value == undefined ) {
        idiomaSelected = "es";
    } else {
        idiomaSelected = value;
    }
}
function updateMusicActivated() {
    let value = localStorage.getItem("musicActivated");
    if (value == undefined || value == "true") {
        musicActivated = true;
    } else {
        musicActivated = false;
    }
}
function updateSoundActivated() {
    let value = localStorage.getItem("soundActivated");
    if (value == undefined || value == "true") {
        soundActivated = true;
    } else {
        soundActivated = false;
    }
}