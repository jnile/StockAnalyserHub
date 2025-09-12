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
            name: "Bullish Marubozu",
            img: imageUrl + "/double" + "/Green_marubozu.png",
            trend: "Green",
            signal: "Bullish",
            notes: ""
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
