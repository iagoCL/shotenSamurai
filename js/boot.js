var images;
var imagesLoaded = false;

function boot() {
    if(imagesLoaded)
    {
        return images;
    }
    imagesLoaded = true;
    images = {
        scene_easy: loadImage("images/fondo-easy.jpg"),
        scene_mid: loadImage("images/fondo-mid.jpg"),
        scene_hard: loadImage("images/fondo-hard.jpg"),
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
        character_air: {
            num_frames: 1,
            images: [
                loadImage("images/personaje/personaje2.png")
            ]
        },
        character_death: {
            num_frames: 2,
            images: [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        },
        obstacle_wall:{
            num_frames: 1,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_hit_easy:{
            num_frames: 1,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_hit_mid:{
            num_frames: 1,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_hit_hard:{
            num_frames: 1,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_cut_easy:{
            num_frames: 1,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_cut_mid:{
            num_frames: 1,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_cut_hard:{
            num_frames: 1,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
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
