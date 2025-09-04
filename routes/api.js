// url: /api
require('dotenv').config()
const express = require("express");

const oneMinute = require("../private/oneMinuteData.json")
const fiveMinute = require("../private/fiveMinuteData.json")
const fifthteenMinute = require("../private/fifthteenMinuteData.json")
const thirtyMinute = require("../private/thirtyMinuteData.json")
const sixtyMinute = require("../private/sixtyMinuteData.json")

const router = express.Router();
const apiKey = process.env.ALPHAVENTURE_API_KEY

const financeAPIURL = "https://www.alphavantage.co/"
const devMode = process.env.DEV_MODE


router.route("/").get((req, res, next) => {
    console.log(`[server] [response] Api call`);
    res.json({
        "msg": "Successfully called"
    })
});

router.route("/quote").get((req, res, next) => {
    console.log(`[server] [response] [DevMode:${devMode}] Api call with query`);
    
    if (devMode == "true") {
        let interval = req.query["timeInterval"]
        
        if (interval == "1min") {
            res.json(oneMinute)
        } else if (interval == "5min") {
            res.json(fiveMinute)
        } else if (interval == "15min") {
            res.json(fifthteenMinute)
        } else if (interval == "30min") {
            res.json(thirtyMinute)
        } else {
            res.json(sixtyMinute)
        }

        return
    }

    let symbol = req.query["symbol"]
    let interval = req.query["timeInterval"]

    let query = "query?function=TIME_SERIES_INTRADAY"

    query += `&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`

    fetch(financeAPIURL + query, {})
        .then(res => res.json())
        .then(data => {
            res.json(data)
        })
});

module.exports = router;