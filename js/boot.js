var images;
var imagesLoaded = false;

function boot() {
    if(imagesLoaded)
    {
        return images;
    }
    imagesLoaded = true;
    images = {
        scene_easy: loadImage("images/fondo.jpg"),
        scene_mid: loadImage("images/fondo.jpg"),
        scene_hard: loadImage("images/fondo.jpg"),
        character_walk: {
            num_frames: 2,
            images: [
                loadImage("images/personaje/personaje1.png"),
                loadImage("images/personaje/personaje2.png")
            ]
        },
        character_jumping: {
            num_frames: 2,
            images: [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        },
        character_air: loadImage("images/personaje/personaje3.png"),
        character_death: {
            num_frames: 2,
            images: [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        },
        obstacle_wall: loadImage("images/obstacle.png"),
        obstacle_hit_easy: loadImage("images/obstacle.png"),
        obstacle_hit_mid: loadImage("images/obstacle.png"),
        obstacle_hit_hard: loadImage("images/obstacle.png"),
        obstacle_cut_easy: loadImage("images/obstacle.png"),
        obstacle_cut_mid: loadImage("images/obstacle.png"),
        obstacle_cut_hard: loadImage("images/obstacle.png"),
        obstacle_cut_easy_death: {
            num_frames: 2,
            images: [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        },
        obstacle_cut_mid_death: {
            num_frames: 2,
            images: [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        },
        obstacle_cut_hard_death: {
            num_frames: 2,
            images: [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        },
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
