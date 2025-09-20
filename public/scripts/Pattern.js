import { SIGNAL, TREND, PATTERNS } from "./Enums.js"
import { Candlestick } from "./Candlestick.js"

class Pattern {
    /**
     * 
     * @param {string} name Name of the pattern
     * @param {PATTERNS} key Enum value of pattern 
     * @param {string} img relative url to pattern img
     * @param {SIGNAL} signal the direction the pattern indicates 
     */
    constructor(name, key, img, signal) {
        this.name = name
        this.key = key
        this.img = img
        this.signal = signal
    }
}

export class SinglePattern extends Pattern {
    /**
     * SinglePattern Constructor
     * @param {string} name Name of the pattern
     * @param {PATTERNS} key Enum value of pattern
     * @param {string} img relative url to pattern img
     * @param {SIGNAL} signal the direction the pattern indicates 
     * @param {TREND} c1_trend the trend of the first candlestick
     * @param {function(Candlestick) : boolean} isPattern Custom function to match pattern
     */
    constructor(name, key, img, signal, c1_trend, isPattern) {
        super(name, key, img, signal)
        this.trend = [c1_trend]
        this.isPattern = isPattern
    }
}


export class DoublePattern extends Pattern {
    /**
     * DoublePattern Class Constructor
     * @param {string} name Name of the pattern
     * @param {PATTERNS} key Enum value of pattern
     * @param {string} img relative url to pattern img
     * @param {SIGNAL} signal the direction the pattern indicates
     * @param {TREND} c1_trend the trend of the first candlestick
     * @param {TREND} c2_trend the trend of the first candlestick
     * @param {function(Candlestick, Candlestick) : boolean} isPattern Custom function to match pattern
     */
    constructor(name, key, img, signal, c1_trend, c2_trend, isPattern) {
        super(name, key, img, signal)
        this.trend = [c1_trend, c2_trend]
        this.isPattern = isPattern
    }
}