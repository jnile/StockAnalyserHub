import { PATTERNS, TREND } from "./Enums.js";
import { Candlestick } from "./Candlestick.js";

/**
 * Matches two candlestick data chronologically
 * @param {Candlestick} c1 chronologically first candlestick
 * @param {Candlestick} c2 later candlestick
 * @returns {{type: PATTERNS, trend: TREND}}
 */
export function matchDoubleCandlestickPattern(c1, c2) {
    
}