export const TREND = Object.freeze({
    GREEN : 1,
    RED : 2,
    GREY : 3,
    BULLISH : 1,
    BEARISH : 2,
})

export const PATTERNS = Object.freeze({
    NONE : 0,
    HAMMER : 1, //
    INVERTED_HAMMER : 2,
    DOJI : 3,
    BULLISH_ENGULFING: 4,
    BEARISH_ENGULFING: 5,
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
    1 : "HAMMER", //
    2 : "INVERTED_HAMMER",
    3 : "DOJI",
    4 : "BULLISH_ENGULFING",
    5 : "BEARISH_ENGULFING",
});

export const NO_TO_SIGNAL = Object.freeze({
    0 : "",
    1 : "BULLISH",
    2 : "BEARISH",
    3 : "INDECISION",
    4 : "BULLISH_REVERSAL", // Up
    5 : "BEARISH_REVERSAL", // Down
})