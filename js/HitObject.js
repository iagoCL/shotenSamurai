class HitObject {
    constructor(ctx_, relativePosY_, relativePosX_, game_, objectSprite_, objectSpriteCut_, character_, isBreakable_, celerity_) {
        //todo: type wall, cut or normal
        this.relativeWidth = 0.3;
        this.aspectRatio = 0.9;

        this.relativePosY =relativePosY_;
        this.relativePosX =relativePosX_;

        this.game = game_;//todo: use to remove destroyed Objects, and end game
        this.character = character_;//todo: use detect collision

        this.objectSpriteCut = objectSpriteCut_;
        this.objectSprite = objectSprite_;
        this.acualAnim = this.objectSprite;
        this.ctx = ctx_;

        this.framesRestantes = this.actualAnim.repaintsPerFrame;
        this.animFrame = 0;
        this.acualImag = this.acualAnim.images[this.animFrame];

        this.offSetRadius=0.3; //Offset radius to calculate if an item should be created
        this.collisionRadius=0.1; //Actual collision radius, to hit the character
        this.isBreakable=isBreakable_; //To know if the character is able to destroy it

        this.celerity=celerity_; //TODO: Waiting for physics . The speed at which the item falls
    }
    resize(width_,height_) {
        this.width = width_*this.relativeWidth;
        this.height = this.width*this.aspectRatio;
        this.canvasWidth = width_;
        this.canvasHeight = height_;
        this.drawPosX = this.relativePosX * this.canvasWidth;
        this.drawPosY = this.relativePosY*height_;
        this.textPos = width_-35;
    }
    repaint() {
        --this.framesRestantes;
        if(this.framesRestantes == 0)
        {
            this.animFrame=(this.animFrame+1)%this.acualAnim.num_frames;
            this.framesRestantes  = this.actualAnim.repaintsPerFrame;
            this.acualImag = this.acualAnim.images[this.animFrame];
        }
        this.ctx.drawImage(this.acualImag, this.drawPosX, this.drawPosY, this.width, this.height);
        //todo: destoy if animation destroy end
        //todo: simetria con menos en width y mas thi.width en x
    }
    update() {
        //todo: avanzar
        //todo: see collision con character
        //todo: sumar puntos/acabar partida si procede
    }
    collision(){
        if(this.isBreakable){
            
            //Destroy object, add points
        }else{
            //Kill player, end game
        }
    }
}