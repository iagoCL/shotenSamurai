class mainGame {
    constructor() {
        this.images = boot();
        this.aspectRatio = 2.1;
        this.paintRefresh = 100;
        this.logicRefresh = 50;
        this.canvas = document.getElementById("mainGame");
        this.ctx = this.canvas.getContext("2d");
        window.addEventListener("resize",this.resizeCanvas.bind(this), false);
        this.startGame( );
    }
    startGame( ){
        this.resizeCanvas( );
        this.startLogic( );
        this.repaint();
        this.paintInterval = setInterval(this.repaint.bind(this), this.paintRefresh);
        this.logicInterval = setInterval(this.updateGameLogic.bind(this), this.logicRefresh);
    }
    startLogic(){
        this.stage = new Stage(this.canvasWidth, this.canvasHeight, this.ctx, this.images.scene_easy);
    }
    
    updateGameLogic(){
        this.stage.update();
    }
    
    endGame(){
        clearInterval(this.paintInterval);
        clearInterval(this.logicInterval);
    }
    
    repaint(){
        this.stage.repaint();
        this.ctx.stroke();
    }
    resizeCanvas( ) {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;       
        let canvasWidthB = this.canvasHeight/this.aspectRatio;   
        let canvasHeightB = this.canvasWidth*this.aspectRatio;
        if(this.canvasWidth>canvasWidthB)
        {
            this.canvasWidth=canvasWidthB;
        }
        else 
        {
            this.canvasHeight=canvasHeightB;
        }
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        //console.log("resize to w: "+canvas.width + " h: "+canvas.height);
    }
}