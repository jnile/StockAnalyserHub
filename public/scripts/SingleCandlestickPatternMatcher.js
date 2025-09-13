import { PATTERNS, TREND } from "./Enums.js";
import { Candlestick } from "./Candlestick.js";
import { calculateBarPerc, calculateValueOnLine } from "./CandlestickUtilityFuncs.js";
/**
 * matches OHLC candlestick data to pattern matcher
 * @param { Candlestick } currCandlestick
 * @returns { {type: PATTERNS, color: TREND} }
 */
export function matchSingleCandlestickPattern(currCandlestick) {
    // Work out 
    let trend = calculateTrend(currCandlestick.open, currCandlestick.close)

    let res = {
        color: trend
    }

    switch (trend) {
        case TREND.GREEN:
            res.type = calculateGreenPattern(currCandlestick)
            break
        case TREND.RED:
            res.type = calculateRedPattern(currCandlestick)
            break
        default:
            res.type = PATTERNS.DOJI
    }

    return res
}

/**
 * Check green candlestick patterns
 * @param {Candlestick}
 * @returns {Enums.PATTERNS}
 */
function calculateGreenPattern({open, low, close, high}) {
    // Check bullish marubozu pattern
    if (open == low && close == high) {
        return PATTERNS.BULLISH_MARUBOZU
    }

    let barPer = calculateBarPerc(open, high, low, close)
    let openPerc = calculateValueOnLine(open, low, high)
    let closePerc = calculateValueOnLine(close, low, high)

    // Check dragonfly doji pattern
    if (barPer < 5 && openPerc > 90) {
        return PATTERNS.DRAGONFLY_DOJI
    }

    // Check hammer pattern
    if (barPer >= 5 && barPer <= 20 && openPerc > 60) {
        return PATTERNS.HAMMER
    }

    // Check bullish spinning top pattern
    if (barPer >= 5 && barPer <= 10 && openPerc > 45 && openPerc <= 50) {
        return PATTERNS.BULLISH_SPINNING_TOP
    }

    // Check Inverted hammer pattern
    if (barPer >= 5 && barPer <= 20 && closePerc < 40) {
        return PATTERNS.INVERTED_HAMMER
    }

    return PATTERNS.NONE
}

/**
 * Check red candlestick patterns
 * @param {Candlestick}
 * @returns {Enums.PATTERNS}
 */
function calculateRedPattern({open, low, close, high}) {
    // Check bearish marubozu pattern
    if (open == high && close == low) {
        return PATTERNS.BEARISH_MARUBOZU
    }

    let barPer = calculateBarPerc(open, high, low, close)
    let openPerc = calculateValueOnLine(open, low, high)
    let closePerc = calculateValueOnLine(close, low, high)

    // Check gravestone doji pattern
    if (barPer < 5 && openPerc < 10) {
        return PATTERNS.GRAVESTONE_DOJI
    }

    // Check bearish inverted hammer pattern
    if (barPer >= 5 && barPer <= 20 && openPerc < 40) {
        return PATTERNS.BEARISH_INVERTED_HAMMER
    }

    // Check bearish spinning top pattern
    if (barPer >= 5 && barPer <= 10 && openPerc < 55 && openPerc >= 50) {
        return PATTERNS.BEARISH_SPINNING_TOP
    }

    // Check hanging man pattern
    if (barPer >= 5 && barPer <= 20 && closePerc > 60) {
        return PATTERNS.HANGING_MAN
    }

    return PATTERNS.NONE
}

/**
 * Calculates if the candlestick is bullish (green), bearish (red) or neutral
 * @param {number} open 
 * @param {number} close 
 * @returns {Enums.TREND} Color/Name of trend
 */
function calculateTrend(open, close) {
    if (close > open) {
        return TREND.GREEN
    } else if (close < open) {
        return TREND.RED
    }
    
    return TREND.GREY
}