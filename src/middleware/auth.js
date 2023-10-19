const {User} = require("../../db/models");
const {verifyToken} = require("../lib/jwt");
module.exports = {
    isAuth: async (req, res, next) => {
        const token = req.headers.authorization;
        if(!token){
            return res.sendStatus(401);
        }
        const id = verifyToken(token)
        if (!id) {
            return res.sendStatus(401);
        }
        if(!await User.findByPk(id, null)){
            return res.sendStatus(401);
        }
        next();
    }
}