import {ZZFX, zzfx} from '/libraries/ZzFX-master/ZzFX.js'

const rnd = (min, max) => Math.random() * (max - min) + min;
const rndF = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// http://localhost:8080/libraries/ZzFX-master/
const sfx = {
    thunders: [
        () => [2, , 88, .08, .23, .59, , .9, 5, , , , , 1.2, 41, .8, .45, .48, .11, , 117],
        () => [2, , 87, .07, .23, .59, 5, 1.1, 5, , , -0.01, , 1.4, 43, .9, .47, .58, .13, rnd(.01, .6), rnd(117, 2000)],
        () => [2, , 87, .07, .22, .6, 2, 1.2, 5, .1, , , , 1.3, 43, .8, .47, .58, .11, , 116],
        () => [1.8, , 47, .04, .03, rnd(.1,.7), 4, 1.6, , 8.1, , , , 1.8, 7.5, .6, .34, rnd(.02,.3), .12, , 225],
    ],
    thunder() {
        zzfx(...sfx.thunders[0, rndF(0, sfx.thunders.length - 1)]());
    },
    getGem() {
        zzfx(...[, , 51, .02, .04, .05, 1, 1.2, rnd(10, 30), , , , , , , , , .84, .04]);
    },
    dead() {
        zzfx(...[2.1, , 450, .1, .17, .14, 2, 1.1206284043519, 17, , , .01, .08, , -1, , .15, .69, .1, .47]);
    },
    replay(){
        zzfx(...[1.9,,690,.03,.23,.08,,3,.5,-0.7,150,.11,.02,,,.1,.11,.5,.12,,973]); // Powerup 9
    }

}
export default sfx;