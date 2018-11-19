/*global Stage Character animations images sounds musicActivated*/
/*exported MainGame*/
const dificulty = {
    EASY: 0,
    MEDIUM: 1,
    HARD: 2,
    HELL: 3,
};

const levelPoints = {
    MEDIUM: 80,
    HARD: 180,
    HELL: 450,
};

class MainGame {
    constructor() {
        this.aspectRatio = 2.1;
        this.paintRefresh = 25;
        this.logicRefresh = 12;
        this.canvas = document.getElementById("mainGame");
        this.loadingProgress = document.getElementById("loadingProgress");
        this.ctx = this.canvas.getContext("2d");
    }

    startLogic(){
        this.actualLevel = dificulty.EASY;
        this.actualCutImage = images.obstacle_cut_easy;
        this.actualHitImage = images.obstacle_hit_easy;
        this.actualCutImageDeath = images.obstacle_hit_easy;
        this.stage = new Stage(this.ctx, images.scene_start, images.scene_easy);
        this.character = new Character(this.ctx, animations.character_walk_izq,animations.character_jumping_izq,animations.character_land_izq,animations.character_walk_der,animations.character_jumping_der,animations.character_land_der,animations.character_air_izq,animations.character_air_der,animations.character_death,animations.character_death_fall,sounds.jump,sounds.death);
        this.arrayObjects = [];
    }
    startGame(){
        this.startLogic();
        window.addEventListener("resize",this.resizeCanvas.bind(this), false);
        this.resizeCanvas();
        this.repaint();
        if(musicActivated){
            sounds.music.loop = true;
            sounds.music.play();
        }
        this.paintInterval = setInterval(this.repaint.bind(this), this.paintRefresh);
        this.logicInterval = setInterval(this.updateGameLogic.bind(this), this.logicRefresh);
    }
    
    updateGameLogic(){
        //let logicStart = (new Date()).getMilliseconds();//Debug performance
        this.stage.update();
        this.character.update();
        this.arrayObjects.forEach(function(element) {
            element.update();
        });
        //todo: Generar nuevos hitObject

        /**Debug performance*
    	let oldLogic = this.lastLogic
    	this.lastLogic = (new Date()).getMilliseconds();
	    console.log("lastLogic: "+this.lastLogic+ " logicIterval: "+(this.lastLogic-oldLogic)+" logicDuration: "+(this.lastLogic-logicStart));//*/
    }

    nextLevel(actualPoints_){
        if(this.actualLevel == dificulty.EASY && actualPoints_>levelPoints.MEDIUM){
            this.actualLevel = dificulty.MEDIUM;
            this.actualCutImage = images.obstacle_cut_mid;
            this.actualHitImage = images.obstacle_hit_mid;
            this.actualCutImageDeath = images.obstacle_hit_mid;
            this.stage.changeImg(images.scene_easyToMid,images.scene_mid);
        }
        else if(this.actualLevel == dificulty.MEDIUM && actualPoints_>levelPoints.HARD){
            this.actualLevel = dificulty.HARD;
            this.actualCutImage = images.obstacle_cut_hard;
            this.actualHitImage = images.obstacle_hit_hard;
            this.actualCutImageDeath = images.obstacle_hit_hard;
            this.stage.changeImg(images.scene_midToHard,images.scene_hard);
        }
        else if(this.actualLevel == dificulty.HARD && actualPoints_>levelPoints.HELL){
            this.actualLevel = dificulty.HELL;
            this.actualCutImage = images.obstacle_cut_hell;
            this.actualHitImage = images.obstacle_hit_hell;
            this.actualCutImageDeath = images.obstacle_hit_hell;
            this.stage.changeImg(images.scene_hardToHell,images.scene_hell);
        }
    }
    
    endGame(){
        clearInterval(this.paintInterval);
        clearInterval(this.logicInterval);
        sessionStorage.setItem("ultimaPuntuacion",this.character.points);
        location.href = "gameOver.html";

    }
    
    repaint(){
        //let paintStart = (new Date()).getMilliseconds();//Debug performance
        this.stage.repaint();
        this.character.repaint();
        this.arrayObjects.forEach(function(element) {
            element.repaint();
        });
        /**Debug performance*
    	let oldPaint = this.lastPaint;
    	this.lastPaint = (new Date()).getMilliseconds();
    	console.log("lastPaint: "+this.lastPaint+ " paintIterval: "+(this.lastPaint-oldPaint)+" paintDuration: "+(this.lastPaint-paintStart));//*/
    }
    resizeCanvas( ) {
        this.canvasWidth = 0.985*window.innerWidth;
        this.canvasHeight = 0.985*window.innerHeight;       
        let canvasWidthB = this.canvasHeight/this.aspectRatio;   
        let canvasHeightB = this.canvasWidth*this.aspectRatio;
        if(this.canvasWidth>canvasWidthB)
        {
            this.canvasWidth=Math.floor(canvasWidthB);
            this.canvasHeight=Math.floor(this.canvasHeight);
        }
        else 
        {
            this.canvasHeight=Math.floor(canvasHeightB);
            this.canvasWidth=Math.floor(this.canvasWidth);
        }
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.stage.resize(this.canvasWidth,this.canvasHeight);
        this.character.resize(this.canvasWidth,this.canvasHeight);
        this.arrayObjects.forEach(function(element) {
            element.resize(this.canvasWidth,this.canvasHeight);
        });
        //console.log("resize to w: "+canvas.width + " h: "+canvas.height);
    }
}
