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
        this.size = Math.random() * .02 + .02;

        this.timeAvailable = helpers.createNumberAbs(settings.minTimeAvailable, settings.maxTimeAvailable);
        this.tsSpawn = Date.now();


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

        ctx.fillStyle = '#fc4';

        ctx.fillRect(
            (this.x - (this.size / 2)) * c.width,
            (this.y - this.size) * c.height,
            this.size * c.width,
            this.size * c.width,
        );

    }
}


export default Present;