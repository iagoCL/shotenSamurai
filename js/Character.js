/*exported Character */
/*global checkSoundAndPlay game*/
class Character {
    constructor(ctx_, character_walk_izq, character_jumping_izq, character_land_izq, character_walk_der, character_jumping_der, character_land_der, character_air_izq, character_air_der, character_death, character_death_fall, jump_sound, death_sound) {
        this.relativePosYMin = 0.78;
        this.relativePosYMax = 0.12;
        this.relativePosY = 0.5 * (this.relativePosYMin + this.relativePosYMax);

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
        this.changingSide = false;
        this.isLeft = true;
        this.selectedMovement = this.basicMovement;
        this.isDeath = false;
        this.actualAnim.restart();

        this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;

        $(document).unbind("click").bind("mousedown", this.changeSide.bind(this));
        $(document).unbind("keypress").bind("keypress", function (e) {
            if (e.which == 32) {//space bar
                this.changeSide();
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

    changeSide() {
        if (!this.changingSide && this.relativePosY > this.relativePosYMax) {
            if (this.isLeft) {
                this.character_jumping_izq.restartAndDo(function () {
                    this.changingSide = true;
                    this.selectedMovement = this.changingSideIzq;
                    this.character_air_izq.restart();
                    this.height = Math.ceil(this.width * this.character_air_izq.aspectRatio);
                    this.actualAnim = this.character_air_izq;
                    this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;
                    this.update();
                }.bind(this));
                this.height = Math.ceil(this.width * this.character_jumping_izq.aspectRatio);
                this.actualAnim = this.character_jumping_izq;
                this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;
            } else {
                this.character_jumping_der.restartAndDo(function () {
                    this.changingSide = true;
                    this.selectedMovement = this.changingSideDer;
                    this.character_air_der.restart();
                    this.height = Math.ceil(this.width * this.character_air_der.aspectRatio);
                    this.actualAnim = this.character_air_der;
                    this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;
                    this.update();
                }.bind(this));
                this.height = Math.ceil(this.width * this.character_jumping_der.aspectRatio);
                this.actualAnim = this.character_jumping_der;
                this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;
            }
            checkSoundAndPlay(this.jump_sound);
        }
    }
    repaint() {
        this.actualAnim.paint(this.ctx, Math.ceil(this.relativePosX * this.canvasWidth), Math.ceil(this.relativePosY * this.canvasHeight), this.width, this.height);
    }
    basicMovement() {
        if (this.relativePosY >= (this.relativePosYMin + this.relativeHeight)) {
            this.kill();
        } else {
            this.relativePosY += this.relativeCelerityY;
        }
    }
    changingSideIzq() {
        if (this.relativePosX < this.relativePosXDer) {
            this.relativePosY += this.relativeCelerityYJump;
            this.relativePosX += this.relativeCelerityX;
        }
        else {
            this.relativePosX = this.relativePosXDer;
            this.isLeft = false;
            this.changingSide = false;
            this.selectedMovement = this.basicMovement;
            this.character_land_der.restartAndDo(function () {
                this.character_walk_der.restart();
                this.actualAnim = this.character_walk_der;
                this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;
                this.update();
            }.bind(this));
            this.height = Math.ceil(this.width * this.character_land_der.aspectRatio);
            this.actualAnim = this.character_land_der;
            this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;
        }
    }
    changingSideDer() {
        if (this.relativePosX > this.relativePosXIzq) {
            this.relativePosY += this.relativeCelerityYJump;
            this.relativePosX -= this.relativeCelerityX;
        }
        else {
            this.relativePosX = this.relativePosXIzq;
            this.isLeft = true;
            this.changingSide = false;
            this.selectedMovement = this.basicMovement;
            this.character_land_izq.restartAndDo(function () {
                this.character_walk_izq.restart();
                this.height = Math.ceil(this.width * this.character_walk_izq.aspectRatio);
                this.actualAnim = this.character_walk_izq;
                this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;
                this.update();
            }.bind(this));
            this.height = Math.ceil(this.width * this.character_land_izq.aspectRatio);
            this.actualAnim = this.character_land_izq;
            this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;
        }
    }
    update() {
        //console.log("x: "+this.relativePosX+" y: "+this.relativePosY+" b: "+this.isLeft);
        this.selectedMovement();
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
        this.changingSide = true;
        this.selectedMovement = this.dying;

        this.isDeath = true;

        this.character_death.restartAndDo(function () {
            this.character_death_fall.restart();
            this.height = Math.ceil(this.width * this.character_death_fall.aspectRatio);
            this.actualAnim = this.character_death_fall;
            this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;
            this.update();
        }.bind(this));
        this.height = Math.ceil(this.width * this.character_death.aspectRatio);
        this.actualAnim = this.character_death;
        this.relativeHeight = this.actualAnim.aspectRatio * this.relativeWidth / game.aspectRatio;
    }
}