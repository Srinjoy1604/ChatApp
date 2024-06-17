const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs')

const validators = require('../utils/validators')
const helpers = require('../utils/helpers')

const registerUser = async (req, res) => {
    try {
        const { name, email, pass, cPass } = req.body
        if (!name || !email || !pass || !cPass) {
            return res.status(400).send({ error: 'unable to find required details' })
        }
        if (pass !== cPass) {
            return res.status(400).send({ error: 'password and confirm password do not match' })
        }
        if (!validators.checkEmail(email)) {
            return res.status(400).send({ error: 'invalid email' })
        }
        if (!validators.checkPass(pass)) {
            return res.status(400).send({ error: 'invalid password' })
        }
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).send({ error: 'user already exists' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(pass, salt)
        const newUser = new UserModel({ name, email, password: hashedPass })
        await newUser.save()
        res.status(200).send({ message: 'user created, proceed to login', })
    } catch (e) {
        res.json({ error: `${e.message}` }).status(400)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email } = req.params;
        const { pass } = req.body
        if (!email || !pass) {
            return res.status(400).send({ error: 'unable to find required details' })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).send({ error: 'invalid credentials' })
        }
        const isMatch = await bcrypt.compare(pass, user.password)
        if (!isMatch) {
            return res.status(400).send({ error: 'invalid credentials' })
        }
        const token = helpers.createJWT(user.email)
        res.status(200).send({
            message: 'login success',
            data: {
                token,
                user: { name: user.name, email: user.email }
            }
        })
    } catch (e) {
        res.status(200).json({ message: `error ${e.message}` })
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email, oPass, newPass } = req.body;

        if (!name || !email || !oPass) {
            return res.status(400).send({ error: 'Unable to find required details' });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'User not in the system' });
        }

        const validPassword = await bcrypt.compare(oPass, user.password);

        if (!validPassword) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        const updateData = { name, email };

        if (newPass) {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(newPass, salt);
            updateData.password = hashedPass;
        }

        await UserModel.updateOne({ email }, updateData);

        return res.status(200).send({ message: 'User updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { email } = req.params
        const { pass } = req.body
        if (!email || !pass) {
            return res.status(400).send({ error: 'unable to find required details' })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).send({ error: 'invalid credentials' })
        }
        const isMatch = await bcrypt.compare(pass, user.password)
        if (!isMatch) {
            return res.status(400).send({ error: 'invalid credentials' })
        }
        await UserModel.deleteOne({ email })
        res.send({ message: 'User deleted' }).status(200)
    } catch (e) {
        res.send({ error: `${e.message}` }).status(400)
    }
}

module.exports = {
    updateUser,
    registerUser,
    loginUser,
    deleteUser
}