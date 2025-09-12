import { PATTERNS, TREND } from "./Enums.js";
import { matchSingleCandlestickPattern } from "./SingleCandlestickPatternMatcher.js";

export class Candlestick {
    /**
     * OHLC data for candlestick
     * @param {number} open 
     * @param {number} high 
     * @param {number} low 
     * @param {number} close 
     */
    constructor(time, open, high, low, close, volume) {
        this.time = time
        this.open = open
        this.high = high
        this.low = low
        this.close = close
        this.volume = volume
    }

    /**
     * 
     * @param { PATTERNS } type
     * @param { TREND } color 
     */
    _setTypeAndTrend(type, color) {
        this.type = type
        this.trend = color
    }

    /**
     * Get this Candlestick's pattern and trend
     * @returns { {type: PATTERNS, trend: TREND} }
     */
    getTypeAndTrend() {
        if (this.type === undefined) {
            let res = matchSingleCandlestickPattern(this)
            this._setTypeAndTrend(res.type, res.color)
        }

        return {
            type: this.type,
            trend: this.trend,
        }
    }
}