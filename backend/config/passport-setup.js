const passport = require('passport')
const GoogleStrategy = require('passport-google-oidc')

passport.use(
    new GoogleStrategy({
        // Options for the strategy
    }),
    () => {
        // Passport Callback function
    }
)