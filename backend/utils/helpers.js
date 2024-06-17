const jwt = require('jsonwebtoken');

require('dotenv').config();

const createJWT = (email) => {
    const payload = { email };
    const token = jwt.sign(payload, process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    )
    return token;
}

module.exports = {
    createJWT
}