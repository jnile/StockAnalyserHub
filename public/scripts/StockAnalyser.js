import { PATTERNS, TREND, SIGNAL } from './Enums.js'
import { Candlestick } from './Candlestick.js'
import { matchDoubleCandlestickPattern } from './doubleCandlestickPatternMatcher.js'

export class StockAnalyser {

    /**
     * 
     * @param { Candlestick[] } candleDataset Array of OHLC values in chronological order
     * @returns {{firstC:{type:Enums.PATTERNS,color:Enums.TREND}, secondC:{type:Enums.PATTERNS,color:Enums.TREND}, thirdC:{type:Enums.PATTERNS,color: Enums.TREND}}}
     */
    analyseData(candleDataset) {
        let firstC = candleDataset[2]
        let secondC = candleDataset[1]
        let thirdC = candleDataset[0]

        let candlePatterns = {
            firstC : firstC.getTypeAndTrend(),
            secondC : secondC.getTypeAndTrend(),
            thirdC : thirdC.getTypeAndTrend(),
        }

        candlePatterns.doubleCandles = matchDoubleCandlestickPattern()

        return candlePatterns
    }

}