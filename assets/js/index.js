'use strict';

import dom from "./dom.js";
import render from './render.js';
import game from './game.js';
import connector from '/connector/index.js';

const init = () => {
    connector.init();

    dom.mapping();
    dom.appendEventListeners();
    render.init()
    render.createSprite().then(
        render.createBG
    ).then(
        game.init
    ).catch(
        console.warn
    )

}

init();
