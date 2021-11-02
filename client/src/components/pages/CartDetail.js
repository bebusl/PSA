import Detail from "../shared/Detail";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "../container/withAuth";
import { createNotification, Alert } from "../shared/Alert";
function CartDetail({ match, isLogin, history }) {
    const [data, setData] = useState({ product: "", price: "", imageUrl: "", keywords: [], url: "" });
    const [review_list, setReview] = useState({ all: [], selected: [] });
    const [selectKwd, setKwd] = useState("전체");
    useEffect(() => {
        axios
            .get(`http://localhost:5000/product/wishlist/detail/${match.params.idx}`)
            .then((res) => {
                let review_list_ = res.data.data.review_list;
                for (let _i in review_list_) {
                    const i = review_list_[_i];
                    if (i["analysis"].length !== 0) {
                        for (let j in i["analysis"]) {
                            const classname = i["analysis"][j]["POS"] > i["analysis"][j]["NEG"] ? "pos" : "neg";
                            i["review"] = i["review"].replaceAll(j, `<em class=${classname}>${j}</em>`);
                        }
                    }
                }
                setData(res.data.data);
                setReview({ selected: review_list_, all: review_list_ });
            })
            .catch((e) => {
                window.alert("정보를 가져오는데 실패했습니다.");
                history.goBack();
            });
    }, []);

    useEffect(() => {
        if (selectKwd === "전체") {
            setReview({ ...review_list, ["selected"]: review_list["all"] });
        } else {
            let selectedReviews = review_list["all"].reduce((ll, i) => {
                if (selectKwd in i["analysis"]) ll.push(i);
                return ll;
            }, []);

            setReview({ ...review_list, ["selected"]: selectedReviews });
        }
    }, [selectKwd]);

    function wishListOnClick(_id) {
        if (isLogin) {
            axios
                .delete(`http://localhost:5000/product/wishlist/${data._id}`)
                .then((res) => window.alert("삭제"))
                .catch((e) => console.error(e));
        } else {
            window.alert("로그인이 필요한 서비스입니다!");
        }
    }

    const searchBar = () => {
        let options = ["전체"];
        options.push(...Object.keys(data.keywords));
        return options.map((t, idx) => (
            <option value={t} key={`opt-${idx}`}>
                {t}
            </option>
        ));
    };

    const WordData = Object.keys(data.keywords);
    const CountData = Object.values(data.keywords);
    let posCount = CountData.map((a) => a.POS);
    let negCount = CountData.map((a) => a.NEG);

    let CloudData = [];
    let obj = {};

    function sentiment_(pos, neg, neu) {
        if (pos > neg) {
            return "POS";
        } else if (pos < neg) {
            return "NEG";
        } else if (pos === neg) {
            return "NEU";
        }
    }
    const color = { POS: "blue", NEG: "red", NEU: "grey" };
    for (var i = 0; i < WordData.length; i++) {
        const sentiment = sentiment_(CountData[i].POS, CountData[i].NEG, CountData[i].NEU);
        obj = { value: WordData[i], count: CountData[i][sentiment], color: color[sentiment] };
        CloudData.push(obj);
    }
    const PercentData = {
        labels: WordData, //키워드
        datasets: [
            {
                label: "good", //긍정
                data: posCount,
                backgroundColor: "blue",
                stack: "Stack 0",
                borderWidth: 1,
            },
            {
                label: "bad", //부정
                data: negCount,
                backgroundColor: "red",
                stack: "Stack 0",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <div className="List-container">
                <Detail
                    product={data.name}
                    price={data.price}
                    imageUrl={data.imageUrl}
                    btnMsg="장바구니에서 빼기"
                    onWishlist={false}
                    wishListOnClick={(e) => {
                        createNotification("info");
                    }}
                    defaultdata={CloudData}
                    data={PercentData}
                />
            </div>
            <div className="review-container">
                <form>
                    <select
                        onChange={(e) => {
                            e.preventDefault();
                            setKwd(e.target.value);
                        }}
                    >
                        {searchBar()}
                    </select>
                </form>
                {review_list["selected"].map((review, idx) => {
                    return <p key={`review-${idx}`} dangerouslySetInnerHTML={{ __html: review["review"] }}></p>;
                })}
            </div>
            <Alert />
        </div>
    );
}

export default withAuth(CartDetail);
