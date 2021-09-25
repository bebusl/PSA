const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_TOKEN = require("../env").JWT_SECRET;
const User = require("../models/user");
const { wishlists } = require("../models/");
const jwtMiddleware = require("./middlewares");

let errors = {};

const hashingPwd = async (password) => {
    let genSalt = await bcrypt.genSalt(10);
    let hashing = await bcrypt.hash(password, genSalt);
    return hashing;
};

router.get("/", (req, res) => {
    res.send("패스포틑 모듈 테스트");
});

router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then(async (user) => {
        if (user) {
            return res.status(404).json({
                email: "해당 이메일을 가진 사용자가 이미 존재합니다.",
            });
        } else {
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
            });
            const WishList = new wishlists({
                userEmail: req.body.email,
                wishlist: [],
            });

            await hashingPwd(newUser.password)
                .then((hashing) => {
                    newUser.password = hashing;
                })
                .catch((err) => console.log("eror" + err)); //password hashing할 때 사용. 나중에 shema에 methods/statics로 넣어줄 것!
            WishList.save();
            newUser
                .save()
                .then((user) => res.json(user))
                .catch((err) => res.json({ registerSucess: false, message: err }));
        }
    });
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then((user) => {
        if (!user) {
            errors.email = "해당하는 회원이 존재하지 않습니다.";
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = { email: user.email, name: user.name };

                jwt.sign(payload, SECRET_TOKEN, { expiresIn: "7d" }, (err, token) => {
                    user.token = token;
                    user.save((err, user) => {
                        if (err) {
                            res.status(400).json({ error: "jwt token save error. something wrotng" });
                        }
                    });

                    return res
                        .cookie("x_auth", user.token, {
                            maxAge: 1000 * 60 * 60 * 24 * 7,
                        })
                        .status(200)
                        .json({ success: true, userData: { email: user.email, name: user.name } });
                });
            } else {
                errors.password = "패스워드가 일치하지 않습니다.";
                return res.status(400).json(errors);
            }
        });
    });
});

router.get("/logout", jwtMiddleware, (req, res) => {
    return res.cookie("x_auth", "").json({ success: true });
});

router.get("/status", jwtMiddleware, (req, res) => {
    return res.json({ success: true, userData: { email: req.userEmail, name: req.name } });
});

module.exports = router;
