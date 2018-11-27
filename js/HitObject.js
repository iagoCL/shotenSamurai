/*exported HitObject*/
/*global game */
class HitObject {
    constructor(ctx_, relativePosY_, relativePosX_, objectSprite_, character_, isBreakable_, celerity_) {
        //todo: type wall, cut or normal
        this.relativeWidth = 0.1;
        this.offSetRadius = 0.07; //Offset radius to calculate if an item should be created
        this.isDestroyed = false;

        this.relativePosX = relativePosX_;
        this.relativePosY = relativePosY_;

        this.character = character_;//todo: use detect collision

        this.actualAnim = this.objectSprite = objectSprite_.normal.clone();
        this.objectSpriteDestroyed = objectSprite_.destroy.clone();

        this.ctx = ctx_;
        this.collisionRadius = 0.1; //Actual collision radius, to hit the character. Not needed?
        this.isBreakable = isBreakable_; //To know if the character is able to destroy it
        this.celerity = celerity_; //TODO: Waiting for physics . The speed at which the item falls

        this.actualAnim.restart();
    }



    resize(width_, height_) {
        this.width = Math.ceil(width_ * this.relativeWidth);
        this.height = Math.ceil(this.width * this.actualAnim.aspectRatio);
        this.canvasWidth = width_;
        this.canvasHeight = height_;
        this.textPos = width_ - 35;
    }
    repaint() {
        this.actualAnim.paint(this.ctx, this.relativePosX * this.canvasWidth, this.relativePosY * this.canvasHeight, this.width, this.height);
    }
    update() {
        this.relativePosY += this.celerity;
        this.checkCollision();

        //todo: see collision con character
        //todo: sumar puntos/acabar partida/poner animacion destuir si procede
    }

    checkCollision() {
        let oxPos = this.relativePosX * this.canvasWidth;
        let cxPos = this.character.relativePosX * this.canvasWidth;
        let oyPos = this.relativePosY * this.canvasHeight;
        let cyPos = this.character.relativePosY * this.canvasHeight;

        if (oxPos < cxPos + this.character.width * 0.5 && oxPos + this.width * 0.8 > cxPos &&
            oyPos < cyPos + this.character.height * 0.5 && oyPos + this.height * 0.8 > cyPos) {
            this.collision();
        }


    }

    collision() {
        if (this.isBreakable) {
            game.sumarPuntos(game.pointsOnObstacleClear());
        } else {
            this.character.kill();
        }
        this.objectSpriteDestroyed.restartAndDo(function () {
            this.isDestroyed = true;
        }.bind(this));
        this.height = Math.ceil(this.width * this.objectSpriteDestroyed.aspectRatio);
        this.actualAnim = this.objectSpriteDestroyed;
    }
}
