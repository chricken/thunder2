'use strict';

const settings = {
    // Lighting
    branchProbability: .1,
    deathProbability: .08,
    minExtendVertical: .04,
    maxExtendVertical: .06,
    minExtendHorizontal: -.03,
    maxExtendHorizontal: .03,
    minWidth: .008,
    maxWidth: .015,
    thresholdWidth: .001,
    walkHeight:  .98,

    timeToRespawn: 1700,
    timeToLiveAfter: 300,

    maxBranches: 4,

    // Presents
    minTimeAvailable: 500,
    maxTimeAvailable: 2000,

    // Schriften
    fontHeight: .05,

    // Score
    scoreResetDelay: 1000,

    // paused
    isPaused: false,

}

export default settings;