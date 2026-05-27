'use strict';

import dom from "./dom.js";
import render from './render.js';
import game from './game.js';
import elements from './elements.js';
import hooks from './hooks.js';
import connector from '/connector/index.js';

const init = () => {
    // Die Rückgabe vom Connector wird in ein Modul geschrieben,
    // um es von überall ansprechen zu können
    console.log('Connector initialized', hooks);

    dom.mapping();
    dom.appendEventListeners();

    connector.init().then(
        result => Object.assign(hooks, result)
    ).then(
        render.init
    ).then(
        render.createSprites
    ).then(
        render.createBG
    ).then(
        game.init
    ).then(
        console.log
    ).catch(
        console.warn
    )

}

init();
