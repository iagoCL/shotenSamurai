/*exported Character */
class Character {
    constructor(ctx_, nextLevel, character_walk_izq, character_jumping_izq, character_land_izq,character_walk_der,character_jumping_der,character_land_der,character_air_izq,character_air_der, character_death,jump_sound,death_sound) {
        
        this.relativePosYInicial = this.relativePosY = 0.85;
        this.relativePosYMaximo = 0.72;

        this.relativePosXIzq = this.relativePosX = 0.25;
        this.relativePosXDer = 0.66;

        this.relativeCelerityX = 0.015;
        this.relativeCelerityYJump = -0.003;
        this.relativeCelerityY = 0.0009;

        this.relativeWidth = 0.09;
        this.aspectRatio = 0.9;

        this.points = 0;
        this.nextLevel = nextLevel;
        this.character_walk_izq = character_walk_izq;
        this.character_jumping_izq = character_jumping_izq;
        this.character_walk_der = character_walk_der;
        this.character_jumping_der = character_jumping_der;
        this.character_air_der = character_air_der;
        this.character_air_izq = character_air_izq;
        this.character_land_der = character_land_der;
        this.character_land_izq = character_land_izq;
        this.character_death = character_death;
        this.actualAnim = this.character_walk_izq;
        this.jump_sound = jump_sound;
        this.death_sound = death_sound;
        this.ctx = ctx_;
        this.cambiandoLado = false;
        this.estaIZQ = true;

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
        if(!this.cambiandoLado)
        {
            console.log("cambiando lado");
            if(this.estaIZQ){
                this.character_jumping_izq.restartAndDo(function(){
                    this.character_air_izq.restart();
                    this.actualAnim = this.character_air_izq;
                    this.cambiandoLado = true;
                    this.update();
                }.bind(this));
                this.actualAnim= this.character_jumping_izq; 
            }else{
                this.character_jumping_der.restartAndDo(function(){
                    this.character_air_der.restart();
                    this.actualAnim = this.character_air_der;
                    this.cambiandoLado = true;
                    this.update();
                }.bind(this));
                this.actualAnim= this.character_jumping_der; 
            }
            this.jump_sound.play();
        }
    }

    repaint() {
        this.actualAnim.paint(this.ctx, Math.ceil(this.relativePosX * this.canvasWidth), Math.ceil(this.relativePosY * this.canvasHeight), this.width, this.height);
        
        this.ctx.fillText(" "+Math.floor(this.points),this.textPosX,this.textPosY);
    }
    update() {
        this.sumarPuntos(0.08);
        if(this.cambiandoLado){
            //todo: cambiando lado paulatino

            //maximo y salto
            //minimo y muerte

            //reproducir 1 vez anim salto marcha atras
            //cambiar a anim caminar

            //console.log("x: "+this.relativePosX+" y: "+this.relativePosY+" b: "+this.estaIZQ);
            if( this.estaIZQ){
                if(this.relativePosX<this.relativePosXDer){
                    this.relativePosY += this.relativeCelerityYJump;
                    this.relativePosX += this.relativeCelerityX;
                }
                else {
                    this.relativePosX=this.relativePosXDer;
                    this.estaIZQ = false;                    
                    this.cambiandoLado = false;
                    this.character_land_der.restartAndDo(function(){
                        this.character_walk_der.restart();
                        this.actualAnim = this.character_walk_der;
                        this.update();
                    }.bind(this));
                    this.actualAnim= this.character_land_der;
                }
            }
            else if(this.relativePosX>this.relativePosXIzq){
                this.relativePosY += this.relativeCelerityYJump;
                this.relativePosX -= this.relativeCelerityX;
            }
            else {
                this.relativePosX=this.relativePosXIzq;
                this.estaIZQ = true;
                this.cambiandoLado = false;
                this.character_land_izq.restartAndDo(function(){
                    this.character_walk_izq.restart();
                    this.actualAnim = this.character_walk_izq;
                    this.update();
                }.bind(this));
                this.actualAnim= this.character_land_izq;
            }
        }
        else if(this.relativePosY>=this.relativePosYInicial){
            this.relativePosY=this.relativePosYInicial;
        } else {
            this.relativePosY += this.relativeCelerityY;
        }
    }

    sumarPuntos(points_){
        this.points += points_;
        this.nextLevel(this.points);
    }
}
