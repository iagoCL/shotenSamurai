/*exported soundActivated musicActivated languageSelected updateSoundActivated updateSelectedLanguage updateSelectedMusic */
var soundActivated;
var musicActivated;
var languageSelected;
function updateSelectedLanguage() {
    let value = localStorage.getItem("languageSelected");
    if (value == undefined) {
        languageSelected = "en";
    } else {
        languageSelected = value;
    }
}
function updateSelectedMusic() {
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