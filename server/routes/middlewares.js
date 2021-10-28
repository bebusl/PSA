const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../env").JWT_SECRET;
const User = require("../models/user");

const jwtMiddleware = async (req, res, next) => {
    let token = req.cookies.x_auth;
    if (!token || token.length == 0) {
        return res.status(400).json({ error: "저장된 token이 없습니다." });
    }
    await jwt.verify(token, JWT_SECRET, async (error, decoded) => {
        if (error) {
            return res.cookie("x_auth", "").status(300).json({ error: "token을 decode하는데 실패했습니다." });
        }
        await User.findOne({ email: decoded.email }, (error, user) => {
            if (error) {
                return res.cookie("x_auth", "").json({ error: "DB에서 회원정보를 찾는 도중 오류가 발생햇습니다." });
            }
            if (!user) {
                return res
                    .cookie("x_auth", "")
                    .status(300)
                    .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다." });
            }
            if (user) {
                req.token = token;
                req.userEmail = user.email;
                req.name = user.name;
            }
        });
    });
    next();
};

module.exports = jwtMiddleware;
