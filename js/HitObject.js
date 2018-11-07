/*exported HitObject*/
class HitObject {
    constructor(ctx_, relativePosY_, relativePosX_, game_, objectSprite_, objectSpriteCut_, character_) {
        //todo: type wall, cut or normal
        this.relativeWidth = 0.3;
        this.aspectRatio = 0.9;

        this.relativePosY =relativePosY_;
        this.relativePosX =relativePosX_;

        this.game = game_;//todo: use to remove destroyed Objects, and end game
        this.character = character_;//todo: use detect collision

        this.objectSpriteCut = objectSpriteCut_.clone();
        this.objectSprite = objectSprite_.clone();
        this.acualAnim = this.objectSprite;
        this.ctx = ctx_;

        this.acualAnim.restart();
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
        //todo: avanzar
        //todo: see collision con character
        //todo: sumar puntos/acabar partida/poner animacion destuir si procede
    }
}