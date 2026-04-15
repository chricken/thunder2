'use strict';

import elements from "../elements.js";
import settings from "../settings.js";

class Player {
    constructor() {
        this.pos = {x: 0.2, y: settings.walkHeight};    // x: Mitte, y: Unterkante
        this.speed = .02;
        this.direction = 1;  // positiv: Nach rechts, negativ: Nach links
        this.img = elements.sprite;
        this.numFrames = 8;
        this.currentFrame = 0;
        this.sourceSize = 312;
        this.targetSize = 172;

        this.minDistFromEdge = 0.02;
    }

    changeDirection() {
        this.direction *= -1;
    }

    update() {
        let deltaX = this.direction * this.speed;
        this.pos.x = this.pos.x + deltaX;
        this.pos.x = Math.max(this.minDistFromEdge, this.pos.x);
        this.pos.x = Math.min(1 - this.minDistFromEdge, this.pos.x);
        this.currentFrame = (this.currentFrame + .5) % this.numFrames;
    }

    render() {
        const {c} = elements;
        const ctx = c.getContext('2d');

        if (this.direction > 0) {
            ctx.drawImage(this.img,
                ~~this.currentFrame * this.sourceSize,
                0,
                this.sourceSize,
                this.sourceSize,
                (this.pos.x * c.width) - this.targetSize / 2,
                (this.pos.y * c.height) - this.targetSize,
                this.targetSize,
                this.targetSize
            );
        } else {
            ctx.save()
            ctx.translate(
                (this.pos.x * c.width) - this.targetSize / 2,
                (this.pos.y * c.height) - this.targetSize
            )
            ctx.scale(-1,1);
            ctx.drawImage(this.img,
                ~~this.currentFrame * this.sourceSize,
                0,
                this.sourceSize,
                this.sourceSize,
                0,
                0,
                -this.targetSize,
                this.targetSize
            );
            ctx.restore();
        }
    }
}

export default Player