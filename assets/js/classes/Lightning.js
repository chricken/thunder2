'use strict';

import elements from "../elements.js";
import settings from '../settings.js';
import helpers from '../helpers.js';
import Present from './Present.js';
import data from '../data.js';

class Branch {
    constructor({
                    x = Math.random() * .8 + .1,
                    y = -.1,
                    width = 0,
                    displacement = Math.random() * .05 - .025,
                    deathProbability = 0,
                    splitCallback = () => {
                    },
                    callbackKillLightning = () => {
                    }
                }) {
        this.active = true;
        this.points = [[x, y]];
        this.width = width;
        this.displacement = displacement;
        this.splitCallback = splitCallback;
        this.deathProbability = deathProbability;
        this.callbackKillLightning = callbackKillLightning;
    }

    extend() {
        let [x, y] = this.points[this.points.length - 1];

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
            if (y2 >= settings.walkHeight) {

                data.presents.push(new Present({
                    x: x2,
                    y: y2
                }))
            }

            // Wenn alle Branches inaktiv, kill Lightning
            this.callbackKillLightning();
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
        this.maxBranches = Math.floor(settings.maxBranches);
        this.branches = [
            new Branch({
                splitCallback: this.split.bind(this),
                width: this.initialWidth,
                callbackKillLightning: this.kill.bind(this),
            })
        ]
        this.active = true;
        this.hitRadius = .02;

        settings.maxBranches+=settings.maxBranchesIncrement;
    }

    update(){
        this.branches
            .filter(b => b.active)
            .forEach(branch => branch.extend())

    }

    kill() {

        if (
            this.active
            && !this.branches.some(b => b.active)
        ) {
            this.active = false;
            // data.lightning = null;
            setTimeout(() => {
                data.lightning = null;
            }, settings.timeToLiveAfter)

            setTimeout(() => {
                data.lightning = new Lightning()
            }, settings.timeToRespawn)
        }
    }

    split({
              x,
              y,
              width,
              deathProbability = 0
          }) {
        if (
            width > settings.thresholdWidth
            && this.branches.length < this.maxBranches
        ) {
            this.branches.push(new Branch({
                x, y,
                width,
                deathProbability: 1 - (width / this.initialWidth),
                splitCallback: this.split.bind(this),
                callbackKillLightning: this.kill.bind(this),
            }))
        }
    }

    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');

        const renderBranch = branch => {
            ctx.lineJoin = 'bevel';
            ctx.strokeStyle = 'white';
            ctx.moveTo(branch.points[0][0] * c.width, branch.points[0][1] * c.height);

            branch.points.forEach(point => {
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

        /*
        this.branches.forEach(branch => {
            let [x, y] = branch.points[branch.points.length - 1];

            ctx.beginPath();
            ctx.fillStyle = '#f00';
            ctx.arc(
                x * c.width,
                y * c.height,
                this.hitRadius * c.width,
                0,
                2 * Math.PI
            );
            ctx.fill();
        })
        */

    }
}

export default Lightning;