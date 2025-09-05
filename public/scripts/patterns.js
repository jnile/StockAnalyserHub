import { appendDataToTableRow } from "./Utiity.js"

const docEls = {
    oneCandleStickTableBody : document.getElementById("oneCandlePatternsTableBody"),
}

const candlestickPatterns = {
    one_stick : [
            {
                name: "Bullish Marubozu",
                img: "/images/candlestick_patterns/Green_marubozu.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Dragonfly Doji",
                img: "/images/candlestick_patterns/Green_doji.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Hammer",
                img: "/images/candlestick_patterns/Green_hammer.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Bullish Spinning Top",
                img: "/images/candlestick_patterns/Green_spinning_top.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Inverted Hammer",
                img: "/images/candlestick_patterns/Green_inverted_hammer.png",
                trend: "Green",
                signal: "Bullish",
                notes: ""
            },
            {
                name: "Doji",
                img: "/images/candlestick_patterns/Doji.png",
                trend: "Grey",
                signal: "Indecision",
                notes: ""
            },
            {
                name: "Hanging Man",
                img: "/images/candlestick_patterns/Red_handing_man.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Bearish Spinning Top",
                img: "/images/candlestick_patterns/Red_spinning_top.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Inverted Hammer",
                img: "/images/candlestick_patterns/Red_inverted_hammer.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Gavestone Doji",
                img: "/images/candlestick_patterns/Red_doji.png",
                trend: "Red",
                signal: "Bearish",
                notes: ""
            },
            {
                name: "Bearish Marubozu",
                img: "/images/candlestick_patterns/Red_marubozu.png",
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
