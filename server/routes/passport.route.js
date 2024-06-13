const express = require('express');
const passport = require('passport')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth20')
require('dotenv').config()

const router = express.Router();

// Saves user into session
passport.serializeUser((user, done) => {
    done(null, user)
})

// Retrieve user from session
passport.deserializeUser((user, done) => {
    done(null, user)
})

router.use(session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}))

router.use(passport.initialize())
router.use(passport.session())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    // Here you would save the profile information to your database
    // For now, we just log the profile
    // console.log('Google profile:', profile)
    console.log(profile);
    done(null, profile)
}))

router.get('/login', passport.authenticate('google', { scope: ['profile'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/auth/profile')
    }
)
router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        // console.log(req.user)
        res.send('login successful')
    } else {
        res.redirect('/')
    }
})

module.exports = router;
