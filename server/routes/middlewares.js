const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../env").JWT_SECRET;
const User = require("../models/user");

const jwtMiddleware = (req, res, next) => {
    let token = req.cookies.x_auth;
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(500).json({ error: "token을 decode하는데 실패했습니다." });
        }
        User.findOne({ email: decoded.email }, (error, user) => {
            if (error) {
                return res.json({ error: "DB에서 회원정보를 찾는 도중 오류가 발생햇습니다." });
            }
            if (!user) {
                return res.status(400).json({ isAuth: false, error: "token에 해당하는 유저가 없습니다." });
            }
            if (user) {
                req.token = token;
                req.user = user;
            }
        });
    });
    next();
};

module.exports = jwtMiddleware;
