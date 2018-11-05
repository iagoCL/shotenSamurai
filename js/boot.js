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
        character_walk_izq: {
            num_frames: 2,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/personaje/player_walk_izq_1.png"),
                loadImage("images/personaje/player_walk_izq_2.png")
            ]
        },
        character_jumping_izq: {
            num_frames: 2,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/personaje/player_walk_izq_2.png"),
                loadImage("images/personaje/player_jump_izq.png")
            ]
        },
        character_walk_der: {
            num_frames: 2,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/personaje/player_walk_der_1.png"),
                loadImage("images/personaje/player_walk_der_2.png")
            ]
        },
        character_jumping_der: {
            num_frames: 2,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/personaje/player_walk_der_2.png"),
                loadImage("images/personaje/player_jump_der.png")
            ]
        },
        character_air: {
            num_frames: 1,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/personaje/player_air.png")
            ]
        },
        character_death: {
            num_frames: 2,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/personaje/player_death_1.png"),
                loadImage("images/personaje/player_death_2.png")
            ]
        },
        obstacle_wall:{
            num_frames: 1,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_hit_easy:{
            num_frames: 1,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_hit_mid:{
            num_frames: 1,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_hit_hard:{
            num_frames: 1,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_cut_easy:{
            num_frames: 1,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_cut_mid:{
            num_frames: 1,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_cut_hard:{
            num_frames: 1,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/obstacle.png")
            ]
        },
        obstacle_cut_easy_death: {
            num_frames: 2,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        },
        obstacle_cut_mid_death: {
            num_frames: 2,
            repaintsPerFrame: defaultRepaintsPerFrame,
            images: [
                loadImage("images/personaje/personaje3.png"),
                loadImage("images/personaje/personaje4.png")
            ]
        },
        obstacle_cut_hard_death: {
            num_frames: 2,
            repaintsPerFrame: defaultRepaintsPerFrame,
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
