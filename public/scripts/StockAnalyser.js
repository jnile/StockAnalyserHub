import { PATTERNS, TREND, SIGNAL } from './Enums.js'
import { matchCandlestickPattern } from './CandlestickMatcher.js'

export class StockAnalyser {

    /**
     * 
     * @param {[{o:number, h:number, l:number, c:number}]} candleDataset Array of OHLC values in chronological order
     * @returns {{firstC:{type:Enums.PATTERNS,color:Enums.TREND}, secondC:{type:Enums.PATTERNS,color:Enums.TREND}, thirdC:{type:Enums.PATTERNS,color: Enums.TREND}}}
     */
    analyseData(candleDataset) {
        let firstC = candleDataset[2]
        let secondC = candleDataset[1]
        let thirdC = candleDataset[0]

        let candlePatterns = {
            firstC : matchCandlestickPattern(firstC.o, firstC.h, firstC.l, firstC.c),
            secondC : matchCandlestickPattern(secondC.o, secondC.h, secondC.l, secondC.c),
            thirdC : matchCandlestickPattern(thirdC.o, thirdC.h, thirdC.l, thirdC.c),
        }

        return candlePatterns
    }


    twoCandle(c1, c2, candlePatterns) {
        
    }
}