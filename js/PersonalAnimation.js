/*exported PersonalAnimation */
class PersonalAnimation {
    constructor(repaintsPerFrame_, images_) {
        this.images = images_;
        this.num_frames = images_.length;
        this.repaintsPerFrame = repaintsPerFrame_;
    }
    restart() {
        this.remainingFrames = this.repaintsPerFrame;
        this.animFrame = 0;
        this.actualImag = this.images[this.animFrame];
        this.aspectRatio = this.actualImag.height / this.actualImag.width;
        this.paint = this.basicPaint;
    }
    restartAndDo(endAnimationFunction_) {
        this.remainingFrames = this.repaintsPerFrame;
        this.animFrame = 0;
        this.actualImag = this.images[this.animFrame];
        this.aspectRatio = this.actualImag.height / this.actualImag.width;
        this.endAnimationFunction = endAnimationFunction_;
        this.paint = this.complexPaint;
    }
    clone() {
        return new PersonalAnimation(this.repaintsPerFrame, this.images);
    }
    complexPaint(ctx, drawPosX, drawPosY, width, height) {
        if (--this.remainingFrames == 0) {
            if (++this.animFrame >= this.num_frames) {
                this.endAnimationFunction();
            }
            else {
                this.remainingFrames = this.repaintsPerFrame;
                this.actualImag = this.images[this.animFrame];
            }
        }
        ctx.drawImage(this.actualImag, drawPosX, drawPosY, width, height);
    }
    basicPaint(ctx, drawPosX, drawPosY, width, height) {
        if (--this.remainingFrames == 0) {
            this.animFrame = (this.animFrame + 1) % this.num_frames;
            this.remainingFrames = this.repaintsPerFrame;
            this.actualImag = this.images[this.animFrame];
        }
        ctx.drawImage(this.actualImag, drawPosX, drawPosY, width, height);
    }
}