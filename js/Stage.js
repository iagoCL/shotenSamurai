class Stage {
    constructor(ctx_, img_) {
        this.relativePosY = 1;
        this.vel = 0.01;
        this.img = img_;
        this.img2 = img_;
        this.img3 = img_;
        this.ctx = ctx_;
    }
    resize(width_, height_) {
        this.width = width_;
        this.height = height_;
    }
    changeImg(img_) {
        this.img3 = img_;
    }
        
    repaint() {
        let sHeight = this.relativePosY * this.img.height;
        let dy = this.relativePosY * this.height;
        let dy2 = this.height - dy;
        let sHeight2 = this.img.height - sHeight;
        this.ctx.drawImage(this.img2, 0, sHeight, this.img2.width, sHeight2, 0, 0, this.width, dy2);     
        this.ctx.drawImage(this.img, 0, 0, this.img.width, sHeight, 0, dy2, this.width, dy);
    }
    update() {
        this.relativePosY -= this.vel;
        if (this.relativePosY < 0) {
            this.img = this.img2;
            this.img2 = this.img3;
            this.relativePosY = 1;
        }
    }
}