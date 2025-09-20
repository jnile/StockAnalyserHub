import {SinglePattern} from "./Pattern.js"
import { IMAGES_URL, PATTERNS, SIGNAL, TREND } from "./Enums.js"
import { Candlestick } from "./Candlestick.js"

export class SingleCandlestickPatterns {
    constructor() {
        this.patterns = {}
         
        this.IMAGE_URL = IMAGES_URL + "candlestick_patterns/single/"

        this._createPatterns()
    }

    /**
     * 
     * @param {Candlestick} c1 Candlestick to match
     */
    matchPattern(c1) {
        for (const pat of Object.values(this.patterns[c1.trend])) {
            if (pat.isPattern(c1)) {
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

        patterns[PATTERNS.SINGLE.BULLISH_MARUBOZU] = new SinglePattern(
            "Bullish Marubozu",
            PATTERNS.SINGLE.BULLISH_MARUBOZU,
            this.IMAGE_URL + "Green_marubozu.png",
            SIGNAL.BULLISH,
            TREND.GREEN,
            function (c1) {
                if (c1.trend == TREND.BULLISH &&
                    c1.open == c1.low && c1.close == c1.high
                ) {
                    return true
                }

                return false
            }
        )

        patterns[PATTERNS.SINGLE.DRAGONFLY_DOJI] = new SinglePattern(
            "Dragonfly Doji",
            PATTERNS.SINGLE.BULLISH_MARUBOZU,
            this.IMAGE_URL + "Green_doji.png",
            SIGNAL.BULLISH,
            TREND.GREEN,
            function (c1) {
                if (c1.trend == TREND.BULLISH &&
                    c1.getBarPerc() < 5 && c1.getValuePercOnLine(c1.open) > 90
                ) {
                    return true
                }

                return false
            }
        )

        patterns[PATTERNS.SINGLE.HAMMER] = new SinglePattern(
            "Hammer",
            PATTERNS.SINGLE.HAMMER,
            this.IMAGE_URL + "Green_hammer.png",
            SIGNAL.BULLISH,
            TREND.GREEN,
            function (c1) {
                if (c1.trend == TREND.BULLISH &&
                    c1.getBarPerc() >= 5 && c1.getBarPerc() <= 20 && 
                    c1.getValuePercOnLine(c1.open) > 60
                ) {
                    return true
                }

                return false
            }
        )

        patterns[PATTERNS.SINGLE.BULLISH_SPINNING_TOP] = new SinglePattern(
            "Bullish Spinning Top",
            PATTERNS.SINGLE.HAMMER,
            this.IMAGE_URL + "Green_spinning_top.png",
            SIGNAL.BULLISH,
            TREND.GREEN,
            function (c1) {
                if (c1.trend == TREND.BULLISH &&
                    c1.getBarPerc() >= 5 && c1.getBarPerc() <= 10 && 
                    c1.getValuePercOnLine(c1.open) > 45 && 
                    c1.getValuePercOnLine(c1.open) <= 50
                ) {
                    return true
                }

                return false
            }
        )

        patterns[PATTERNS.SINGLE.INVERTED_HAMMER] = new SinglePattern(
            "Inverted Hammer",
            PATTERNS.SINGLE.HAMMER,
            this.IMAGE_URL + "Green_inverted_hammer.png",
            SIGNAL.BULLISH,
            TREND.GREEN,
            function (c1) {
                if (c1.trend == TREND.BULLISH &&
                    c1.getBarPerc() >= 5 && c1.getBarPerc() <= 20 && 
                    c1.getValuePercOnLine(c1.close) < 40
                ) {
                    return true
                }

                return false
            }
        )

        this.patterns[TREND.GREEN] = patterns
    }

    /**
     * Instantiates all single red patterns
     */
    _createRedPatterns() {
        let patterns = {}

        patterns[PATTERNS.SINGLE.BEARISH_MARUBOZU] = new SinglePattern(
            "Bearish Marubozu",
            PATTERNS.SINGLE.BEARISH_MARUBOZU,
            this.IMAGE_URL + "Red_marubozu.png",
            SIGNAL.BEARISH,
            TREND.RED,
            function (c1) {
                if (c1.trend == TREND.RED &&
                    c1.open == c1.high && c1.close == c1.low
                ) {
                    return true
                }

                return false
            }
        )

        patterns[PATTERNS.SINGLE.GRAVESTONE_DOJI] = new SinglePattern(
            "Gravestone Doji",
            PATTERNS.SINGLE.GRAVESTONE_DOJI,
            this.IMAGE_URL + "Red_doji.png",
            SIGNAL.BEARISH,
            TREND.RED,
            function (c1) {
                if (c1.trend == TREND.RED &&
                    c1.getBarPerc() < 5 &&
                    c1.getValuePercOnLine(c1.open) < 10
                ) {
                    return true
                }

                return false
            }
        )

        patterns[PATTERNS.SINGLE.BEARISH_INVERTED_HAMMER] = new SinglePattern(
            "Bearish Inversted Hammer",
            PATTERNS.SINGLE.BEARISH_INVERTED_HAMMER,
            this.IMAGE_URL + "Red_inverted_hammer.png",
            SIGNAL.BEARISH,
            TREND.RED,
            function (c1) {
                if (c1.trend == TREND.RED &&
                    c1.getBarPerc() >= 5 && c1.getBarPerc() <= 20 &&
                    c1.getValuePercOnLine(c1.open) < 40
                ) {
                    return true
                }

                return false
            }
        )

        patterns[PATTERNS.SINGLE.BEARISH_SPINNING_TOP] = new SinglePattern(
            "Bearish Spinning Top",
            PATTERNS.SINGLE.BEARISH_SPINNING_TOP,
            this.IMAGE_URL + "Red_spinning_top.png",
            SIGNAL.BEARISH,
            TREND.RED,
            function (c1) {
                if (c1.trend == TREND.RED &&
                    c1.getBarPerc() >= 5 && c1.getBarPerc() <= 10 &&
                    c1.getValuePercOnLine(c1.open) < 55 &&
                    c1.getValuePercOnLine(c1.open) >= 50
                ) {
                    return true
                }

                return false
            }
        )

        patterns[PATTERNS.SINGLE.HANGING_MAN] = new SinglePattern(
            "Hanging Man",
            PATTERNS.SINGLE.HANGING_MAN,
            this.IMAGE_URL + "Red_handing_man.png",
            SIGNAL.BEARISH,
            TREND.RED,
            function (c1) {
                if (c1.trend == TREND.RED &&
                    c1.getBarPerc() >= 5 && c1.getBarPerc() <= 20 &&
                    c1.getValuePercOnLine(c1.close) > 60 
                ) {
                    return true
                }

                return false
            }
        )

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
}