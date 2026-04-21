'use strict';

import elements from "../elements.js";
import data from '../data.js';

class ScoreSprite {
    constructor(score, x, y) {
        this.score = score;
        this.pos = {x, y};
        this.opacity = .9;
        this.speed = Math.random() * .005 + .002;
        this.size = .02;
    }

    update() {
        this.pos.y -= this.speed;
        this.opacity *= .97;
        if (this.opacity <= 0) {
            data.scoreSprites.splice(data.scoreSprites.indexOf(this), 1);
        }
    }

    render() {
        const {c} = elements;
        const ctx = c.getContext('2d');

        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.textAlign = 'center';
        ctx.fillText(this.score, this.pos.x * c.width, this.pos.y * c.height);

    }
}

export default ScoreSprite;