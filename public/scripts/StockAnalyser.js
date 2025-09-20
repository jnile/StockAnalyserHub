import { PATTERNS, TREND, SIGNAL } from './Enums.js'
import { Candlestick } from './Candlestick.js'
import { DoubleCandlestickPatterns } from './DoubleCandlestickPatterns.js'
import { SinglePattern, DoublePattern } from './Pattern.js'

export class StockAnalyser {

    /**
     * Calculates the patterns of the given three candlesticks
     * @param { Candlestick[] } candleDataset Array of OHLC values in reverse chronological order
     * @returns {{firstCandle:SinglePattern, doublePattern:DoublePattern}}
     */
    analyseData(candleDataset) {
        let firstC = candleDataset[0]
        let secondC = candleDataset[1]
        let thirdC = candleDataset[2]

        let candlePatterns = {
            firstCandle : firstC.getPattern(),
        }

        let doublePatternMatcher = new DoubleCandlestickPatterns()
        candlePatterns.doublePattern = doublePatternMatcher.matchPattern(secondC, firstC)
        
        return candlePatterns
    }
}