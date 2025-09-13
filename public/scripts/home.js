import { ChartsManager } from './ChartsManager.js'
import { StockAnalyser } from './StockAnalyser.js'
import { NO_TO_PATTERNS, NO_TO_SIGNAL, NO_TO_TREND } from './Enums.js'
import { appendDataToTableRow } from './Utility.js'
import { Candlestick } from './Candlestick.js'

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
    const candlesticks = [];
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

        candlesticks.push(new Candlestick(
            new Date(timestamp),
            parseFloat(ohlc["1. open"]),
            parseFloat(ohlc["2. high"]),
            parseFloat(ohlc["3. low"]),
            parseFloat(ohlc["4. close"]),
            parseInt(ohlc["5. volume"])
        ));
    }

    // Update chart
    // Sort by time ascending
    candles.sort((a, b) => a.x - b.x);

    processedData = candlesticks

    chartManager.updateStockCharts(candles, close, low, high)
    evaluateData(processedData)
}

/**
 * Evaluates data for analysing and patterns
 * @param {Candlestick[]} data 
 */
function evaluateData(data) {
    for (let i = 0; i < data.length - 2; i++) {
        let chrono_data = [data[i], data[i+1], data[i+2]]

        const res = stockAnalyser.analyseData(chrono_data)

        // Update table
        updateTableData(res, chrono_data)
    }
}

/**
 * 
 * @param {*} res 
 * @param {Candlestick[]} data 
 */
function updateTableData(res, data) {
    let tr = document.createElement("tr")

    // Time
    let date = new Date(data[2].time)
    appendDataToTableRow(tr, date.toString())

    // Candle Types/Patterns
    appendDataToTableRow(tr, NO_TO_PATTERNS[res.firstC.type], NO_TO_TREND[res.firstC.trend])
    appendDataToTableRow(tr, NO_TO_PATTERNS[res.doubleCandles.type], NO_TO_TREND[res.doubleCandles.trend])
    appendDataToTableRow(tr, NO_TO_PATTERNS[0])

    // Candle Signal
    appendDataToTableRow(tr, NO_TO_SIGNAL[res.firstC.trend], NO_TO_SIGNAL[res.firstC.trend])
    appendDataToTableRow(tr, NO_TO_SIGNAL[res.doubleCandles.trend], NO_TO_SIGNAL[res.doubleCandles.trend])
    appendDataToTableRow(tr, NO_TO_SIGNAL[0], NO_TO_SIGNAL[0])

    // Candle Volume
    appendDataToTableRow(tr, data[2].volume)
    appendDataToTableRow(tr, data[1].volume)
    appendDataToTableRow(tr, data[0].volume)

    // Best Decision
    appendDataToTableRow(tr, "TBD")

    docEls.stockAnalysisTableBody.appendChild(tr)
}


onLoad()