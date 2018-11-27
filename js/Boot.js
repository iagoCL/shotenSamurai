/*global PersonalAnimation game updateMusicActivated updateSoundActivated soundActivated musicActivated*/
/*exported animations sounds boot images assets checkSoundAndPlay */
var images;
var animations;
var sounds;
const totalResources = 50;
var resourcesLoaded = 0;
const endLoadingProgress = " / " + totalResources;

function boot() {
    updateMusicActivated();
    updateSoundActivated();
    game.loadingProgress.innerHTML = 0 + endLoadingProgress;
    const infiniteRepaintsPerFrame = 9999999;
    const longRepaintsPerFrame = 9;
    const defaultRepaintsPerFrame = 6;
    const shortRepaintsPerFrame = 5;

    images = {
        scene_start: loadImage("images/stage/fondo-easyStart.png"),
        scene_easy: loadImage("images/stage/fondo-easy.png"),
        scene_easyToMid: loadImage("images/stage/fondo-easyToMid.png"),
        scene_mid: loadImage("images/stage/fondo-mid.png"),
        scene_midToHard: loadImage("images/stage/fondo-midToHard.png"),
        scene_hard: loadImage("images/stage/fondo-hard.png"),
        scene_hardToHell: loadImage("images/stage/fondo-hardToHell.png"),
        scene_hell: loadImage("images/stage/fondo-hell.png")
    };
    sounds = {
        cut: loadAudio("sounds/cut.ogg", soundActivated),
        death: loadAudio("sounds/death.ogg", soundActivated),
        jump: loadAudio("sounds/jump.ogg", soundActivated),
        music: loadAudio("sounds/music.ogg", musicActivated)
    };

    let animacionHumo =new PersonalAnimation(longRepaintsPerFrame,
        [ loadImage("images/destuccionObjeto.png") ] 
    );

    let animacionSaltoIzq = new PersonalAnimation(shortRepaintsPerFrame,
        [ loadImage("images/personaje/player_jump_izq.png") ]
    );
    let animacionSaltoDer =new PersonalAnimation(shortRepaintsPerFrame,
        [ loadImage("images/personaje/player_jump_der.png") ]
    );

    let animacionParedEasyDer =new PersonalAnimation(longRepaintsPerFrame,
        [ loadImage("images/obstaculos/paredEasyDer.png") ] 
    );
    let animacionParedMidDer =new PersonalAnimation(longRepaintsPerFrame,
        [ loadImage("images/obstaculos/paredMidDer.png") ] 
    );
    let animacionParedHardDer =new PersonalAnimation(longRepaintsPerFrame,
        [ loadImage("images/obstaculos/paredHardDer.png") ] 
    );
    let animacionParedHellDer =new PersonalAnimation(longRepaintsPerFrame,
        [ loadImage("images/obstaculos/paredHellDer.png") ] 
    );
    let animacionParedEasyIzq =new PersonalAnimation(longRepaintsPerFrame,
        [ loadImage("images/obstaculos/paredEasyIzq.png") ] 
    );
    let animacionParedMidIzq =new PersonalAnimation(longRepaintsPerFrame,
        [ loadImage("images/obstaculos/paredMidIzq.png") ] 
    );
    let animacionParedHardIzq =new PersonalAnimation(longRepaintsPerFrame,
        [ loadImage("images/obstaculos/paredHardIzq.png") ] 
    );
    let animacionParedHellIzq =new PersonalAnimation(longRepaintsPerFrame,
        [ loadImage("images/obstaculos/paredHellIzq.png") ] 
    );

    //todo: avoid duplicated loads.
    animations = {
        character_walk_izq: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_walk_izq_1.png"),
                loadImage("images/personaje/player_walk_izq_2.png"),
                loadImage("images/personaje/player_walk_izq_3.png"),
                loadImage("images/personaje/player_walk_izq_4.png"),
                loadImage("images/personaje/player_walk_izq_5.png"),
                loadImage("images/personaje/player_walk_izq_6.png")
            ]
        ),
        character_jumping_izq: animacionSaltoIzq,
        character_land_izq: new PersonalAnimation(shortRepaintsPerFrame,
            [
                loadImage("images/personaje/player_jump_izq.png")
            ]
        ),
        character_walk_der: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_walk_der_1.png"),
                loadImage("images/personaje/player_walk_der_2.png"),
                loadImage("images/personaje/player_walk_der_3.png"),
                loadImage("images/personaje/player_walk_der_4.png"),
                loadImage("images/personaje/player_walk_der_5.png"),
                loadImage("images/personaje/player_walk_der_6.png")
            ]
        ),
        character_jumping_der: animacionSaltoDer,
        character_land_der: animacionSaltoDer,
        character_air_der: new PersonalAnimation(infiniteRepaintsPerFrame,
            [ loadImage("images/personaje/player_air_der.png") ]
        ),
        character_air_izq: new PersonalAnimation(infiniteRepaintsPerFrame,
            [ loadImage("images/personaje/player_air_izq.png") ]
        ),
        character_death: new PersonalAnimation(shortRepaintsPerFrame,
            [
                loadImage("images/personaje/player_death_1.png"),
                loadImage("images/personaje/player_death_2.png")
            ]
        ),
        character_death_fall: new PersonalAnimation(infiniteRepaintsPerFrame,
            [ loadImage("images/personaje/player_death_2.png") ]
        ),
        obstacle_wall_right: {
            easy: {
                normal: animacionParedEasyDer,
                destroy: animacionParedEasyDer
            },
            mid: {
                normal: animacionParedMidDer,
                destroy: animacionParedMidDer
            },
            hard: {
                normal: animacionParedHardDer,
                destroy: animacionParedHardDer
            },
            hell: {
                normal: animacionParedHellDer,
                destroy: animacionParedHellDer
            }
        },
        obstacle_wall_left: {
            easy: {
                normal: animacionParedEasyIzq,
                destroy: animacionParedEasyIzq
            },
            mid: {
                normal: animacionParedMidIzq,
                destroy: animacionParedMidIzq
            },
            hard: {
                normal: animacionParedHardIzq,
                destroy: animacionParedHardIzq
            },
            hell: {
                normal: animacionParedHellIzq,
                destroy: animacionParedHellIzq
            }
        },
        obstacle_objects: [
            {
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [ loadImage("images/obstaculos/Roca1.png") ]
                ),
                destroy: animacionHumo
            },
            {
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [ loadImage("images/obstaculos/Roca2.png") ]
                ),
                destroy: animacionHumo
            },
            {
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [ loadImage("images/obstaculos/Roca3.png") ]
                ),
                destroy: animacionHumo
            },
            {
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [ loadImage("images/obstaculos/Roca4.png") ]
                ),
                destroy: animacionHumo
            }
        ],
        cut_objects: [
            {//Bamboo
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [ loadImage("images/objetos/Bamboo.png") ]
                ),
                destroy: animacionHumo
            },
            {//Farol
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [ loadImage("images/objetos/Farol.png") ]
                ),
                destroy: animacionHumo
            },
            {//Moned
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [ loadImage("images/objetos/Moneda.png") ]
                ),
                destroy: animacionHumo
            },
            {//Tela
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [ loadImage("images/objetos/Tela.png") ]
                ),
                destroy: animacionHumo
            },
            {//Tabla
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [ loadImage("images/objetos/Tabla.png") ]
                ),
                destroy: animacionHumo
            }
        ]
    };
}

function loadImage(src_) {
    let img = new Image();
    img.addEventListener("load", resourceLoaded);
    img.addEventListener("error", function () {
        console.log("COULD NOT LOAD IMAGE: "+src_);
    });
    img.src = src_;
    return img;
}

function loadAudio(src_, load_) {
    if (load_) {
        let audio = new Audio(src_);
        audio.addEventListener("canplaythrough", function () {
            resourceLoaded();
        }, false);
        audio.addEventListener("error", function () {
            console.log("COULD NOT LOAD AUDIO: "+ src_);
        });
        audio.load();
        return audio;
    } else {
        resourceLoaded();
        return null;
    }

}

function resourceLoaded() {
    game.loadingProgress.innerHTML = ++resourcesLoaded + endLoadingProgress;
    //console.log("r: "+resourcesLoaded);
    if (resourcesLoaded == totalResources) {
        $("#clickText").css("visibility", "visible");
        $(document).click(showGame);
        $(document).bind("keypress", function(e) {
            if (e.which == 32){//space bar
                showGame();
            }
        });
    }
}

function showGame(){
    $("#loadingGame").hide();
    game.canvas.style.display = "block";
    game.pointsText.css({ display:  "block"});
    game.comboText.css({ display:  "block"});
    game.lineaMin.css({ display:  "block"});
    game.lineaMax.css({ display:  "block"});
    game.startGame();

}

function checkSoundAndPlay(sound_) {
    if (soundActivated) {
        sound_.play();
    }
}