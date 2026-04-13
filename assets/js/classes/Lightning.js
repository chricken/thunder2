'use strict';

import elements from "../elements.js";
import settings from '../settings.js';
import helpers from '../helpers.js';

class Branch {
    constructor({
                    x = Math.random() * .8 + .1,
                    y = -.1,
                    width = 0,
                    displacement = Math.random() * .05 - .025,
                    deathProbability = 0,
                    splitCallback = () => {
                    },
                }) {
        this.active = true;
        this.points = [[x, y]];
        this.width = width;
        this.displacement = displacement;
        this.splitCallback = splitCallback;
        this.deathProbability = deathProbability;
    }

    extend() {
        let [x, y] = this.points[this.points.length - 1];
        // console.log(' ');

        let mxH = settings.maxExtendHorizontal;
        let mnH = settings.minExtendHorizontal;
        let mxV = settings.maxExtendVertical;
        let mnV = settings.minExtendVertical;

        let x2 = x + (Math.random() * (mxH - mnH) + mnH) + this.displacement;
        let y2 = Math.min(y + (Math.random() * (mxV - mnV) + mnV), settings.walkHeight);
        this.points.push([x2, y2]);

        if (
            Math.random() < (this.deathProbability * settings.deathProbability)
            || y2 >= settings.walkHeight
        ) {
            this.active = false;
        }
        // Verästelung
        if (Math.random() < settings.branchProbability) {
            this.splitCallback({
                x, y,
                width: this.width * .5,
                deathProbability: this.deathProbability * 2
            });
        }

        return ([x2, y2]);
    }


}

class Lightning {
    constructor({
                    initialWidth = helpers.createNumber(settings.minWidth, settings.maxWidth),
                } = {}) {

        this.initialWidth = initialWidth;
        this.branches = [
            new Branch({
                splitCallback: this.split.bind(this),
                width: this.initialWidth,
            })
        ]

        const callbackTimer = () => {
            this.branches
                .filter(b => b.active)
                .forEach(branch => {
                        let [x, y] = branch.extend();
                        if (y >= 1) {
                            branch.active = false;
                            return false;
                        }

                    }
                )

            if (this.branches.some(b => b.active)) {
                // Erweitern, wenn der Blitz noch nicht eingeschlagen ist
                this.timerID = setTimeout(callbackTimer, Math.random() * 40 + 40)
            }
        }

        callbackTimer();

    }

    split({
              x,
              y,
              width,
              deathProbability = 0
          }) {
        this.branches.push(new Branch({
            x, y,
            width,
            deathProbability: 1 - (width / this.initialWidth),
            splitCallback: this.split.bind(this),
        }))
    }

    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');
        // console.log(c);

        const renderBranch = branch => {
            ctx.lineJoin = 'bevel';
            ctx.strokeStyle = 'white';
            ctx.moveTo(branch.points[0][0] * c.width, branch.points[0][1] * c.height);
            // console.log(branch);
            // console.log(...branch[0]);

            branch.points.forEach(point => {
                // console.log(point[0] * c.width, point[1] * c.height);

                ctx.lineTo(point[0] * c.width, point[1] * c.height);
            });

        }

        ctx.filter = 'blur(5px)';
        ctx.globalCompositeOperation = 'screen';
        ctx.strokeStyle = '#05a';
        this.branches.forEach(branch => {
            ctx.lineWidth = branch.width * c.width + 5;
            ctx.beginPath();
            renderBranch(branch);
            ctx.stroke();
        });

        ctx.filter = 'none';
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = '#fff';
        this.branches.forEach(branch => {
            ctx.lineWidth = branch.width * c.width;
            ctx.beginPath();
            renderBranch(branch);
            ctx.stroke();
        });

    }
}

export default Lightning;