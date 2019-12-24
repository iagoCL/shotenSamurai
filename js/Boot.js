/*global PersonalAnimation game updateSelectedMusic updateSoundActivated soundActivated musicActivated*/
/*exported animations sounds boot images assets checkSoundAndPlay */
var images;
var animations;
var sounds;
const totalResources = 49;
var resourcesLoaded = 0;
const endLoadingProgress = " / " + totalResources;

function boot() {
    updateSelectedMusic();
    updateSoundActivated();
    game.loadingProgress.innerHTML = 0 + endLoadingProgress;
    const infiniteRepaintsPerFrame = Infinity;
    const longRepaintsPerFrame = 9;
    const defaultRepaintsPerFrame = 6;
    const shortRepaintsPerFrame = 5;

    images = {
        scene_start: loadImage("images/stage/background-easyStart.png"),
        scene_easy: loadImage("images/stage/background-easy.png"),
        scene_easyToMid: loadImage("images/stage/background-easyToMid.png"),
        scene_mid: loadImage("images/stage/background-mid.png"),
        scene_midToHard: loadImage("images/stage/background-midToHard.png"),
        scene_hard: loadImage("images/stage/background-hard.png"),
        scene_hardToHell: loadImage("images/stage/background-hardToHell.png"),
        scene_hell: loadImage("images/stage/background-hell.png")
    };
    sounds = {
        cut: loadAudio("sounds/cut.ogg", soundActivated),
        death: loadAudio("sounds/death.ogg", soundActivated),
        jump: loadAudio("sounds/jump.ogg", soundActivated),
        music: loadAudio("sounds/music.ogg", musicActivated)
    };

    let animationSmoke = new PersonalAnimation(longRepaintsPerFrame,
        [loadImage("images/objectDestruction.png")]
    );

    let animationSaltoIzq = new PersonalAnimation(shortRepaintsPerFrame,
        [loadImage("images/character/player_jump_izq.png")]
    );
    let animationSaltoDer = new PersonalAnimation(shortRepaintsPerFrame,
        [loadImage("images/character/player_jump_der.png")]
    );

    let animationParedEasyDer = new PersonalAnimation(longRepaintsPerFrame,
        [loadImage("images/obstacles/wallEasyDer.png")]
    );
    let animationParedMidDer = new PersonalAnimation(longRepaintsPerFrame,
        [loadImage("images/obstacles/wallMidDer.png")]
    );
    let animationParedHardDer = new PersonalAnimation(longRepaintsPerFrame,
        [loadImage("images/obstacles/wallHardDer.png")]
    );
    let animationParedHellDer = new PersonalAnimation(longRepaintsPerFrame,
        [loadImage("images/obstacles/wallHellDer.png")]
    );
    let animationParedEasyIzq = new PersonalAnimation(longRepaintsPerFrame,
        [loadImage("images/obstacles/wallEasyIzq.png")]
    );
    let animationParedMidIzq = new PersonalAnimation(longRepaintsPerFrame,
        [loadImage("images/obstacles/wallMidIzq.png")]
    );
    let animationParedHardIzq = new PersonalAnimation(longRepaintsPerFrame,
        [loadImage("images/obstacles/wallHardIzq.png")]
    );
    let animationParedHellIzq = new PersonalAnimation(longRepaintsPerFrame,
        [loadImage("images/obstacles/wallHellIzq.png")]
    );

    animations = {
        character_walk_izq: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/character/player_walk_izq_1.png"),
                loadImage("images/character/player_walk_izq_2.png"),
                loadImage("images/character/player_walk_izq_3.png"),
                loadImage("images/character/player_walk_izq_4.png"),
                loadImage("images/character/player_walk_izq_5.png"),
                loadImage("images/character/player_walk_izq_6.png")
            ]
        ),
        character_jumping_izq: animationSaltoIzq,
        character_land_izq: new PersonalAnimation(shortRepaintsPerFrame,
            [
                loadImage("images/character/player_jump_izq.png")
            ]
        ),
        character_walk_der: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/character/player_walk_der_1.png"),
                loadImage("images/character/player_walk_der_2.png"),
                loadImage("images/character/player_walk_der_3.png"),
                loadImage("images/character/player_walk_der_4.png"),
                loadImage("images/character/player_walk_der_5.png"),
                loadImage("images/character/player_walk_der_6.png")
            ]
        ),
        character_jumping_der: animationSaltoDer,
        character_land_der: animationSaltoDer,
        character_air_der: new PersonalAnimation(infiniteRepaintsPerFrame,
            [loadImage("images/character/player_air_der.png")]
        ),
        character_air_izq: new PersonalAnimation(infiniteRepaintsPerFrame,
            [loadImage("images/character/player_air_izq.png")]
        ),
        character_death: new PersonalAnimation(shortRepaintsPerFrame,
            [
                loadImage("images/character/player_death_2.png")
            ]
        ),
        character_death_fall: new PersonalAnimation(infiniteRepaintsPerFrame,
            [loadImage("images/character/player_death_2.png")]
        ),
        obstacle_wall_right: {
            easy: {
                normal: animationParedEasyDer,
                destroy: animationParedEasyDer
            },
            mid: {
                normal: animationParedMidDer,
                destroy: animationParedMidDer
            },
            hard: {
                normal: animationParedHardDer,
                destroy: animationParedHardDer
            },
            hell: {
                normal: animationParedHellDer,
                destroy: animationParedHellDer
            }
        },
        obstacle_wall_left: {
            easy: {
                normal: animationParedEasyIzq,
                destroy: animationParedEasyIzq
            },
            mid: {
                normal: animationParedMidIzq,
                destroy: animationParedMidIzq
            },
            hard: {
                normal: animationParedHardIzq,
                destroy: animationParedHardIzq
            },
            hell: {
                normal: animationParedHellIzq,
                destroy: animationParedHellIzq
            }
        },
        obstacle_objects: [
            {
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [loadImage("images/obstacles/Rock1.png")]
                ),
                destroy: animationSmoke
            },
            {
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [loadImage("images/obstacles/Rock2.png")]
                ),
                destroy: animationSmoke
            },
            {
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [loadImage("images/obstacles/Rock3.png")]
                ),
                destroy: animationSmoke
            },
            {
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [loadImage("images/obstacles/Rock4.png")]
                ),
                destroy: animationSmoke
            }
        ],
        cut_objects: [
            {//Bamboo
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [loadImage("images/objects/Bamboo.png")]
                ),
                destroy: animationSmoke
            },
            {//LightBulb
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [loadImage("images/objects/LightBulb.png")]
                ),
                destroy: animationSmoke
            },
            {//Coin
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [loadImage("images/objects/Coin.png")]
                ),
                destroy: animationSmoke
            },
            {//Cloth
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [loadImage("images/objects/Cloth.png")]
                ),
                destroy: animationSmoke
            },
            {//Table
                normal: new PersonalAnimation(infiniteRepaintsPerFrame,
                    [loadImage("images/objects/Table.png")]
                ),
                destroy: animationSmoke
            }
        ]
    };
}

function loadImage(src_) {
    let img = new Image();
    img.addEventListener("load", resourceLoaded);
    img.addEventListener("error", function () {
        console.log("COULD NOT LOAD IMAGE: " + src_);
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
            console.log("COULD NOT LOAD AUDIO: " + src_);
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
        $(document).bind("keypress", function (e) {
            if (e.which == 32) {//space bar
                showGame();
            }
        });
    }
}

function showGame() {
    $("#loadingGame").hide();
    game.canvas.style.display = "block";
    game.pointsText.css({ display: "block" });
    game.comboText.css({ display: "block" });
    game.lineMin.css({ display: "block" });
    game.lineMax.css({ display: "block" });
    game.startGame();

}

function checkSoundAndPlay(sound_) {
    if (soundActivated) {
        sound_.play();
    }
}