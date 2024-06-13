const express = require('express')
const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
const connectDB = require('./db/db.config')

const userRouter = require('./routes/user.route')
const passportRouter = require('./routes/passport.route')

const app = express()

app.set('view engine', 'ejs');

app.get('/healthCheck', (req, res) => {
    res.status(200).json({ message: "server running ok" })
})

app.use('/api', userRouter)
app.use('/auth', passportRouter)

app.get('/', (req, res) => {
    res.render('base')
})

app.get('/newroute', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('authenticated');
    }
    res.send("ok")
})

const PORT = process.env.PORT || 9000

app.listen(PORT, async () => {
    console.log(`server running -> PORT:${PORT}`)
    await connectDB()
})
