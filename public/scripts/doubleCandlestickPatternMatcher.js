import { PATTERNS, TREND } from "./Enums.js";
import { Candlestick } from "./Candlestick.js";
import { getValAtPerBetween } from "./CandlestickUtilityFuncs.js";

/**
 * Matches two candlestick data chronologically
 * @param {Candlestick} c1 chronologically first candlestick
 * @param {Candlestick} c2 later candlestick
 * @returns {{type: PATTERNS, trend: TREND}}
 */
export function matchDoubleCandlestickPattern(c1, c2) {

    let candle1 = c1.getTypeAndTrend()
    let candle2 = c2.getTypeAndTrend()

    switch (candle1.trend) {
        case TREND.RED:
            calculateFirstCandleRed(c1, c2)
            break;
        
        case TREND.GREEN:
            calculateFirstCandleGreen(c1, c2)
    }

    // If no patterns match
    return {
        type: PATTERNS.NONE,
        trend: TREND.GREY
    }
}

/**
 * Calculates double candlestick patterns where 
 * first candlestick has red/bearish trend
 * @param {Candlestick} c1 Chronologically first candlestick with red/bearish trend
 * @param {Candlestick} c2 
 * @returns {{type: PATTERNS, trend: TREND}}
 */
function calculateFirstCandleRed(c1, c2) {
    // Check if pattern is tweezer Bottom
    switch (c2.trend) {
        case TREND.RED:
            // Check Matching low
            if (c1.low == c1.close && c2.low == c2.close &&
                c2.close >= c1.close && c2.close < getValAtPerBetween(5,c2.close, c2.open)
            ) {
                return {
                    type: PATTERNS.MATCHING_LOW,
                    trend: TREND.GREEN
                }
            }
    }
}


/**
 * Calculates double candlestick patterns where 
 * first candlestick has green/bullish trend
 * @param {Candlestick} c1 Chronologically first candlestick with green/bullish trend
 * @param {Candlestick} c2 
 * @returns {{type: PATTERNS, trend: TREND}}
 */
function calculateFirstCandleGreen(c1,c2) {}