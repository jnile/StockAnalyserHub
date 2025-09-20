import { appendDataToTableRow } from "./Utility.js"

const docEls = {
    singleCandleStickTableBody : document.getElementById("singleCandlePatternsTableBody"),
    doubleCandleStickTableBody : document.getElementById("doubleCandlePatternsTableBody"),
}

const imageUrl = "/images/candlestick_patterns"

const candlestickPatterns = {
    single_stick : [
            {
                name: "Bullish Marubozu",
                img: imageUrl + "/single" + "/Green_marubozu.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Dragonfly Doji",
                img: imageUrl + "/single"  + "/Green_doji.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Hammer",
                img: imageUrl + "/single"  + "/Green_hammer.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Bullish Spinning Top",
                img: imageUrl + "/single"  + "/Green_spinning_top.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Inverted Hammer",
                img: imageUrl + "/single"  + "/Green_inverted_hammer.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Doji",
                img: imageUrl + "/single"  + "/Doji.png",
                trend: "Grey",
                signal: "Indecision",
                notes: ""
            },
            {
                name: "Hanging Man",
                img: imageUrl + "/single"  + "/Red_handing_man.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Bearish Spinning Top",
                img: imageUrl + "/single"  + "/Red_spinning_top.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Bearish Inverted Hammer",
                img: imageUrl + "/single"  + "/Red_inverted_hammer.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Gravestone Doji",
                img: imageUrl + "/single"  + "/Red_doji.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Bearish Marubozu",
                img: imageUrl + "/single"  + "/Red_marubozu.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
    ],

    double_sticks : [
        {
            name: "Tweezer Tops",
            img: imageUrl + "/double" + "/TweezerTops.png",
            trend: "Green - Red",
            signal: "Bearish",
            notes: "Pattern occured after a prolonged uptrend makes this more reliable that the trend will do downwards"
        },
        {
            name: "Tweezer Bottom",
            img: imageUrl + "/double" + "/TweezerBottom.png",
            trend: "Red-Green",
            signal: "Bullish",
            notes: "Pattern occured after a prolonged downwards trend makes this more reliable that the trend will do upwards"
        },
        {
            name: "Bearish Engulfing",
            img: imageUrl + "/double" + "/bearish_engulfing.png",
            trend: "Green - Red",
            signal: "Bearish",
            notes: "More reliable after an upwards trend"
        },
        {
            name: "Bullish Engulfing",
            img: imageUrl + "/double" + "/bullish_engulfing.png",
            trend: "Red - Green",
            signal: "Bullish",
            notes: "More reliable after a downwards trend"
        },
        {
            name: "Bearish Kicking",
            img: imageUrl + "/double" + "/bearish_kicking_pattern.png",
            trend: "Green - Red",
            signal: "Bearish",
            notes: "Usually at the start or end of a trend"
        },
        {
            name: "Bullish Kicking",
            img: imageUrl + "/double" + "/bullish_kicking_pattern.png",
            trend: "Red - Green",
            signal: "Bullish",
            notes: "Usually at the start or end of a trend"
        },
        {
            name: "Bullish Harami Line",
            img: imageUrl + "/double" + "/bullish_harami.png",
            trend: "Red - Green",
            signal: "Bullish",
            notes: "Relatively weak reversal pattern, and should use other indicators"
        },
        {
            name: "Bearish Harami Line",
            img: imageUrl + "/double" + "/bearish_harami_line.png",
            trend: "Green - Red",
            signal: "Bearish",
            notes: "Relatively weak reversal pattern, and should use other indicators"
        },
        {
            name: "Piercing Line Patterns",
            img: imageUrl + "/double" + "/piercing_line.png",
            trend: "Red - Green",
            signal: "Bullish",
            notes: "Reversal indicator to bullish. Latest stick closes above 50% of the previous stick's body."
        },
        {
            name: "Dark Cloud Cover",
            img: imageUrl + "/double" + "/dark_cloud_cover.png",
            trend: "Green - Red",
            signal: "Bearish",
            notes: "Reversal indicator to bearish. Latest stick closes below 50% of the previous stick's body."
        },
        {
            name: "Matching Low",
            img: imageUrl + "/double" + "/matching_low.png",
            trend: "Red - Red",
            signal: "Bullish",
            notes: "Indicated the bearish trend is slowing down / weak reversal"
        },
    ]
}

onload()

function onload() {
    addSingleCandlestickPatterns()
    addDoubleCandlestickPatterns()
}

function addSingleCandlestickPatterns() {
    for (let item of candlestickPatterns.single_stick) {
        updateTableData(item, docEls.singleCandleStickTableBody)
    }
}

function addDoubleCandlestickPatterns() {
    for (let item of candlestickPatterns.double_sticks) {
        updateTableData(item, docEls.doubleCandleStickTableBody)
    }
}

// Add Table Row
function updateTableData(data, tableBodyEl) {
    let tr = document.createElement("tr")

    // Time
    appendDataToTableRow(tr, data.name)

    let img = `<img class='table_img' src='${data.img}'>`
    appendDataToTableRow(tr, img)
    
    appendDataToTableRow(tr, data.trend)
    appendDataToTableRow(tr, data.signal)
    appendDataToTableRow(tr, data.notes)

    

    tableBodyEl.appendChild(tr)
}
