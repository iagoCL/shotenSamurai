/*exported Stage */
class Stage {
    constructor(ctx_, imgStart_, imgLevel_) {
        this.relativePosY = 1;
        this.vel = 0.008;
        this.img = imgStart_;
        this.img2 = this.img3 = this.img4 =imgLevel_;
        this.ctx = ctx_;
    }
    resize(width_, height_) {
        this.width = width_;
        this.height = height_;
    }
    changeImg(img1_,img2_) {
        this.img3 = img1_;
        this.img4 = img2_;
    }
        
    repaint() {
        let sHeight = Math.floor(this.relativePosY * this.img.height);
        let dy = Math.floor(this.relativePosY * this.height);
        let dy2 = this.height - dy;
        let sHeight2 = this.img.height - sHeight;
        //console.log("width: "+this.width+" iwidth: "+this.img.width+" sheight: "+sHeight+" sheight2: "+sHeight2+" dy: "+dy+" dy2: "+dy2);
        if(sHeight2>0 && dy2>0){
            this.ctx.drawImage(this.img2, 0, sHeight, this.img2.width, sHeight2, 0, 0, this.width, dy2);
        }
        if(sHeight>0 && dy>0){
            this.ctx.drawImage(this.img, 0, 0, this.img.width, sHeight, 0, dy2, this.width, dy);
        }
    }
    update() {
        this.relativePosY -= this.vel;
        if (this.relativePosY <= 0) {
            this.img = this.img2;
            this.img2 = this.img3;
            this.img3 = this.img4;
            this.relativePosY = 1;
        }
    }
}
