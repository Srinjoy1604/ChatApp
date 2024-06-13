const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

const createToken = (_id) => {
    return sign({ _id }, process.env.SECRET_KEY)
}

const getAllUsers = (req, res) => {
    res.json({ message: "ok" })
}

const registerUser = async (req, res) => {
    try {
        const { email, password, cPassword } = req.body
        const user = await User.register({ email, password, cPassword })
        const token = createToken(user._id)
        if (token === undefined) throw new Error('Token not created')
        res.cookie(email.toString(), token, { httpOnly: true })
        res.status(200).json({ message: 'registration successfull' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login({ email, password });
        const token = createToken(user._id);
        if (user.sessionHistory) {
            console.log("sessionHistory exists");
            res.cookie(email, token, { httpOnly: true }).status(200).json({
                sessionHistory: user.sessionHistory,
                user: email,
                token: token,
                message: 'login successful'
            });
        } else {
            res.cookie(email, token, { httpOnly: true }).status(200).json({
                user: email,
                token: token,
                message: 'login successful'
            });
        }
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}


const updateUser = () => {

}

const deleteUser = () => {

}

const logoutUser = async (req, res) => {
    const { email } = req.body;
    res.clearCookie(email.toString())
    res.status(200).json({ message: 'Logout successful' })
}

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
}