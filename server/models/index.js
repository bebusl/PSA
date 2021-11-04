const mongoose = require("mongoose");
const { Schema } = mongoose;

const root = encodeURI("root");

mongoose.connect(
    `mongodb://${root}:${root}@mongo/psa?authSource=admin`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, res) {
        if (err) console.log(`DB 연결 실패 ${err}`);
    }
);

const testCollectionSchema = new Schema({ keyword: String, products: [] }, { strict: false });
const productdetailsSchema = new Schema(
    {
        reviews: Schema.Types.Mixed,
        analysis: Schema.Types.Mixed,
    },
    { strict: false }
);
const analysisSchema = new Schema(
    {
        result: [],
    },
    { strict: false }
);

const wishlistSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    wishlist: {
        type: Schema.Types.Array,
        required: true,
    },
});

const reviewsSchema = new Schema({
    reviews: {
        type: Schema.Types.Array,
    }
})

const reviewdetailsSchema = new Schema(
    {
        review: Schema.Types.String,
        analysis: Schema.Types.Mixed,
    },
    { strict: false }
);

const TestCollection = mongoose.model("searchkeywords", testCollectionSchema);
const productdetails = mongoose.model("productdetails", productdetailsSchema);
const analyses = mongoose.model("analysi", analysisSchema);
const wishlists = mongoose.model("wishlists", wishlistSchema);
const reviews = mongoose.model("reviews", reviewsSchema);
const reviewdetails = mongoose.model("reviewdetails", reviewdetailsSchema);

module.exports = { TestCollection, productdetails, analyses, wishlists, reviews, reviewdetails };
