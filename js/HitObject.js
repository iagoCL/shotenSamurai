/*exported HitObject*/
class HitObject {
    constructor(ctx_, relativePosY_, relativePosX_, objectSprite_, 
        objectSpriteCut_, objectSpriteCutted_, character_, isBreakable_, celerity_) {
        //todo: type wall, cut or normal
        this.relativeWidth = 0.2;
        this.aspectRatio = 0.9;
        this.offSetRadius=0.10; //Offset radius to calculate if an item should be created
        this.isDestroyed=false;

        this.relativePosX=relativePosX_;
        this.relativePosY=relativePosY_;
        
        this.character = character_;//todo: use detect collision

        this.objectSpriteCut = objectSpriteCut_.clone();
        this.actualAnim = this.objectSprite = objectSprite_.clone();
        this.objectSpriteCutted = objectSpriteCutted_.clone();

        this.ctx = ctx_;    
        this.collisionRadius=0.1; //Actual collision radius, to hit the character. Not needed?
        this.isBreakable=isBreakable_; //To know if the character is able to destroy it
        this.celerity=celerity_; //TODO: Waiting for physics . The speed at which the item falls
        this.destroyedCelerity = 1.8*this.celerity;

        this.actualAnim.restart();
    }
 
    
    
    resize(width_,height_) {
        this.width = width_*this.relativeWidth;
        this.height = this.width*this.aspectRatio;
        this.canvasWidth = width_;
        this.canvasHeight = height_;
        this.textPos = width_-35;
    }
    repaint() {
        this.actualAnim.paint(this.ctx, this.relativePosX * this.canvasWidth, this.relativePosY * this.canvasHeight, this.width, this.height);
    }
    update() {
        if(this.isDestroyed){
            this.relativePosY+=this.destroyedCelerity;
        }
        else{
            this.relativePosY+=this.celerity;
            this.checkCollision();
        }

        //todo: see collision con character
        //todo: sumar puntos/acabar partida/poner animacion destuir si procede
    }

    checkCollision(){
        let oxPos=this.relativePosX*this.canvasWidth;
        let cxPos=this.character.relativePosX*this.canvasWidth;
        let oyPos=this.relativePosY*this.canvasHeight;
        let cyPos=this.character.relativePosY*this.canvasHeight;

        if(oxPos < cxPos + this.character.width && oxPos + this.width > cxPos &&
           oyPos < cyPos + this.character.height && oyPos + this.height > cyPos){
            this.collision();
        }

        
    }

    collision(){
        if(this.isBreakable){
            this.character.sumarPuntos(20);	    
        }else{
            this.character.kill();
        }
        this.objectSpriteCut.restartAndDo(function(){
            this.isDestroyed=true;
            this.objectSpriteCutted.restart();
            this.actualAnim = this.objectSpriteCutted;
        }.bind(this));
        this.actualAnim = this.objectSpriteCut;
    }
}
