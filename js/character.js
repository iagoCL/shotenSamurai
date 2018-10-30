class Character {
    constructor(ctx_, nextLevel ,character_walk, character_jumping, character_air, character_death) {
        this.relativePosY = 0.8;
        this.relativeWidth = 0.3;
        this.aspectRatio = 0.9;
        this.relativePosX = 0;
        this.repaintsPerFrame = 12;
        this.points = 0;
        this.nextLevel = nextLevel;
        this.character_walk = character_walk;
        this.character_jumping = character_jumping;
        this.character_air = character_air;
        this.character_death = character_death;
        this.acualAnim = this.character_walk;
        this.ctx = ctx_;
        this.cambiandoLado = false;
        this.estaIZQ = true;

        this.framesRestantes = this.repaintsPerFrame;
        this.animFrame = 0;
        this.acualImag = this.acualAnim.images[this.animFrame];
    }
    resize(width_,height_) {
        this.width = width_*this.relativeWidth;
        this.height = this.width*this.aspectRatio;
        this.canvasWidth = width_;
        this.canvasHeight = height_;
        this.textPos = width_-35;
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
            this.animFrame=(this.animFrame+1)%this.acualAnim.num_frames;
            this.framesRestantes  = this.repaintsPerFrame;
            this.acualImag = this.acualAnim.images[this.animFrame];
        }
        this.drawPosX = this.relativePosX * this.canvasWidth;
        this.drawPosY = this.relativePosY*this.canvasHeight;
        //todo: simetria con menos en width y mas thi.width en x
        this.ctx.drawImage(this.acualImag, this.drawPosX, this.drawPosY, this.width, this.height);
        
        this.ctx.font = "32px serif";
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "#ffeedd";
        this.ctx.fillText(" "+Math.floor(this.points),this.textPos,25);
    }
    update() {
        this.sumarPuntos(0.08);
        if(this.cambiandoLado){
            //todo: cambiando lado paulatino
            if( this.estaIZQ){
                this.estaIZQ = false;
                this.relativePosX=0.95;
            }
            else
            {
                this.estaIZQ = true;
                this.relativePosX=0.05;
            }
            this.cambiandoLado = false;
        }
        
    }
    sumarPuntos(points_){
        this.points += points_;
        this.nextLevel(this.points);
    }
}