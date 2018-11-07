var images;
var imagesLoaded = false;

function boot() {
    if(imagesLoaded)
    {
        return images;
    }
    const defaultRepaintsPerFrame = 12;
    imagesLoaded = true;
    images = {
        scene_easy: loadImage("images/fondo-easy.jpg"),
        scene_mid: loadImage("images/fondo-mid.jpg"),
        scene_hard: loadImage("images/fondo-hard.jpg"),
        character_walk_izq: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_walk_izq_1.png"),
                loadImage("images/personaje/player_walk_izq_2.png")
            ]
        ),
        character_jumping_izq: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_walk_izq_2.png"),
                loadImage("images/personaje/player_jump_izq.png")
            ]
        ),
        character_walk_der: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_walk_der_1.png"),
                loadImage("images/personaje/player_walk_der_2.png")
            ]
        ),
        character_jumping_der: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_walk_der_2.png"),
                loadImage("images/personaje/player_jump_der.png")
            ]
        ),
        character_air: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_air.png")
            ]
        ),
        character_death: new PersonalAnimation(defaultRepaintsPerFrame,
            [
                loadImage("images/personaje/player_death_1.png"),
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
        )
    };
    return images;
}
function loadImage(src_) {
    let img = new Image();
    img.onload = function () {
    };
    img.src = src_;
    return img;
}
