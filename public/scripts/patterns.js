import { appendDataToTableRow } from "./Utility.js"

const docEls = {
    oneCandleStickTableBody : document.getElementById("oneCandlePatternsTableBody"),
}

const imageUrl = "/images/candlestick_patterns"

const candlestickPatterns = {
    one_stick : [
            {
                name: "Bullish Marubozu",
                img: imageUrl + "/Green_marubozu.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Dragonfly Doji",
                img: imageUrl + "/Green_doji.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Hammer",
                img: imageUrl + "/Green_hammer.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Bullish Spinning Top",
                img: imageUrl + "/Green_spinning_top.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Inverted Hammer",
                img: imageUrl + "/Green_inverted_hammer.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Doji",
                img: imageUrl + "/Doji.png",
                trend: "Grey",
                signal: "Indecision",
                notes: ""
            },
            {
                name: "Hanging Man",
                img: imageUrl + "/Red_handing_man.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Bearish Spinning Top",
                img: imageUrl + "/Red_spinning_top.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Bearish Inverted Hammer",
                img: imageUrl + "/Red_inverted_hammer.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Gravestone Doji",
                img: imageUrl + "/Red_doji.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Bearish Marubozu",
                img: imageUrl + "/Red_marubozu.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
    ]
}

onload()

function onload() {
    addOneCandlestickPatterns()
}

function addOneCandlestickPatterns() {
    for (let item of candlestickPatterns.one_stick) {
        updateTableData(item, docEls.oneCandleStickTableBody)
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
