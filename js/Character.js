/*exported Character */
/*global checkSoundAndPlay game*/
class Character {
    constructor(ctx_, character_walk_izq, character_jumping_izq, character_land_izq, character_walk_der, character_jumping_der, character_land_der, character_air_izq, character_air_der, character_death, character_death_fall, jump_sound, death_sound) {
        this.relativePosYMin = 0.84;
        this.relativePosYMaximo = 0.12;
        this.relativePosY = 0.5*(this.relativePosYMin+this.relativePosYMaximo);

        this.relativePosXIzq = this.relativePosX = 0.26;
        this.relativePosXDer = 0.62;

        this.relativeCelerityX = 0.032;
        this.relativeCelerityYJump = -0.011;
        this.relativeCelerityY = 0.0018;
        this.deathCelerity = 2.5 * this.relativeCelerityY;

        this.relativeWidth = 0.12;

        this.character_walk_izq = character_walk_izq;
        this.character_jumping_izq = character_jumping_izq;
        this.character_walk_der = character_walk_der;
        this.character_jumping_der = character_jumping_der;
        this.character_air_der = character_air_der;
        this.character_air_izq = character_air_izq;
        this.character_land_der = character_land_der;
        this.character_land_izq = character_land_izq;
        this.character_death = character_death;
        this.character_death_fall = character_death_fall;
        this.actualAnim = this.character_walk_izq;
        this.jump_sound = jump_sound;
        this.death_sound = death_sound;
        this.ctx = ctx_;
        this.cambiandoLado = false;
        this.estaIZQ = true;
        this.chosedMovement = this.basicMovement;
        this.isDeath=false;
        this.actualAnim.restart();

        $(document).unbind("click").bind("mousedown",this.cambiarLado.bind(this));
        $(document).unbind("keypress").bind("keypress", function (e) {
            if (e.which == 32) {//space bar
                this.cambiarLado();
            }
        }.bind(this));
    }
    resize(width_, height_) {
        this.width = Math.ceil(width_ * this.relativeWidth);
        this.height = Math.ceil(this.width * this.actualAnim.aspectRatio);
        this.canvasWidth = width_;
        this.canvasHeight = height_;
        this.textPosX = this.canvasWidth * 0.88;
        this.textPosY = this.canvasHeight * 0.05;

    }

    cambiarLado() {
        if (!this.cambiandoLado && this.relativePosY > this.relativePosYMaximo) {
            //console.log("cambiando lado");
            if (this.estaIZQ) {
                this.character_jumping_izq.restartAndDo(function () {
                    this.cambiandoLado = true;
                    this.chosedMovement = this.cambiandoLadoIzq;
                    this.character_air_izq.restart();
                    this.height = Math.ceil(this.width * this.character_air_izq.aspectRatio);
                    this.actualAnim = this.character_air_izq;
                    this.update();
                }.bind(this));
                this.height = Math.ceil(this.width * this.character_jumping_izq.aspectRatio);
                this.actualAnim = this.character_jumping_izq;
            } else {
                this.character_jumping_der.restartAndDo(function () {
                    this.cambiandoLado = true;
                    this.chosedMovement = this.cambiandoLadoDer;
                    this.character_air_der.restart();
                    this.height = Math.ceil(this.width * this.character_air_der.aspectRatio);
                    this.actualAnim = this.character_air_der;
                    this.update();
                }.bind(this));
                this.height = Math.ceil(this.width * this.character_jumping_der.aspectRatio);
                this.actualAnim = this.character_jumping_der;
            }
            checkSoundAndPlay(this.jump_sound);
        }
    }
    repaint() {
        this.actualAnim.paint(this.ctx, Math.ceil(this.relativePosX * this.canvasWidth), Math.ceil(this.relativePosY * this.canvasHeight), this.width, this.height);
    }
    basicMovement() {
        if (this.relativePosY >= this.relativePosYMin) {
            this.kill();
        } else {
            this.relativePosY += this.relativeCelerityY;
        }
    }
    cambiandoLadoIzq() {
        if (this.relativePosX < this.relativePosXDer) {
            this.relativePosY += this.relativeCelerityYJump;
            this.relativePosX += this.relativeCelerityX;
        }
        else {
            this.relativePosX = this.relativePosXDer;
            this.estaIZQ = false;
            this.cambiandoLado = false;
            this.chosedMovement = this.basicMovement;
            this.character_land_der.restartAndDo(function () {
                this.character_walk_der.restart();
                this.actualAnim = this.character_walk_der;
                this.update();
            }.bind(this));
            this.height = Math.ceil(this.width * this.character_land_der.aspectRatio);
            this.actualAnim = this.character_land_der;
        }
    }
    cambiandoLadoDer() {
        if (this.relativePosX > this.relativePosXIzq) {
            this.relativePosY += this.relativeCelerityYJump;
            this.relativePosX -= this.relativeCelerityX;
        }
        else {
            this.relativePosX = this.relativePosXIzq;
            this.estaIZQ = true;
            this.cambiandoLado = false;
            this.chosedMovement = this.basicMovement;
            this.character_land_izq.restartAndDo(function () {
                this.character_walk_izq.restart();
                this.height = Math.ceil(this.width * this.character_walk_izq.aspectRatio);
                this.actualAnim = this.character_walk_izq;
                this.update();
            }.bind(this));
            this.height = Math.ceil(this.width * this.character_land_izq.aspectRatio);
            this.actualAnim = this.character_land_izq;
        }
    }
    update() {
        //console.log("x: "+this.relativePosX+" y: "+this.relativePosY+" b: "+this.estaIZQ);
        this.chosedMovement();
    }

    dying() {
        if (this.relativePosY > 1) {
            game.endGame();
        } else {
            this.relativePosY += this.deathCelerity;
        }
    }
    kill() {
        checkSoundAndPlay(this.death_sound);
        this.cambiandoLado = true;
        this.chosedMovement = this.dying;

        this.isDeath=true;

        this.character_death.restartAndDo(function () {
            this.character_death_fall.restart();
            this.height = Math.ceil(this.width * this.character_death_fall.aspectRatio);
            this.actualAnim = this.character_death_fall;
            this.update();
        }.bind(this));
        this.height = Math.ceil(this.width * this.character_death.aspectRatio);
        this.actualAnim = this.character_death;
    }
}