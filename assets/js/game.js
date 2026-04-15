'use strict';

import Player from "./classes/Player.js";
import elements from "./elements.js";
import Lightning from "./classes/Lightning.js";
import data from './data.js';

let player;

const game = {
    init() {
        player = new Player();
        data.lightning = new Lightning();

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
        for (let i = 0; i < data.presents.length; i++) {
            data.presents[i].update()
        }
    },

    render() {
        const {c} = elements;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);

        player.render();

        if (data.lightning) {
            data.lightning.render();
        }

        for (let i = 0; i < data.presents.length; i++) {
            data.presents[i].render()
        }

    }
}

export default game;