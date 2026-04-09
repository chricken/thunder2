'use strict';

import dom from "./dom.js";
import render from './render.js';
import connector from '/connector/index.js';

const init = () => {
    connector.init();

    dom.mapping();
    dom.appendEventListeners();
    render.init()
    render.createBG();


}

init();
