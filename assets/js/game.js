'use strict';

import Player from "./classes/Player.js";
import elements from "./elements.js";
import Lightning from "./classes/Lightning.js";
import data from './data.js';
import settings from "./settings.js";
import dom from "./dom.js";
import render from "./render.js";
import hooks from "./hooks.js";

let player;

const game = {
    init() {
        player = new Player();
        data.lightning = new Lightning();

        game.tick();

        window.addEventListener('keydown', evt => {
            if (evt.key === ' ') {
                player.changeDirection();
            } else if (evt.key === 'p' || evt.key === 'P') {
                settings.isPaused = !settings.isPaused;
            }
        })

        elements.cForeground.addEventListener('click', () => {
            player.changeDirection();
        })
    },

    restart() {
        const els = Object.values(elements.gameOver);
        els.forEach(el => el.remove());
        data.score = 0;
        settings.maxBranches = 1;
        settings.isGameOver = false;
        render.createBG();

        player = new Player();
        data.lightning = new Lightning();

        game.tick();
    },

    tick() {
        if (!settings.isPaused) {
            game.update();
            game.render();
            data.lightning && data.lightning.update()
        } else {
            game.renderPaused();
        }

        if (!settings.isGameOver)
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

    },

    gameOver() {

        settings.isGameOver = true;

        const bg = dom.create({
            cssClassName: 'game-over',
            parent: elements.body
        })

        const inner = dom.create({
            cssClassName: 'game-over_inner',
            parent: bg
        })

        elements.gameOver = {
            bg,
            inner,

            title: dom.create({
                cssClassName: 'game-over__title',
                parent: inner,
                content: 'Game Over'
            }),

            score: dom.create({
                cssClassName: 'game-over__score',
                parent: inner,
                content: `You scored ${data.score} Points`
            }),

            btnRestart: dom.create({
                cssClassName: 'game-over__btn-restart',
                parent: inner,
                content: 'Restart',
                listeners: {
                    click: () => {
                        game.restart();
                    }
                }
            })
        }
        hooks.saveHighscore(data.score, 'thunder').then(
            scoretable => {
                console.log('scoretable', scoretable);

                elements.gameOver.scoretable = dom.create({
                    cssClassName: 'game-over__scoretable',
                    parent: inner,
                })

                scoretable.forEach(
                    (score, index) => {
                        dom.create({
                            cssClassName: 'game-over__scoretable__row',
                            parent: elements.gameOver.scoretable,
                            content: `${index + 1}. ${score.playerName || 'anonymous'} - ${score.score}`
                        })
                    }
                )

            }
        )


    }
}

export default game;