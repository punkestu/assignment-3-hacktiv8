require("dotenv").config();
const {sign, verify} = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(payload) {
    return sign(payload, SECRET_KEY)
}

function verifyToken(token) {
    return verify(token, SECRET_KEY)
}

module.exports = {
    generateToken,
    verifyToken
}