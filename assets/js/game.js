'use strict';

import Player from "./classes/Player.js";
import elements from "./elements.js";
import Lightning from "./classes/Lightning.js";

let player;
let lightning;

const game = {
    init() {
        player = new Player();
        lightning = new Lightning();

        setInterval(() => {
                game.update();
                game.render();
            },
            30
        )

        game.update();
        game.render();

        window.addEventListener('keydown', evt => {
            if (evt.key === ' ') {
                player.changeDirection();
            }
        })

    },

    update() {
        player.update();
    },
    render() {
        const {c} = elements;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);

        player.render();
        lightning.render();

    }
}

export default game;