'use strict';

import elements from "./elements.js";
import dom from "./dom.js";


const render = {
    init() {
        let w = document.documentElement.clientWidth - 20;
        let h = document.documentElement.clientHeight - 20;

        if (w * (2 / 3) < h) {
            h = w * (2 / 3);
        } else {
            w = h / (2 / 3)
        }

        elements.c.width = w;
        elements.c.height = h;
        elements.c.style.left = (document.documentElement.clientWidth - w) / 2 + 'px';
        elements.c.style.top = (document.documentElement.clientHeight - h) / 2 + 'px';

        elements.cBG.width = w;
        elements.cBG.height = h;
        elements.cBG.style.left = (document.documentElement.clientWidth - w) / 2 + 'px';
        elements.cBG.style.top = (document.documentElement.clientHeight - h) / 2 + 'px';

        let c = elements.cBG;
        let ctxBG = c.getContext('2d');
        if (elements.imgBG) {
            ctxBG.drawImage(elements.imgBG, 0, 0, c.width, c.height);
            console.log(elements.imgBG.getAttribute('src'));
            document.body.style.backgroundImage = `url('${elements.imgBG.getAttribute('src')}')`;
        }
    },

    createBG() {
      return   fetch('/getFileListOfFolder', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                folder: '/games/thunder/assets/img/backgrounds'
            })
        }).then(
            res => res.json()
        ).then(
            res => {
                // console.log(res);
                let imgPath = res[~~(Math.random() * res.length)];

                elements.imgBG = dom.create({
                    tagName: 'img',
                    // parent:document.body,
                    src: `./assets/img/backgrounds/${imgPath}`
                })

                let c = elements.cBG;
                let ctxBG = c.getContext('2d');

                elements.imgBG.addEventListener('load', () => {
                    ctxBG.drawImage(elements.imgBG, 0, 0, c.width, c.height);
                    // console.log(c, c.width, c.height);
                    document.body.style.backgroundImage = `url('${elements.imgBG.getAttribute('src')}')`;
                });

            }
        )
    },

    createSprite(){
      return new Promise((resolve) => {

        elements.sprite = dom.create({
          tagName: 'img',
          src:'./assets/img/spritesheet/viking.webp',
          parent: document.body,
          listeners: {
              load(){
                  resolve()
              }
          }
      })
      })
    },
}

export default render