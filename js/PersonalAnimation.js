class PersonalAnimation {
    constructor( repaintsPerFrame_, images_){
        this.images = images_;
        this.num_frames = images_.length;
        this.repaintsPerFrame = repaintsPerFrame_;
    }
    restart(){
        this.framesRestantes = this.repaintsPerFrame;
        this.animFrame = 0;
        this.actualImag = this.images[this.animFrame];
        this.paint = this.basicPaint;
    }
    restartAndDo(endAnimationFucntion_){
        this.framesRestantes = this.repaintsPerFrame;
        this.animFrame = 0;
        this.actualImag = this.images[this.animFrame];
        this.endAnimationFucntion = endAnimationFucntion_;
        this.paint = this.complexPaint;
    }
    clone(){
        return new PersonalAnimation(this.repaintsPerFrame,this.images);
    }
    complexPaint(ctx, drawPosX, drawPosY, width, height){
        if(--this.framesRestantes == 0)
        {
            if(++this.animFrame>this.num_frames){
                this.endAnimationFucntion();
            }
            else{
                this.framesRestantes  = this.repaintsPerFrame;
                this.actualImag = this.images[this.animFrame];
            }
        }
        ctx.drawImage( this.actualImag,drawPosX, drawPosY, width, height ); 
    }
    basicPaint(ctx, drawPosX, drawPosY, width, height){
        if(--this.framesRestantes == 0)
        {
            this.animFrame=(this.animFrame+1)%this.num_frames;
            this.framesRestantes  = this.repaintsPerFrame;
            this.actualImag = this.images[this.animFrame];
        }
        ctx.drawImage( this.actualImag,drawPosX, drawPosY, width, height );
    }
}