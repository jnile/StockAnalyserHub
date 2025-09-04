const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.static("public"))
app.use(cors())

global.STATIC_DIR = __dirname + "\\public"

app.set('view engine', 'ejs')

//Pre-request logger
app.use(function (req, res, next) {
    console.log("---- ---- ---- ----")
    if(req.method == "GET") {
        console.log(`[server] ${req.method} ${req.url}`)
    } else if(req.method == "POST") {
        console.log(`[server] ${req.method} ${req.url}`)
        console.log(JSON.stringify(req.body))
    } else {
        console.log(`[server] ${req.method} ${req.url}`)
        console.log(JSON.stringify(req.body))
    }

    next()
})

//Assigning Routes
const appRouter = require('./routes/home')
app.use('/', appRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT)