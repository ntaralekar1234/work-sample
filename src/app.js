const path = require("path")
const express = require('express')
require('./db/mongodb')

const routes = require('./routes/api')


const app = express()
const port = process.env.PORT

const publicDirPath = path.join(__dirname,'../public')

const base_path = "/api"

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.use(express.json())
app.use(base_path,routes)

app.listen(port,() => {
    console.log(`server running on port ${port}`)
})