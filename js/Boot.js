/*global PersonalAnimation game updateMusicActivated updateSoundActivated soundActivated musicActivated*/
/*exported animations sounds boot images assets checkSoundAndPlay */
var images;
var animations;
var sounds;
const totalResources = 42;
var resourcesLoaded = 0;
const endLoadingProgress = " / "+totalResources;

function boot() {
    updateMusicActivated();
    updateSoundActivated();
    game.loadingProgress.innerHTML = 0+endLoadingProgress;
    const defaultRepaintsPerFrame = 12;
    const repaintsPerJumpFrame = 3;
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
    sounds={
        cut: loadAudio("sounds/cut.ogg",soundActivated),
        death: loadAudio("sounds/death.ogg",soundActivated),
        jump: loadAudio("sounds/jump.ogg",soundActivated),
        music: loadAudio("sounds/music.ogg",musicActivated)
    };

    //todo: when definitive sprites avoid duplicated loads.
    animations={
        character_walk_izq: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_walk_izq_1.png"),
                loadImage("images/personaje/player_walk_izq_2.png")
            ]
        ),
        character_jumping_izq: new PersonalAnimation(repaintsPerJumpFrame,
            [
                loadImage("images/personaje/player_jump_izq.png")
            ]
        ),
        character_land_izq: new PersonalAnimation(repaintsPerJumpFrame,
            [
                loadImage("images/personaje/player_jump_izq.png")
            ]
        ),
        character_walk_der: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_walk_der_1.png"),
                loadImage("images/personaje/player_walk_der_2.png")
            ]
        ),
        character_jumping_der: new PersonalAnimation(repaintsPerJumpFrame,
            [
                loadImage("images/personaje/player_jump_der.png")
            ]
        ),
        character_land_der: new PersonalAnimation(repaintsPerJumpFrame,
            [
                loadImage("images/personaje/player_jump_der.png")
            ]
        ),
        character_air_der: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_air_der.png")
            ]
        ),
        character_air_izq: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_air_izq.png")
            ]
        ),
        character_death: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_death_1.png"),
                loadImage("images/personaje/player_death_2.png")
            ]
        ),
        character_death_fall: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_death_2.png")
            ]
        ),
        obstacle_wall: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/obstacle.png")
            ]
        ),
        obstacle_hit_easy: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/obstacle.png")
            ]
        ),
        obstacle_hit_mid: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/obstacle.png")
            ]
        ),
        obstacle_hit_hard: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/obstacle.png")
            ]
        ),
        obstacle_hit_hell: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/obstacle.png")
            ]
        ),
        obstacle_cut_easy: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/obstacle.png")
            ]
        ),
        obstacle_cut_mid: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/obstacle.png")
            ]
        ),
        obstacle_cut_hard: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/obstacle.png")
            ]
        ),
        obstacle_cut_hell: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/obstacle.png")
            ]
        ),
        obstacle_cut_easy_death: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        ),
        obstacle_cut_mid_death: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        ),
        obstacle_cut_hard_death: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        ),
        obstacle_cut_hell_death: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        )
    };
}
function loadImage(src_) {
    let img = new Image();
    img.addEventListener("load", resourceLoaded);
    img.addEventListener("error", function ()
    {
        console.log("COULD NOT LOAD IMAGE");
    });
    img.src = src_;
    return img;
}

function loadAudio(src_,load_){
    if(load_){
        let audio = new Audio(src_);
        audio.addEventListener("canplaythrough", function () {
            resourceLoaded();
        }, false);
        audio.addEventListener("error", function ()
        {
            console.log("COULD NOT LOAD AUDIO");
        });
        audio.load();
        return audio;
    } else {
        resourceLoaded();
        return null;
    }
    
}

function resourceLoaded(){
    game.loadingProgress.innerHTML = ++resourcesLoaded+endLoadingProgress;
    //console.log("r: "+resourcesLoaded);
    if(resourcesLoaded == totalResources){
        $("#clickText").css( "visibility", "visible" );
        $(document).click(function(){
            $("#loadingGame").hide();
            game.canvas.style.display = "block";
            game.startGame();
        });
    }
}

function checkSoundAndPlay(sound_){
    if(soundActivated){
        sound_.play();
    }
}
