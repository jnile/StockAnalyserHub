import { calculateBarPerc, calculateValueOnRange } from "./Utility.js";
import { TREND } from "./Enums.js";
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
            this.barPerc = calculateBarPerc(this.open, this.close, this.low, this.high)
        }

        return this.barPerc
    }

    /**
     * Returns at what percentage the given value is between the low and high of this candlestick
     * @param {number} val Point to get percentage of
     * @returns {number} Percentage of the range of where the given value is
     */
    getPerOfValueOnLine(val) {
        return calculateValueOnRange(val, this.low, this.high)
    }

    /**
     * Returns at what percentage the given value is between the open and close of this candlestick
     * @param {number} val Point to get percentage of
     * @returns {number} Percentage of the range of where the given value is
     */
    getPerOfValOnBar(val) {
        if (this.open == this.close) {
            return 0
        }

        if (this.open > this.close) {
            return calculateValueOnRange(val, this.close, this.open)
        }

        return calculateValueOnRange(val, this.open, this.close)
    }
}