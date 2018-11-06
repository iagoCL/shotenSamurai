class Character {
    constructor(ctx_, nextLevel, character_walk_izq, character_jumping_izq, character_walk_der, character_jumping_der, character_air, character_death) {
        
        this.relativePosYInicial = 0.85;
        this.relativePosYMaximo = 0.72;

        this.relativePosXIzq = 0.05;
        this.relativePosXDer = 0.72;

        this.relativeWidth = 0.19;
        this.aspectRatio = 0.9;

        this.points = 0;
        this.nextLevel = nextLevel;
        this.character_walk_izq = character_walk_izq;
        this.character_jumping_izq = character_jumping_izq;
        this.character_walk_der = character_walk_der;
        this.character_jumping_der = character_jumping_der;
        this.character_air = character_air;
        this.character_death = character_death;
        this.actualAnim = this.character_walk_izq;
        this.ctx = ctx_;
        this.cambiandoLado = false;
        this.estaIZQ = true;

        this.framesRestantes = this.actualAnim.repaintsPerFrame;
        this.animFrame = 0;
        this.actualImag = this.actualAnim.images[this.animFrame];

        this.relativePosXMed = Math.floor(0.5*(this.relativePosXIzq+this.relativePosXDer));

        this.relativePosY = this.relativePosYInicial;
        this.relativePosX = this.relativePosXIzq;
    }
    resize(width_,height_) {
        this.width = width_*this.relativeWidth;
        this.height = this.width*this.aspectRatio;
        this.canvasWidth = width_;
        this.canvasHeight = height_;
        this.textPosX = this.canvasWidth*0.88;
        this.textPosY = this.canvasHeight*0.05;
        this.pointsFormat = +Math.ceil(this.canvasHeight*0.05)+"px serif";
    }

    cambiarLado()
    {
        if(!this.cambiandoLado)
        {
            console.log("cambiando lado");
            this.cambiandoLado = true;
        }
    }

    repaint() {
        --this.framesRestantes;
        if(this.framesRestantes == 0)
        {
            this.animFrame=(this.animFrame+1)%this.actualAnim.num_frames;
            this.framesRestantes  = this.actualAnim.repaintsPerFrame;
            this.actualImag = this.actualAnim.images[this.animFrame];
        }
        this.drawPosX = this.relativePosX * this.canvasWidth;
        this.drawPosY = this.relativePosY * this.canvasHeight;

        this.ctx.drawImage(this.actualImag, this.drawPosX, this.drawPosY, this.width, this.height);
        
        this.ctx.font = this.pointsFormat;
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "#ffeedd";
        this.ctx.fillText(" "+Math.floor(this.points),this.textPosX,this.textPosY);
    }
    update() {
        this.sumarPuntos(0.08);
        if(this.cambiandoLado){
            //todo: cambiando lado paulatino

            //reproducir 1 vez anim salto
            //cambiar a anim aire
            //reproducir 1 vez anim salto marcha atras
            //cambiar a anim caminar

            //aumentar x
            //aumentar y hasta el centro y luego disminuirla
            if( this.estaIZQ){
                this.estaIZQ = false;
                this.relativePosX=this.relativePosXDer;
            }
            else
            {
                this.estaIZQ = true;
                this.relativePosX=this.relativePosXIzq;
            }
            this.cambiandoLado = false;
        }
    }

    sumarPuntos(points_){
        this.points += points_;
        this.nextLevel(this.points);
    }
}