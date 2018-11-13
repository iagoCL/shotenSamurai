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
        this.obstacleRefresh=2000; //this gonna change with difficulty
        this.canvas = document.getElementById("mainGame");
        this.ctx = this.canvas.getContext("2d");
      //  this.arrayObjects;
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
        this.obstacleInterval=setInterval(this.genObstacle.bind(this),this.obstacleRefresh);
    }
    
    updateGameLogic(){
        this.stage.update();
        this.character.update();
        this.arrayObjects.forEach(function(element) {
            element.update();
            
        });
        //todo: Generar nuevos hitObject
    }

    //Generate obstacles for the character to evade or destroy
    genObstacle(){
        let probabilityOfItem=Math.floor(Math.random() * (101 - 0)) + 0;
        let posX;
        let posY;

        if(probabilityOfItem>=20){
            // Does 10 tries to generate objects
            for(var i=0;i<10;i++){
                posX=Number(Math.random()*(0.6-0.15)+0.15);
                posX=posX.toFixed(3);
                posY=0.2;
                //El primero lo hace bien, el resto no...?
                //Al coger la posicion de la X ?    
                if(this.arrayObjects.length<=0){
                    var obstacle=new HitObject(this.ctx,posY,posX,null,
                        this.images.obstacle_wall,this.images.obstacle_wall,
                        this.character,false,0.01);
                        obstacle.resize(this.canvasWidth,this.canvasHeight);
                        this.arrayObjects.push(obstacle);
                       
                        return true;
                }else if(this.checkPosition(posX,posY,this.arrayObjects)){
                        var obstacle=new HitObject(this.ctx,posY,posX,null,
                        this.images.obstacle_wall,this.images.obstacle_wall,
                        this.character,false,0.01);
                        obstacle.resize(this.canvasWidth,this.canvasHeight);
                        this.arrayObjects.push(obstacle);
                        
                        return true;
                }
            }
            return false;
        }else{
            //genDestructible
        }

    }
    
    //Needed to check offsets of new items
    checkPosition(relativePosX_,relativePosY_,objectList_){
        let sol; // Needed to calculate offset position
        let sum; //Need to calculate offset position
        let x;
        let y;
        for(var i=0;i<objectList_.length;i++){
            sum=objectList_[i].offSetRadius*2;
            x=relativePosX_ - objectList_[i].relativePosX;
            y=relativePosY_ - objectList_[i].relativePosY;
            sol=Math.sqrt((x*x)+(y*y));
            if(sum>sol){
                return false;
            }
         }
         return true;
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
        clearInterval(this.obstacleInterval);
    }
    
    repaint(){
        this.stage.repaint();
        this.character.repaint();
        this.arrayObjects.forEach(function(element) {
            element.repaint();
        });
    }
    resizeCanvas( ) {
        this.canvasWidth = 0.985*window.innerWidth;
        this.canvasHeight = 0.985*window.innerHeight;       
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
            console.log("hola");
            element.resize(this.canvasWidth,this.canvasHeight);
        }.bind(this));
        //console.log("resize to w: "+canvas.width + " h: "+canvas.height);
    }
}