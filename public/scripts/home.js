import { ChartsManager } from './ChartsManager.js'
import { StockAnalyser } from './StockAnalyser.js'
import { NO_TO_PATTERNS, NO_TO_SIGNAL } from './Enums.js'

const chartManager = new ChartsManager()
const stockAnalyser = new StockAnalyser()

const docEls = {
    stockAnalysisTableBody: document.getElementById("stockAnalysisDataBody"),
}

let chartSelections = {
    "chartType": "candlestick",
    "timeInterval": "1min",
    "symbol": "AAPL"
}

let processedData = {}

function onLoad() {
    callAPI()

    addOnclickEvents()
    chartManager.displayChart("candlestick")
}

function addOnclickEvents() {
    // Chart type Buttons
    let chartTypesBtns = document.getElementsByClassName("chart-type")

    for (let btn of chartTypesBtns) {
        btn.addEventListener("click", e => {
            chartSelections.chartType = e.target.value
            chartManager.displayChart(e.target.value)

            for (let resetBtn of chartTypesBtns) {
                resetBtn.classList.remove("active")
            }

            e.target.classList.add("active")
        })
    }

    // Time Interval Buttons
    let timeIntervalBtns = document.getElementsByClassName("time-interval")

    for (let btn of timeIntervalBtns) {
        btn.addEventListener("click", e => {
            chartSelections.timeInterval = e.target.value
            callAPI()

            for (let resetBtn of timeIntervalBtns) {
                resetBtn.classList.remove("active")
            }

            e.target.classList.add("active")
        })
    }
}

async function callAPI(){
    let url = "/api/quote?"

    url += `symbol=${chartSelections.symbol}&`
    url += `timeInterval=${chartSelections.timeInterval}`

    fetch(url, {})
        .then(res => {
            console.log(res)
            return res.json()})
        .then(data => {
            console.log(data)
            processData(data)
        })
}

// Process and display data
function processData(data) {
    const timeSeries = data[`Time Series (${chartSelections.timeInterval})`];
    
    const candles = [];
    const close = []
    const low = []
    const high = []

    for (let timestamp in timeSeries) {
        const ohlc = timeSeries[timestamp];
        
        candles.push({
            x: new Date(timestamp),
            o: parseFloat(ohlc["1. open"]),
            h: parseFloat(ohlc["2. high"]),
            l: parseFloat(ohlc["3. low"]),
            c: parseFloat(ohlc["4. close"]),
            v: parseInt(ohlc["5. volume"])
        });

        close.push({
            x: new Date(timestamp),
            y: parseFloat(ohlc["4. close"])
        })

        low.push({
            x: new Date(timestamp),
            y: parseFloat(ohlc["3. low"])
        })

        high.push({
            x: new Date(timestamp),
            y: parseFloat(ohlc["2. high"])
        })
    }

    // Update chart
    // Sort by time ascending
    candles.sort((a, b) => a.x - b.x);

    processedData = candles

    chartManager.updateStockCharts(candles, close, low, high)
    evaluateData(processedData)
}

// Take processed data and use it
function evaluateData(data) {
    for (let i = 0; i < data.length - 2; i++) {
        const res = stockAnalyser.analyseData([
            data[i],
            data[i+1],
            data[i+2]
        ])

        // Update table
        updateTableData(res, [
            data[i],
            data[i + 1],
            data[i + 2],
        ])
    }
}

// Add Table Row
function updateTableData(res, data) {
    let tr = document.createElement("tr")

    // Time
    let date = new Date(data[2].x)
    appendDataToTableRow(tr, date.toUTCString())

    // Candle Types
    appendDataToTableRow(tr, NO_TO_PATTERNS[res.oneC.type])
    appendDataToTableRow(tr, NO_TO_PATTERNS[res.twoC.type])
    appendDataToTableRow(tr, NO_TO_PATTERNS[res.threeC.type])

    // Candle Signal
    appendDataToTableRow(tr, NO_TO_SIGNAL[res.oneC.signal], NO_TO_SIGNAL[res.oneC.signal])
    appendDataToTableRow(tr, NO_TO_SIGNAL[res.twoC.signal], NO_TO_SIGNAL[res.twoC.signal])
    appendDataToTableRow(tr, NO_TO_SIGNAL[res.threeC.signal], NO_TO_SIGNAL[res.threeC.signal])

    // Candle Volume
    appendDataToTableRow(tr, data[2].v)
    appendDataToTableRow(tr, data[1].v)
    appendDataToTableRow(tr, data[0].v)

    // Best Decision
    appendDataToTableRow(tr, "TBD")

    docEls.stockAnalysisTableBody.appendChild(tr)
}

function appendDataToTableRow(tr, data, ...args) {
    let td = document.createElement("td")
    td.innerText = data
    args.forEach(x => {
        if (x != "") {
            td.classList.add(x)
        }
    })

    tr.appendChild(td)
}

onLoad()