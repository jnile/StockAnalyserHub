export const TREND = Object.freeze({
    GREEN : 1,
    RED : 2,
    GREY : 3,
    BULLISH : 1,
    BEARISH : 2,
})

export const PATTERNS = Object.freeze({
    NONE : 0,
    
    // One Candlestick
    BULLISH_MARUBOZU : 1, //
    DRAGONFLY_DOJI : 2,
    HAMMER : 3,
    BULLISH_SPINNING_TOP: 4,
    INVERTED_HAMMER: 5,
    DOJI: 6,
    HANGING_MAN: 7,
    BEARISH_SPINNING_TOP: 8,
    BEARISH_INVERTED_HAMMER: 9,
    GRAVESTONE_DOJI: 10,
    BEARISH_MARUBOZU: 11,

    // Two Candlestick
});

export const SIGNAL = Object.freeze({
    NONE : 0,
    BULLISH : 1,
    BEARISH : 2,
    INDECISION : 3,
    BULLISH_REVERSAL : 4, // Up
    BEARISH_REVERSAL : 5, // Down
})

export const NO_TO_PATTERNS = Object.freeze({
    0 : "",
    
    // One Candlestick
    1 : "BULLISH MARUBOZU",
    2 : "DRAGONFLY DOJI",
    3 : "HAMMER",
    4 : "BULLISH SPINNING TOP",
    5 : "INVERTED HAMMER",
    6 : "DOJI",
    7 : "HANGING MAN",
    8 : "BEARISH SPINNING TOP",
    9 : "BEARISH INVERTED HAMMER",
    10 : "GRAVESTONE DOJI",
    11 : "BEARISH MARUBOZU",

    // Two Candlestick
});

export const NO_TO_SIGNAL = Object.freeze({
    0 : "",
    1 : "BULLISH",
    2 : "BEARISH",
    3 : "INDECISION",
    4 : "BULLISH_REVERSAL", // Up
    5 : "BEARISH_REVERSAL", // Down
})

export const NO_TO_TREND = Object.freeze({
    1: "GREEN_TREND",
    2: "RED_TREND",
    3: "GREY_TREND",
})