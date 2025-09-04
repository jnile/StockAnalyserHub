import { PATTERNS, TREND, SIGNAL } from './Enums.js'

export class StockAnalyser {

    // candleDataset is earliest to latest
    analyseData(candleDataset) {
        let oneC = this.oneCandle(candleDataset[2])
        let twoC = this.twoCandle(candleDataset[1], candleDataset[2])
        let threeC = {
            type: PATTERNS.NONE,
            signal: SIGNAL.NONE,
        }
        
        return {
            oneC,
            twoC,
            threeC
        }
    }

    oneCandle(c1) {
        let bigSize = c1.h - c1.l
        let smallSize = Math.abs(c1.o - c1.c)

        let color;

        if (c1.o > c1.c) {
            color = TREND.RED
        } else if (c1.o == c1.c) {
            color = TREND.GREY
        } else{
            color = TREND.GREEN
        }

        // Hammer Patterns
        if (smallSize/bigSize < 0.4 && 
            smallSize/bigSize > 0.09
        ) {
            let midPoint = bigSize/2 + c1.l

            // Hammer head on top [appears after a downtrend]
            if (c1.o > midPoint && c1.c > midPoint) {
                return {
                    type: PATTERNS.HAMMER,
                    signal: SIGNAL.BULLISH_REVERSAL,
                    color: color,
                }
            }

            // Hammer head on bottom / Shooting Star [appears after an uptrend]
            if (c1.o < midPoint && c1.c < midPoint) {
                return {
                    type: PATTERNS.INVERTED_HAMMER,
                    signal: SIGNAL.BEARISH_REVERSAL,
                    color: color,
                }
            }
        }

        // Doji Pattern
        if (smallSize/bigSize <= 0.09 || color == TREND.GREY) {
            return {
                type: PATTERNS.DOJI,
                signal: SIGNAL.INDECISION,
                color: color,
            }
        }

        return {
            type: PATTERNS.NONE,
            signal: SIGNAL.NONE,
            color: color
        }
    }

    twoCandle(c1, c2) {
        let firstCandle = this.oneCandle(c1)
        let secondCandle = this.oneCandle(c2)

        if (firstCandle.color == TREND.BEARISH) {
            if (secondCandle.color == TREND.BULLISH && 
                c2.c > c1.o &&
                c2.o < c1.c
            ) {
                return {
                    type: PATTERNS.BULLISH_ENGULFING,
                    signal: SIGNAL.BULLISH,
                }
            }
        }


        if (firstCandle.color == TREND.BULLISH) {
            if (secondCandle.color == TREND.BEARISH &&
                c2.o > c1.c &&
                c2.c < c1.o
            ) {
                return {
                    type: PATTERNS.BEARISH_ENGULFING,
                    signal: SIGNAL.BEARISH,
                }
            }
        }

        return {
            type: PATTERNS.NONE,
            signal: SIGNAL.NONE,
        }
    }
}