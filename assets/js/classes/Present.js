'use strict';

import settings from '../settings.js'
import helpers from "../helpers.js";
import elements from '../elements.js';
import data from "../data.js";

class Present {
    constructor({
                    x = .5,
                    y = .5,
                }) {

        this.x = x;
        this.y = y;
        this.size = Math.random() * .02 + .04;

        this.timeAvailable = helpers.createNumberAbs(settings.minTimeAvailable, settings.maxTimeAvailable);
        this.tsSpawn = Date.now();

        this.spriteIndex = helpers.createNumberAbs(0, 14);

    }

    update() {
        let now = Date.now();

        // Present entfernen
        if ((now - this.tsSpawn) > this.timeAvailable) {
            data.presents = data.presents.filter(present => present !== this);
        }
    }

    render() {

        const {c} = elements;
        const ctx = c.getContext('2d');

        ctx.drawImage(
            elements.crystal,
            128 * this.spriteIndex,
            0,
            128,
            128,
            (this.x - (this.size / 2)) * c.width,
            (this.y - this.size) * c.height,
            this.size * c.width,
            this.size * c.height,
        )

    }
}


export default Present;