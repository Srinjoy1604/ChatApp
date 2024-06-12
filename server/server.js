const express = require('express')
const app = express()

const connectDB = require('./db/db.config')

app.get('/healthCheck', (req, res) => {
    res.status(200).json({ message: "server running ok" })
})

const PORT = process.env.PORT || 9000

app.listen(PORT, async () => {
    console.log(`server running -> PORT:${PORT}`)
    await connectDB()
})