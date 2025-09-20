import { PATTERNS, TREND, SIGNAL } from './Enums.js'
import { Candlestick } from './Candlestick.js'
import { DoubleCandlestickPatterns } from './DoubleCandlestickPatterns.js'

export class StockAnalyser {

    /**
     * 
     * @param { Candlestick[] } candleDataset Array of OHLC values in reverse chronological order
     * @returns {{firstC:{type:PATTERNS,color:TREND}, secondC:{type:PATTERNS,color:TREND}, thirdC:{type:PATTERNS,color: TREND}}}
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