import { PATTERNS, TREND } from "./Enums.js";

/**
 * matches OHLC candlestick data to pattern matcher
 * @param {number} open 
 * @param {number} high 
 * @param {number} low 
 * @param {number} close 
 * @returns { {type:Enums.PATTERNS, color: Enums.TREND} }
 */
export function matchCandlestickPattern(open, high, low, close) {
    // Work out 
    let trend = calculateTrend(open, close)

    if (trend == TREND.GREEN) {
        return {
            type: calculateGreenPattern(open, high, low, close),
            color: TREND.GREEN
        }
    } else if (trend == TREND.RED) {
        return {
            type: calculateRedPattern(open, high, low, close),
            color: TREND.RED
        }
    }

    return {
        type: PATTERNS.DOJI,
        color: TREND.GREY
    }
}

/**
 * Check green candlestick patterns
 * @param {number} open 
 * @param {number} high 
 * @param {number} low 
 * @param {number} close 
 * @returns {Enums.PATTERNS}
 */
function calculateGreenPattern(open, high, low, close) {
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
 * @param {number} open 
 * @param {number} high 
 * @param {number} low 
 * @param {number} close 
 * @returns {Enums.PATTERNS}
 */
function calculateRedPattern(open, high, low, close) {
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

/**
 * Calculates what percentage the bar is relative to the candlestick
 * @param {number} open 
 * @param {number} high 
 * @param {number} low 
 * @param {number} close 
 * @returns {number} Percentage
 */
function calculateBarPerc(open, high, low, close) {
    let barHeight = Math.abs(close - open)
    let lineHeight = high - low
    
    return barHeight / lineHeight * 100
}

/**
 * Calculates what percentage the given point is at on the candlestick
 * @param {number} point 
 * @param {number} low 
 * @param {number} high 
 * @returns {number} Percentage
 */
function calculateValueOnLine(point, low, high) {
    let range = high - low
    return (point - low) / range * 100
}