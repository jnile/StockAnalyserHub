import { ChartsManager } from './ChartsManager.js'
import { StockAnalyser } from './StockAnalyser.js'
import { NO_TO_PATTERNS, NO_TO_SIGNAL } from './Enums.js'

const chartManager = new ChartsManager()
const stockAnalyser = new StockAnalyser()

const docEls = {
    stockAnalysisTableBody: document.getElementById("stockAnalysisDataBody"),
}

let chartSelections = {
    "timeInterval": "1min",
    "symbol": "AAPL"
}

let processedData = {}

function onLoad() {
    callAPI()

    let timeIntervalBtns = document.getElementsByClassName("time-interval")

    for (let btn of timeIntervalBtns) {
        btn.addEventListener("click", e => {
            chartSelections.timeInterval = e.target.value
            callAPI()
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

    updateGraph(candles, close, low, high)
    evaluateData(processedData)
}

function updateGraph(candles, close, low, high) {
    // Update graph
    chartManager.lineChart.data.datasets[0].data = candles;
    chartManager.lineChart.data.datasets[1].data = close;
    chartManager.lineChart.data.datasets[2].data = low;
    chartManager.lineChart.data.datasets[3].data = high;
    chartManager.lineChart.update();
}

function evaluateData(data) {
    console.log(data)
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

function updateTableData(res, data) {
    let tr = document.createElement("tr")

    // Time
    let date = new Date(data[2].x)
    appendDataToTable(tr, date.toUTCString())

    // Candle Types
    appendDataToTable(tr, NO_TO_PATTERNS[res.oneC.type ? res.oneC.type : 0])
    appendDataToTable(tr, NO_TO_PATTERNS[res.twoC.type ? res.twoC.type : 0])
    appendDataToTable(tr, NO_TO_PATTERNS[res.threeC.type ? res.threeC.type : 0])

    // Candle Signal
    appendDataToTable(tr, NO_TO_SIGNAL[res.oneC.signal ? res.oneC.signal : 0], NO_TO_SIGNAL[res.oneC.signal ? res.oneC.signal : 0])
    appendDataToTable(tr, NO_TO_SIGNAL[res.twoC.signal ? res.twoC.signal : 0], NO_TO_SIGNAL[res.twoC.signal ? res.twoC.signal : 0])
    appendDataToTable(tr, NO_TO_SIGNAL[res.threeC.signal ? res.threeC.signal : 0], NO_TO_SIGNAL[res.threeC.signal ? res.threeC.signal : 0])

    // Candle Volume
    appendDataToTable(tr, data[2].v)
    appendDataToTable(tr, data[1].v)
    appendDataToTable(tr, data[0].v)

    // Best Decision
    appendDataToTable(tr, "TBD")

    docEls.stockAnalysisTableBody.appendChild(tr)
}

function appendDataToTable(tr, data, ...args) {
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