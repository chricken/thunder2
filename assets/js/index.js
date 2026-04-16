'use strict';

import dom from "./dom.js";
import render from './render.js';
import game from './game.js';
import elements from './elements.js';
import connector from '/connector/index.js';

const init = () => {
    connector.init();

    dom.mapping();
    dom.appendEventListeners();
    render.init()
    render.createSprites().then(
        render.createBG
    ).then(
        game.init
    ).then(
        () => console.log(elements)
    ).catch(
        console.warn
    )

}

init();
