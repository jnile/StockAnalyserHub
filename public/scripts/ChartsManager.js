export class ChartsManager{
    charts = {
        "candlestick" : "",
        "line" : "",
    }

    chartsContainerEls = {
        "candlestick" : document.getElementById("stockChartContainer"),
        "line" : document.getElementById("stockLineChartContainer"),
    }

    constructor() {
        this.createCandlestickChart()
        this.createLineChart()
    }

    createLineChart() {
        const ctx = document.getElementById("stockLineChart").getContext("2d");

        // Chart.js setup
        this.charts.line = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [{
                    label: 'Close',
                    borderWidth: 1,
                    pointRadius: 0,
                    borderColor: "#fff2388e",
                    data: [],
                }, {
                    label: 'Low',
                    borderWidth: 1,
                    pointRadius: 0,
                    borderColor: "#ff2c2cd0",
                    data: []
                }, {
                    label: 'High',
                    borderWidth: 1,
                    pointRadius: 0,
                    borderColor: "#55ff22d0",
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
                        },
                        beginAtZero: false,
                    }
                }
            }
        });
    }

    createCandlestickChart() {
        const ctx = document.getElementById("stockChart").getContext("2d");

        // Chart.js setup
        this.charts.candlestick = new Chart(ctx, {
            type: "candlestick",
            data: {
                datasets: [{
                    label: 'AAPL Candles',
                    data: [], // will be filled with OHLC data
                    barThickness: 6,   // controls candle width
                    maxBarThickness: 8 // prevents candles from being fat
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
                        },
                        beginAtZero: false,
                    }
                }
            }
        });
    }

    updateStockCharts(candlestick_data,
        close_Data,
        low_data,
        high_data
    ) {
        this.charts.candlestick.data.datasets[0].data = candlestick_data;
        
        this.charts.line.data.datasets[0].data = close_Data;
        this.charts.line.data.datasets[1].data = low_data;
        this.charts.line.data.datasets[2].data = high_data;

        this.charts.candlestick.update();
        this.charts.line.update();
    }

    displayChart(chartType) {
        for (const [key, value] of Object.entries(this.chartsContainerEls)) {
            value.style.display = "none";
        }

        this.chartsContainerEls[chartType].style.display = "block";
    }
}
