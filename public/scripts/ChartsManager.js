export class ChartsManager{
    lineChart = ""

    constructor() {
        this.createChart()
    }

    createChart() {
        const ctx = document.getElementById("stockChart").getContext("2d");

        // Chart.js setup
        this.lineChart = new Chart(ctx, {
            type: "candlestick",
            data: {
                labels: [],
                datasets: [{
                    label: `AAPL Candles`,
                    data: [], // will be filled with OHLC data
                    barThickness: 6,   // controls candle width
                    maxBarThickness: 8 // prevents candles from being fat
                } , {
                    type: "line",
                    label: 'AAPL Line',
                    borderWidth: 1,
                    pointRadius: 0,
                    data: []
                }, {
                    type: "line",
                    label: 'Low',
                    borderWidth: 1,
                    pointRadius: 0,
                    color: "#ee3c3ca9",
                    data: []
                }, {
                    type: "line",
                    label: 'High',
                    borderWidth: 1,
                    pointRadius: 0,
                    color: "#65ee3ca9",
                    data: []
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: "time",   // important: use time scale
                        time: {
                            unit: "minute",          // show per minute
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10,       // avoid overcrowding
                            source: "auto"
                        },
                        grid: {
                            display: false,
                        },
                    },
                    y: { 
                        title: { 
                            display: true, 
                            text: "Price (USD)"
                        },
                        grid: {
                            color: "#222222ff"
                        }
                    }
                }
            }
        });
    }
}
