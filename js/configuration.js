/*global updateSelectedMusic updateSelectedLanguage updateSoundActivated soundActivated languageSelected musicActivated */
var jsonData;
$(document).ready(function () {
    updateSelectedMusic();
    updateSelectedLanguage();
    updateSoundActivated();
    $.getJSON("js/languages.json", function (data) {
        //console.log(data);
        jsonData = data;
        updateIdiom();
    });

    $("#soundSwitch").prop("checked", soundActivated);
    $("#musicSwitch").prop("checked", musicActivated);
    $("#languageSelector").val(languageSelected);

    $("#soundSwitch").change(function () {
        localStorage.setItem("soundActivated", JSON.stringify(this.checked));
    });
    $("#musicSwitch").change(function () {
        localStorage.setItem("musicActivated", JSON.stringify(this.checked));
    });
    $("#languageSelector").change(function () {
        localStorage.setItem("languageSelected", $("#languageSelector").val());
        updateIdiom();
    });
});

function updateIdiom() {
    let languageData;
    if (localStorage.getItem("languageSelected") == "en") {
        languageData = jsonData.configuration.EN;
    }
    else {
        languageData = jsonData.configuration.ES;
    }
    $("#languageLabel").html(languageData.languageLabel);
    $("#musicLabel").html(languageData.musicLabel);
    $("#soundLabe").html(languageData.soundLabe);
    $("#configLabel").html(languageData.configLabel);
}

