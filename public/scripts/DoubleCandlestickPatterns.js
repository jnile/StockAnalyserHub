import {DoublePattern, SinglePattern} from "./Pattern.js"
import { IMAGES_URL, PATTERNS, SIGNAL, TREND } from "./Enums.js"
import { Candlestick } from "./Candlestick.js"

export class DoubleCandlestickPatterns {
    constructor() {
        this.patterns = {}
         
        this.IMAGE_URL = IMAGES_URL + "candlestick_patterns/double/"

        this._createPatterns()
    }

    /**
     * 
     * @param {Candlestick} c1 Chronologically first candle stick (earlier)
     * @param {Candlestick} c2 Candlestick to match
     * @returns {DoublePattern} The double pattern that matches, otherwise returns false
     */
    matchPattern(c1, c2) {
        let trend1 = this.patterns[c1.trend]

        if (trend1 === undefined) {
            return false
        } 

        if (trend1[c2.trend] === undefined) {
            return false
        }
       
        for (const pat of Object.values(trend1[c2.trend])) {
            if (pat.isPattern(c1, c2)) {
                return pat
            }
        }
        
        return false
    }

    _createPatterns() {
        this._createGreenPatterns()
        this._createGreyPatterns()
        this._createRedPatterns()
    }

    /*
     * Instantiates all single green patterns
     */
    _createGreenPatterns() {
        let patterns = {}

        this.patterns[TREND.GREEN] = patterns
    }

    /**
     * Instantiates all single red patterns
     */
    _createRedPatterns() {
        let patterns = {}

        patterns[TREND.RED] = this._createRedRedPatterns()

        this.patterns[TREND.RED] = patterns
    }

    /**
     * Instantiates all single neutral patterns
     */
    _createGreyPatterns() {
        let patterns = {}

        patterns[PATTERNS.SINGLE.DOJI] = new SinglePattern(
            "Doji",
            PATTERNS.SINGLE.DOJI,
            this.IMAGE_URL + "Doji.png",
            SIGNAL.INDECISION,
            TREND.GREY,
            function (c1) {
                if (c1.trend == TREND.GREY) {
                    return true
                }

                return false
            }
        )

        this.patterns[TREND.GREY] = patterns
    }


    /**
    * Instantiates all Red-Red trend candlestick patterns
    */
    _createRedRedPatterns() {
        let patterns = {}

        patterns[PATTERNS.DOUBLE.MATCHING_LOW] = new DoublePattern(
            "Matching Low",
            PATTERNS.DOUBLE.MATCHING_LOW,
            this.IMAGE_URL + "matching_low.png",
            SIGNAL.BULLISH,
            TREND.RED,
            TREND.RED,
            function (c1, c2) {
                if (c1.trend == TREND.RED &&
                    c2.trend == TREND.RED &&
                    c1.low == c1.close && c2.low == c2.close &&
                    c2.close >= c1.close && c1.getValuePerOnBar(c2.close) < 5
                ) {
                    return true
                }

                return false
            }
        )

        return patterns
    }
}