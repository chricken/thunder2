'use strict';

const helpers = {
    createNumberAbs(min, max) {
        return ~~(Math.random() * (max - min + 1) + min)
    },
    createNumber(min, max) {
        return (Math.random() * (max - min) + min)
    }
}

export default helpers;