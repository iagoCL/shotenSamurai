/*global Stage Character animations images sounds musicActivated HitObject*/
/*exported MainGame*/
const dificulty = {
    EASY: 0,
    MEDIUM: 1,
    HARD: 2,
    HELL: 3,
};

const levelPoints = {
    MEDIUM: 100,
    HARD: 450,
    HELL: 800,
};

const PointsPerUpdate = {
    EASY: 0.08,
    MEDIUM: 0.11,
    HARD: 0.22,
    HELL: 0.35,
};
const PointsPerObstacle = {
    EASY: 20,
    MEDIUM: 30,
    HARD: 45,
    HELL: 70,
};

class MainGame {
    constructor() {
        this.aspectRatio = 2.1;
        this.paintRefresh = 25;
        this.logicRefresh = 12;
        this.obstacleRefresh = 1500; //this gonna change with difficulty
        this.lateralRefresh = 1000;
        this.canvas = document.getElementById("mainGame");
        this.pointsText = $("#gamePoints");
        this.comboText=$("#comboScore");
        this.lineaMin = $("#lineaMin");
        this.lineaMax = $("#lineaMax");
        this.loadingProgress = document.getElementById("loadingProgress");
        this.ctx = this.canvas.getContext("2d");
    }

    startLogic() {
        
        this.actualLevel = dificulty.EASY;
        this.points = 0;
        this.objectCelerity=0.01;
        this.pointsPerUpdate = PointsPerUpdate.EASY;
        this.pointsPerObstacle = PointsPerObstacle.EASY;
        this.obstacleCombo=1.0; //Needed for combos
        this.actualWallLeftObstacle = animations.obstacle_wall_right.easy;
        this.actualWallRightObstacle = animations.obstacle_wall_left.easy;
        this.stage = new Stage(this.ctx, images.scene_start, images.scene_easy);
        this.character = new Character(this.ctx, animations.character_walk_izq, animations.character_jumping_izq, animations.character_land_izq, animations.character_walk_der, animations.character_jumping_der, animations.character_land_der, animations.character_air_izq, animations.character_air_der, animations.character_death, animations.character_death_fall, sounds.jump, sounds.death);
        this.arrayObjects = [];
    }
    startGame() {
        this.startLogic();
        window.addEventListener("resize", this.resizeCanvas.bind(this), false);
        this.resizeCanvas();
        this.repaint();
        if (musicActivated) {
            sounds.music.loop = true;
            sounds.music.play();
        }
        this.paintInterval = setInterval(this.repaint.bind(this), this.paintRefresh);
        this.logicInterval = setInterval(this.updateGameLogic.bind(this), this.logicRefresh);
        this.obstacleInterval = setInterval(this.genObstacle.bind(this), this.obstacleRefresh);
        this.callGenLateralObstacle();
    }

    updateGameLogic() {
        //let logicStart = (new Date()).getMilliseconds();//Debug performance
        this.stage.update();
        this.character.update();
        this.arrayObjects.forEach(function (element) {
            //To delete items that are not on the screen
            if (element.isDestroyed) {
                this.obstacleCombo+=0.1;
                this.arrayObjects.splice(this.arrayObjects.indexOf(element), 1);
            }else if(element.relativePosY >= 1){
                if(element.isBreakable){
                    this.obstacleCombo=1.0;
                }
                this.arrayObjects.splice(this.arrayObjects.indexOf(element), 1);
            }
            else {
                element.update();
            }
        }.bind(this));
        this.sumarPuntos(this.pointsPerUpdate);

        /**Debug performance*
    	let oldLogic = this.lastLogic
    	this.lastLogic = (new Date()).getMilliseconds();
	    console.log("lastLogic: "+this.lastLogic+ " logicIterval: "+(this.lastLogic-oldLogic)+" logicDuration: "+(this.lastLogic-logicStart));//*/
    }

    //Generate lateral obstacles
    callGenLateralObstacle() {
        this.genLateralObstacle();
        this.obstacleLateral = setTimeout(this.callGenLateralObstacle.bind(this), this.lateralRefresh);
    }

    genLateralObstacle() {
        let probabilityOfSide = Math.floor(Math.random() * (101 - 0) + 0);
        let posX;
        let posY = -0.7;
        if (probabilityOfSide >= 50) {
            posX = 0.63;
            for (let i = 0; i < 10; i++) {
                if (this.arrayObjects.length <= 0 || this.checkPosition(posX, posY, this.arrayObjects)) {
                    let obstacle = new HitObject(this.ctx, posY, posX,
                        this.actualWallLeftObstacle, this.character, false, 0.008);
                    obstacle.resize(this.canvasWidth, this.canvasHeight);
                    this.arrayObjects.push(obstacle);
                    return true;
                }
                return false;
            }
        } else {
            posX = 0.26;
            for (let i = 0; i < 10; i++) {
                if (this.arrayObjects.length <= 0 || this.checkPosition(posX, posY, this.arrayObjects)) {
                    let obstacle = new HitObject(this.ctx, posY, posX,
                        this.actualWallRightObstacle, this.character, false, 0.008);
                    obstacle.resize(this.canvasWidth, this.canvasHeight);
                    this.arrayObjects.push(obstacle);
                    return true;
                }
                return false;
            }
        }
    }

    sumarPuntos(points_) {
        if(!this.character.isDeath){
            this.points += points_;
            this.nextLevel();
        }
    }
    //Need for break combos
    pointsOnObstacleClear(){
        let objPoints=this.pointsPerObstacle*this.obstacleCombo;
        return objPoints;
    }
    //Generate obstacles for the character to evade or destroy
    genObstacle() {
        let probabilityOfItem = Math.floor(Math.random() * (101 - 0)) + 0;
        let posX;
        let posY = -0.7;

        if (probabilityOfItem >= 60) {
            // Does 10 tries to generate objects
            for (var i = 0; i < 10; i++) {
                posX = Number(Math.random() * (0.53 - 0.38) + 0.38);
                posX = posX.toFixed(3);
                //El primero lo hace bien, el resto no...?
                //Al coger la posicion de la X ?    
                if (this.arrayObjects.length <= 0 || this.checkPosition(posX, posY, this.arrayObjects)) {
                    let animationChosed = animations.obstacle_objects[Math.floor(Math.random() * animations.obstacle_objects.length)];
                    let obstacle = new HitObject(this.ctx, posY, posX,
                        animationChosed, this.character, false, this.objectCelerity);
                    obstacle.resize(this.canvasWidth, this.canvasHeight);
                    this.arrayObjects.push(obstacle);
                    return true;
                }
            }
            return false;
        } else {
            for (let i = 0; i < 10; i++) {
                posX = Number(Math.random() * (0.53 - 0.38) + 0.38);
                posX = posX.toFixed(3);
                if (this.arrayObjects.length <= 0 || this.checkPosition(posX, posY, this.arrayObjects)) {
                    let animationChosed = animations.cut_objects[Math.floor(Math.random() * animations.cut_objects.length)];
                    let obstacle = new HitObject(this.ctx, posY, posX,
                        animationChosed, this.character, true, this.objectCelerity);
                    obstacle.resize(this.canvasWidth, this.canvasHeight);
                    this.arrayObjects.push(obstacle);
                    return true;
                }
            }
            return false;
        }
    }

    //Needed to check offsets of new items
    checkPosition(relativePosX_, relativePosY_, objectList_) {
        for (var i = 0; i < objectList_.length; i++) {
            let sum = objectList_[i].offSetRadius * 2;//Need to calculate offset position
            let x = relativePosX_ - objectList_[i].relativePosX;
            let y = relativePosY_ - objectList_[i].relativePosY;
            let sol = Math.sqrt((x * x) + (y * y));// Needed to calculate offset position
            if (sum > sol) {
                return false;
            }
        }
        return true;
    }

    nextLevel() {
        if (this.actualLevel == dificulty.EASY && this.points > levelPoints.MEDIUM) {
            this.actualLevel = dificulty.MEDIUM;
            this.objectCelerity=0.013;
            this.actualWallLeftObstacle = animations.obstacle_wall_right.mid;
            this.actualWallRightObstacle = animations.obstacle_wall_left.mid;
            this.pointsPerUpdate = PointsPerUpdate.MEDIUM;
            this.pointsPerObstacle = PointsPerObstacle.MEDIUM;
            this.stage.changeImg(images.scene_easyToMid, images.scene_mid);
        }
        else if (this.actualLevel == dificulty.MEDIUM && this.points > levelPoints.HARD) {
            this.actualLevel = dificulty.HARD;
            this.objectCelerity=0.016;
            this.actualWallLeftObstacle = animations.obstacle_wall_right.hard;
            this.actualWallRightObstacle = animations.obstacle_wall_left.hard;
            this.pointsPerUpdate = PointsPerUpdate.HARD;
            this.pointsPerObstacle = PointsPerObstacle.HARD;
            this.stage.changeImg(images.scene_midToHard, images.scene_hard);
        }
        else if (this.actualLevel == dificulty.HARD && this.points > levelPoints.HELL) {
            this.actualLevel = dificulty.HELL;
            this.objectCelerity=0.02;
            this.actualWallLeftObstacle = animations.obstacle_wall_right.hell;
            this.actualWallRightObstacle = animations.obstacle_wall_left.hell;
            this.pointsPerUpdate = PointsPerUpdate.HELL;
            this.pointsPerObstacle = PointsPerObstacle.HELL;
            this.stage.changeImg(images.scene_hardToHell, images.scene_hell);
        }
    }

    endGame() {
        sessionStorage.setItem("ultimaPuntuacion", this.points);
        clearInterval(this.paintInterval);
        clearInterval(this.logicInterval);
        clearInterval(this.obstacleInterval);
        location.href = "gameOver.html";
    }

    repaint() {
        //let paintStart = (new Date()).getMilliseconds();//Debug performance
        this.stage.repaint();
        this.character.repaint();
        this.arrayObjects.forEach(function (element) {
            element.repaint();
        });
        this.pointsText.html(Math.floor(this.points).toString());
        this.comboText.html("x"+this.obstacleCombo.toFixed(1));
        /**Debug performance*
    	let oldPaint = this.lastPaint;
    	this.lastPaint = (new Date()).getMilliseconds();
    	console.log("lastPaint: "+this.lastPaint+ " paintIterval: "+(this.lastPaint-oldPaint)+" paintDuration: "+(this.lastPaint-paintStart));//*/
    }
    resizeCanvas() {
        this.canvasWidth = 0.995 * window.innerWidth;
        this.canvasHeight = 0.995 * window.innerHeight;
        let canvasWidthB = this.canvasHeight / this.aspectRatio;
        let canvasHeightB = this.canvasWidth * this.aspectRatio;
        if (this.canvasWidth > canvasWidthB) {
            this.canvasWidth = Math.floor(canvasWidthB);
            this.canvasHeight = Math.floor(this.canvasHeight);
        }
        else {
            this.canvasHeight = Math.floor(canvasHeightB);
            this.canvasWidth = Math.floor(this.canvasWidth);
        }
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.stage.resize(this.canvasWidth, this.canvasHeight);
        this.character.resize(this.canvasWidth, this.canvasHeight);
        this.arrayObjects.forEach(function (element) {
            element.resize(this.canvasWidth, this.canvasHeight);
        }.bind(this));

        //paint points
        let canvasOffset = $("#mainGame").offset();
        this.pointsText.css({top: canvasOffset.top, left: canvasOffset.left});
        this.comboText.css({top: canvasOffset.top, left: canvasOffset.left+this.canvasWidth-this.comboText.width()});
        //paint lines
        this.lineaMax.css({top: (canvasOffset.top+this.canvasHeight*this.character.relativePosYMaximo), left: canvasOffset.left});
        this.lineaMin.css({top: (canvasOffset.top+this.canvasHeight*this.character.relativePosYMin+this.character.height), left: canvasOffset.left});
        this.lineaMax.attr("width", this.canvasWidth);
        this.lineaMin.attr("width", this.canvasWidth);
        
        //console.log("resize to w: "+canvas.width + " h: "+canvas.height);
    }
}
