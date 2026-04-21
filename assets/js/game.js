'use strict';

import Player from "./classes/Player.js";
import elements from "./elements.js";
import Lightning from "./classes/Lightning.js";
import data from './data.js';
import settings from "./settings.js";

let player;

const game = {
    init() {
        player = new Player();
        data.lightning = new Lightning();

        game.tick();
        /*
        data.idTimerGame = setTimeout( game.tick, 30 );
        game.update();
        game.render();
        */

        window.addEventListener('keydown', evt => {
            if (evt.key === ' ') {
                player.changeDirection();
            } else if (evt.key === 'p' || evt.key === 'P') {
                settings.isPaused = !settings.isPaused;
            }
        })
    },

    tick() {
        if (!settings.isPaused) {
            game.update();
            game.render();
            data.lightning && data.lightning.update()
        } else {
            game.renderPaused();
        }

        data.idTimerGame = setTimeout(game.tick, 30);

    },

    update() {
        player.update();
        for (let i = 0; i < data.presents.length; i++) {
            data.presents[i].update()
        }
        for (let i = 0; i < data.scoreSprites.length; i++) {
            data.scoreSprites[i].update();
        }
    },

    renderPaused() {
        const {c} = elements;
        const ctx = c.getContext('2d');

        let fontHeight = ~~(c.width * settings.fontHeight * 4);
        ctx.font = `${fontHeight}px beepo-regular`;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(`Paused`, c.width / 2, (c.height / 2) + (fontHeight / 2));
        console.log(fontHeight);
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
            data.presents[i].render();
        }

        for (let i = 0; i < data.scoreSprites.length; i++) {
            data.scoreSprites[i].render();
        }

        ctx.font = `${~~(c.width * settings.fontHeight)}px beepo-regular`;
        ctx.textAlign = 'right';
        ctx.fillStyle = 'white';
        ctx.fillText(`${data.score}`, c.width - 10, ~~(c.width * settings.fontHeight));

    }
}

export default game;