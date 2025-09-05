// url: /
const express = require("express");

const router = express.Router();

// Home
router.route("/").get((req, res, next) => {
    console.log(`[server] [response] Render Stock Analysis Website`);
    res.render("hub");
});

router.route("/patterns").get((req, res, next) => {
    console.log(`[server] [response] Render Patterns Page`);
    res.render("patterns");
});

const apiRouter = require('./api')
router.use('/api', apiRouter)

module.exports = router;