'use strict';

import elements from "./elements.js";
import dom from "./dom.js";


const render = {
    init() {
        let w = document.documentElement.clientWidth - 20;
        let h = document.documentElement.clientHeight - 20;

        if (w * (2 / 3) < h) h = w * (2 / 3);
        else w = h / (2 / 3)

        let l = (document.documentElement.clientWidth - w) / 2 + 'px';
        let t = (document.documentElement.clientHeight - h) / 2 + 'px';

        elements.c.width = w;
        elements.c.height = h;
        elements.c.style.left = l;
        elements.c.style.top = t;

        elements.cBG.width = w;
        elements.cBG.height = h;
        elements.cBG.style.left = l;
        elements.cBG.style.top = t;

        elements.cForeground.width = w;
        elements.cForeground.height = h;
        elements.cForeground.style.left = l;
        elements.cForeground.style.top = t;

        let c = elements.cBG;
        let ctxBG = c.getContext('2d');
        if (elements.imgBG) {
            ctxBG.drawImage(elements.imgBG, 0, 0, c.width, c.height);
            console.log(elements.imgBG.getAttribute('src'));
            document.body.style.backgroundImage = `url('${elements.imgBG.getAttribute('src')}')`;
        }
    },

    createBG() {
        return fetch('/getFileListOfFolder', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                folder: '/games/thunder/assets/img/backgrounds'
            })
        }).then(
            res => res.json()
        ).then(
            res => {
                let imgPath = res[~~(Math.random() * res.length)];

                elements.imgBG = dom.create({
                    tagName: 'img',
                    src: `./assets/img/backgrounds/${imgPath}`
                })

                // Background
                let c = elements.cBG;
                let ctx = c.getContext('2d');
                elements.imgBG.addEventListener('load', () => {
                    ctx.drawImage(elements.imgBG, 0, 0, c.width, c.height);
                    document.body.style.backgroundImage = `url('${elements.imgBG.getAttribute('src')}')`;
                });

                // Foreground
                /*
                c = elements.cForeground;
                let ctxFG = c.getContext('2d');
                let grad = ctx.createLinearGradient(0, 0, 0, c.height / 6);
                grad.addColorStop(0, '#000c');
                grad.addColorStop(.6, '#000a');
                grad.addColorStop(1, '#0000');
                ctxFG.fillStyle = grad;
                ctxFG.fillRect(0, 0, c.width, c.height);
                */
            }
        )
    },

    createSprites() {
        return Promise.all([
            new Promise((resolve) => {
                elements.sprite = dom.create({
                    tagName: 'img',
                    src: './assets/img/spritesheet/viking.webp',
                    // parent: document.body,
                    listeners: {
                        load() {
                            resolve()
                        }
                    }
                })
            }),
            new Promise((resolve) => {
                elements.crystal = dom.create({
                    tagName: 'img',
                    src: './assets/img/spritesheet/crystal.webp',
                    // parent: document.body,
                    listeners: {
                        load() {
                            resolve()
                        }
                    }
                })
            })
        ])
    },

    gameOver(){

    },
}

export default render