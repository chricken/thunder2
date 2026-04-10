'use strict';

import Player from "./classes/Player.js";
import elements from "./elements.js";

let player;

const game = {
    init() {
        player = new Player();
        setInterval(() => {
                game.update();
                game.render();
            },
            30)
        window.addEventListener('keydown', evt => {
            if(evt.key === ' '){
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
    }
}

export default game;