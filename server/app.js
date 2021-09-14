const COOKIE_SECRET = require("./env").COOKIE_SECRET;
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const userRouter = require("./routes/user");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(cookieParser(COOKIE_SECRET));
app.use(passport.initialize());
require("./passport/config")(passport);

app.use("/auth", userRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(500);
    res.send("500", err.message);
});

module.exports = app;
