/*exported Character */
/*global checkSoundAndPlay game*/
class Character {
    constructor(ctx_, character_walk_izq, character_jumping_izq, character_land_izq,character_walk_der,character_jumping_der,character_land_der,character_air_izq,character_air_der, character_death,character_death_fall,jump_sound,death_sound) {
        
        this.relativePosYMin = 0.92;
        this.relativePosYMaximo = 0.12;
        this.relativePosY = 0.62;

        this.relativePosXIzq = this.relativePosX = 0.25;
        this.relativePosXDer = 0.66;

        this.relativeCelerityX = 0.015;
        this.relativeCelerityYJump = -0.003;
        this.relativeCelerityY = 0.0009;
        this.deathCelerity = 1.5*this.relativeCelerityY;

        this.relativeWidth = 0.09;
        this.aspectRatio = 0.9;

        this.points = 0;
        this.character_walk_izq = character_walk_izq;
        this.character_jumping_izq = character_jumping_izq;
        this.character_walk_der = character_walk_der;
        this.character_jumping_der = character_jumping_der;
        this.character_air_der = character_air_der;
        this.character_air_izq = character_air_izq;
        this.character_land_der = character_land_der;
        this.character_land_izq = character_land_izq;
        this.character_death = character_death;
        this.character_death_fall = character_death_fall;
        this.actualAnim = this.character_walk_izq;
        this.jump_sound = jump_sound;
        this.death_sound = death_sound;
        this.ctx = ctx_;
        this.cambiandoLado = false;
        this.estaIZQ = true;
        this.chosedMovement = this.basicMovement;

        this.actualAnim.restart();

        $(document).unbind("click").click(this.cambiarLado.bind(this));
    }
    resize(width_,height_) {
        this.width = Math.ceil(width_*this.relativeWidth);
        this.height = Math.ceil(this.width*this.aspectRatio);
        this.canvasWidth = width_;
        this.canvasHeight = height_;
        this.textPosX = this.canvasWidth*0.88;
        this.textPosY = this.canvasHeight*0.05;

        //paint points
        this.ctx.font = Math.ceil(this.canvasHeight*0.05)+"px serif";
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "#ffeedd";
    }

    cambiarLado()
    {
        if(!this.cambiandoLado && this.relativePosY>this.relativePosYMaximo)
        {
            //console.log("cambiando lado");
            if(this.estaIZQ){
                this.character_jumping_izq.restartAndDo(function(){
                    this.character_air_izq.restart();
                    this.actualAnim = this.character_air_izq;
                    this.cambiandoLado = true;
                    this.chosedMovement = this.cambiandoLadoIzq;
                    this.update();
                }.bind(this));
                this.actualAnim= this.character_jumping_izq; 
            }else{
                this.character_jumping_der.restartAndDo(function(){
                    this.character_air_der.restart();
                    this.actualAnim = this.character_air_der;
                    this.cambiandoLado = true;
                    this.chosedMovement = this.cambiandoLadoDer;
                    this.update();
                }.bind(this));
                this.actualAnim= this.character_jumping_der; 
            }
            checkSoundAndPlay(this.jump_sound);
        }
    }

    repaint() {
        this.actualAnim.paint(this.ctx, Math.ceil(this.relativePosX * this.canvasWidth), Math.ceil(this.relativePosY * this.canvasHeight), this.width, this.height);
        this.ctx.fillText(" "+Math.floor(this.points),this.textPosX,this.textPosY);
    }
    basicMovement(){
        if(this.relativePosY>=this.relativePosYMin){
            this.chosedMovement = function(){};
            this.kill();
        } else {
            this.relativePosY += this.relativeCelerityY;
        }
    }
    cambiandoLadoIzq(){
        if(this.relativePosX<this.relativePosXDer){
            this.relativePosY += this.relativeCelerityYJump;
            this.relativePosX += this.relativeCelerityX;
        }
        else {
            this.relativePosX=this.relativePosXDer;
            this.estaIZQ = false;                    
            this.cambiandoLado = false;
            this.chosedMovement = this.basicMovement;
            this.character_land_der.restartAndDo(function(){
                this.character_walk_der.restart();
                this.actualAnim = this.character_walk_der;
                this.update(); 
            }.bind(this));
            this.actualAnim= this.character_land_der;
        }
    }
    cambiandoLadoDer(){
        if(this.relativePosX>this.relativePosXIzq){
            this.relativePosY += this.relativeCelerityYJump;
            this.relativePosX -= this.relativeCelerityX;
        }
        else {
            this.relativePosX=this.relativePosXIzq;
            this.estaIZQ = true;
            this.cambiandoLado = false;
            this.chosedMovement = this.basicMovement;
            this.character_land_izq.restartAndDo(function(){
                this.character_walk_izq.restart();
                this.actualAnim = this.character_walk_izq;
                this.update();
            }.bind(this));
            this.actualAnim= this.character_land_izq;
        }
    }
    update() {
        this.sumarPuntos(0.08);
        //console.log("x: "+this.relativePosX+" y: "+this.relativePosY+" b: "+this.estaIZQ);
        this.chosedMovement();
    }

    sumarPuntos(points_){
        this.points += points_;
        game.nextLevel(this.points);
    }
    dying(){
        if(this.relativePosY>1){
            game.endGame();
        } else {
            this.relativePosY += this.deathCelerity;
        }
    }
    kill(){
        checkSoundAndPlay(this.death_sound);
        this.cambiandoLado = true;
        this.character_death.restartAndDo(function(){
            this.character_death_fall.restart();
            this.actualAnim = this.character_death_fall;
            this.chosedMovement = this.dying;
            this.update();
        }.bind(this));
        this.actualAnim= this.character_death; 
    }
}
