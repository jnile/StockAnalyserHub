import { calculateBarPerc, calculateValueOnLine } from "./Utility.js";
import { PATTERNS, TREND } from "./Enums.js";
import { SingleCandlestickPatterns } from "./SingleCandlestickPatterns.js";
import {SinglePattern} from "./Pattern.js"

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

        this._setTrend()
    }

    _setTrend() {
        if (this.open > this.close) {
            this.trend = TREND.RED
        } else if (this.open < this.close) {
            this.trend = TREND.GREEN
        } else {
            this.trend = TREND.GREY
        }
    }

    /**
     * The single pattern of this candlestick
     * @returns { SinglePattern } Will return false if one does not exist
     */
    getPattern() {
        if (this.pattern === undefined) {
            let patternMatcher = new SingleCandlestickPatterns()
            this.pattern = patternMatcher.matchPattern(this)
        }

        return this.pattern
    }

    getBarPerc() {
        if (this.barPerc === undefined) {
            this.barPerc = calculateBarPerc(this.open, this.high, this.low, this.close)
        }

        return this.barPerc
    }

    getValuePercOnLine(val) {
        return calculateValueOnLine(val, this.low, this.high)
    }

    /**
     * Calculates what percentage the given point is at on the candlestick's bar
     * @param {number} val 
     * @returns 
     */
    getValuePerOnBar(val) {
        if (this.open == this.close) {
            return 0
        }

        if (this.open > this.close) {
            return calculateValueOnLine(val, this.close, this.open)
        }

        return calculateValueOnLine(val, this.open, this.close)
    }
}