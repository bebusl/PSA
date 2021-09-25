const router = require("express").Router();
const { productdetails, analyses, wishlists } = require("../models/index");
const ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
const jwtMiddleware = require("./middlewares");
//detail

const getProductInfo = async (id) => {
    try {
        let product = await productdetails.findById(ObjectId(id));
        const analy = await analyses.findById(product.analysis["oid"]);
        const { _id, imageUrl, name, price, url } = product._doc;
        const keywords = analy["result"][0];

        return { _id, imageUrl, name, price, url, keywords };
    } catch (error) {
        return "error";
    }
};

router.get("/detail/:id", async (req, res) => {
    const { id } = req.params;
    const product = await getProductInfo(id);
    return res.status(200).json({ success: true, data: product });
});

router.get("/wishlist/:userEmail/:id", async (req, res) => {
    const { id, userEmail } = req.params;
    const product = await getProductInfo(id);
    try {
        await wishlists
            .updateOne({ userEmail: userEmail }, { $push: { wishlist: product } })
            .catch((error) => console.log(error));
        const _wishlist = await wishlists.findOne({ userEmail: userEmail });

        const wishlistId = _wishlist.wishlist.reduce((accumulator, cur) => {
            accumulator.push(cur._id.toString());
            return accumulator;
        }, []);
        return res.json({ success: true, cartlist: wishlistId });
    } catch (error) {
        console.error("장바구니 리스트", error);
    }
}); //wishlist 추가하는거.

router.get("/wishlistId", jwtMiddleware, async (req, res) => {
    const userEmail = req.userEmail;
    const _wishlist = await wishlists.findOne({ userEmail: userEmail });
    const wishlistId = _wishlist.wishlist.reduce((accumulator, cur) => {
        accumulator.push(cur._id.toString());
        return accumulator;
    }, []);

    return res.json({ succes: true, cartlist: wishlistId });
}); //rankingpages에서 wishlist Id만 필요할 때.

router.get("/wishlist", jwtMiddleware, async (req, res) => {
    const userEmail = req.userEmail;
    const _wishlist = await wishlists.findOne({ userEmail: userEmail });

    return res.json({ succes: true, cartlist: _wishlist.wishlist });
});

module.exports = router;
