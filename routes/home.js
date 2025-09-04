// url: /apps/loastats
const express = require("express");

const router = express.Router();

// Home
router.route("/").get((req, res, next) => {
    console.log(`[server] [response] Render Stock Analysis Website`);
    res.render("hub");
});

const apiRouter = require('./api')
router.use('/api', apiRouter)

module.exports = router;