// url: /api
require('dotenv').config()
const express = require("express");

const oneMinute = require("../private/oneMinuteData.json")
const fifthteenMinute = require("../private/fifthteenMinuteData.json")

const router = express.Router();
const apiKey = process.env.ALPHAVENTURE_API_KEY

const financeAPIURL = "https://www.alphavantage.co/"
const devMode = process.env.DEV_MODE || true


router.route("/").get((req, res, next) => {
    console.log(`[server] [response] Api call`);
    res.json({
        "msg": "Successfully called"
    })
});

router.route("/quote").get((req, res, next) => {
    console.log(`[server] [response] Api call with query`);
    
    if (devMode) {
        let interval = req.query["timeInterval"]
        if (interval == "1min") {
            res.json(oneMinute)
        } else {
            res.json(fifthteenMinute)
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