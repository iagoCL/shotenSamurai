const dificulty = {
    EASY: 0,
    MEDIUM: 1,
    HARD: 2,
};

const levelPoints = {
    MEDIUM: 20,
    HARD: 40,
};

class MainGame {
    constructor() {
        this.images = boot();
        this.aspectRatio = 2.1;
        this.paintRefresh = 45;
        this.logicRefresh = 30;
        this.canvas = document.getElementById("mainGame");
        this.ctx = this.canvas.getContext("2d");
    }

    startLogic(){
        this.actualLevel = dificulty.EASY;
        this.actualCutImage = this.images.obstacle_cut_easy;
        this.actualHitImage = this.images.obstacle_hit_easy;
        this.actualCutImageDeath = this.images.obstacle_hit_easy;
        this.stage = new Stage(this.ctx, this.images.scene_easy);
        this.character = new Character(this.ctx, this.nextLevel.bind(this), this.images.character_walk_izq,this.images.character_jumping_izq,this.images.character_walk_der,this.images.character_jumping_der,this.images.character_air,this.images.character_death);
        this.arrayObjects = [];
    }
    startGame(){
        this.startLogic();
        window.addEventListener("resize",this.resizeCanvas.bind(this), false);
        this.resizeCanvas();
        this.repaint();
        this.paintInterval = setInterval(this.repaint.bind(this), this.paintRefresh);
        this.logicInterval = setInterval(this.updateGameLogic.bind(this), this.logicRefresh);
    }
    
    updateGameLogic(){
        this.stage.update();
        this.character.update();
        this.arrayObjects.forEach(function(element) {
            element.update();
        });
        //todo: Generar nuevos hitObject
    }

    nextLevel(actualPoints_){
        if(this.actualLevel == dificulty.EASY && actualPoints_>levelPoints.MEDIUM){
            this.actualLevel = dificulty.MEDIUM;
            this.actualCutImage = this.images.obstacle_cut_mid;
            this.actualHitImage = this.images.obstacle_hit_mid;
            this.actualCutImageDeath = this.images.obstacle_hit_mid;
            this.stage.changeImg(this.images.scene_mid);
        }
        else if(this.actualLevel == dificulty.MEDIUM && actualPoints_>levelPoints.HARD){
            this.actualLevel = dificulty.HARD;
            this.actualCutImage = this.images.obstacle_cut_hard;
            this.actualHitImage = this.images.obstacle_hit_hard;
            this.actualCutImageDeath = this.images.obstacle_hit_hard;
            this.stage.changeImg(this.images.scene_hard);
        }
    }
    
    endGame(){
        clearInterval(this.paintInterval);
        clearInterval(this.logicInterval);
    }
    
    repaint(){
        this.stage.repaint();
        this.character.repaint();
        this.arrayObjects.forEach(function(element) {
            element.repaint();
        });
    }
    resizeCanvas( ) {
        this.canvasWidth = 0.98*window.innerWidth;
        this.canvasHeight = 0.98*window.innerHeight;       
        let canvasWidthB = this.canvasHeight/this.aspectRatio;   
        let canvasHeightB = this.canvasWidth*this.aspectRatio;
        if(this.canvasWidth>canvasWidthB)
        {
            this.canvasWidth=canvasWidthB;
        }
        else 
        {
            this.canvasHeight=canvasHeightB;
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