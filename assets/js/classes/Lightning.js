'use strict';

import elements from "../elements.js";
import settings from '../settings.js';

class Lightning {
    constructor() {
        let c = elements.c;
        this.xExtendDisplacement = Math.random() * 1 - .5;

        this.branches = [
            [[Math.random(), 0]]
        ]

        this.extend(this.branches[0]);
        this.extend(this.branches[0]);
        this.extend(this.branches[0]);
        this.extend(this.branches[0]);
        this.extend(this.branches[0]);
        this.extend(this.branches[0]);
        console.log(this);

    }

    extend(branch) {
        let [x, y] = branch[branch.length - 1];

        let mxH = settings.maxExtendHorizontal;
        let mnH = settings.minExtendHorizontal;
        let mxV = settings.maxExtendVertical;
        let mnV = settings.minExtendVertical;

        let x2 = x + (Math.random() * (mxH - mnH) + mnH) * this.xExtendDisplacement;
        let y2 = y + (Math.random() * (mxV - mnV) + mnV);
        branch.push([x2, y2]);
    }

    branch() {

    }

    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');
        console.log(c);

        this.branches.forEach(branch => {
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'white';
            ctx.moveTo(branch[0][0] * c.width, branch[0][1] * c.height);
            console.log(branch);
            console.log(...branch[0]);

            branch.forEach(point => {
                console.log(point[0] * c.width, point[1] * c.height);

                ctx.lineTo(point[0] * c.width, point[1] * c.height);
            });

            ctx.stroke();
        })
    }
}

export default Lightning;