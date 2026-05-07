'use strict';

import elements from "../elements.js";
import settings from "../settings.js";
import data from "../data.js";
import ScoreSprite from "./ScoreSprite.js"
import game from '../game.js'

class Player {
    constructor() {
        this.pos = {x: 0.2, y: settings.walkHeight};    // x: Mitte, y: Unterkante
        this.speed = .02;
        this.direction = 1;  // positiv: Nach rechts, negativ: Nach links
        this.img = elements.sprite;
        this.numFrames = 8;
        this.currentFrame = 0;
        this.sourceSize = 312;
        this.targetSize = .1;
        this.collectionDistance = .02;

        this.minDistFromEdge = 0.02;

        this.distanceToSurvive = 0.05;
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

        this.hitTestPresents();
        this.hitTestLightning();
    }

    hitTestLightning() {
        if (!data.lightning) return;

        data.lightning.branches.forEach(branch => {
            const [x, y] = branch.points[branch.points.length - 1];
            let distance = Math.hypot(x - this.pos.x, y - this.pos.y);
            if (distance < data.lightning.hitRadius) {
                console.log(distance);
                game.gameOver()
            }
        })

    }

    hitTestPresents() {
        for (let i = 0; i < data.presents.length; i++) {
            let present = data.presents[i];

            // Wenn der Abstand kleiner ist als Schwellwert
            if (Math.abs(present.x - this.pos.x) < this.collectionDistance) {
                // console.log('collected', present);
                data.score += data.nextScore;
                data.scoreSprites.push(new ScoreSprite(data.nextScore, this.pos.x, this.pos.y));

                data.nextScore++;

                // Score-Sprite hinzufügen
                data.idTimerScoreReset && clearTimeout(data.idTimerScoreReset);
                setTimeout(() => {
                    data.nextScore = 1;
                }, settings.scoreResetDelay)

                // Kristall entfernen
                data.presents = data.presents.filter(p => p !== present);
            }
        }
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
                (this.pos.x * c.width) - (this.targetSize * c.width / 2),
                (this.pos.y * c.height) - (this.targetSize * c.width),
                this.targetSize * c.width,
                this.targetSize * c.width
            );
        } else {
            ctx.save()
            ctx.translate(
                (this.pos.x * c.width) - (this.targetSize * c.width / 2),
                (this.pos.y * c.height) - (this.targetSize * c.width),
            )
            ctx.scale(-1, 1);
            ctx.drawImage(this.img,
                ~~this.currentFrame * this.sourceSize,
                0,
                this.sourceSize,
                this.sourceSize,
                0,
                0,
                -this.targetSize * c.width,
                this.targetSize * c.width
            );
            ctx.restore();

        }

        // Linie, um den Laufpfad zu zeigen
        /*
        ctx.beginPath()
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2;
        ctx.moveTo(0, settings.walkHeight * c.height)
        ctx.lineTo(c.width, settings.walkHeight * c.height)
        ctx.stroke()
        */
    }

}

export default Player