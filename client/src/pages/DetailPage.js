import Detail from "../components/shared/Detail";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function DetailPage({ match, isLogin, history }) {
  const [data, setData] = useState({
    product: "",
    price: "",
    imageUrl: "",
    keywords: [],
    url: "",
  });
  const [cart, setCart] = useState([]);
  const [review_list, setReview] = useState({ all: [], selected: [] });
  const [selectKwd, setKwd] = useState("전체");

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:5000/product/detail/${match.params.id}`)
      .then((res) => {
        let review_list_ = res.data.data.review_list;
        for (let i_ in review_list_) {
          const i = review_list_[i_];
          if (i["analysis"].length !== 0) {
            for (let j in i["analysis"]) {
              const classname =
                i["analysis"][j]["POS"] > i["analysis"][j]["NEG"]
                  ? "pos"
                  : "neg";
              i["review"] = i["review"].replaceAll(
                j,
                `<em class=${classname}>${j}</em>`
              );
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
    if (isLogin) {
      axios.get("http://localhost:5000/product/wishlistId").then((res) => {
        setCart(res.data.cartlist);
      });
    }
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
        .get(`http://localhost:5000/product/wishlist/${data._id}`)
        .then((res) => setCart(res.data.cartlist))
        .catch((e) => console.error(e));
    } else {
      window.alert("로그인이 필요한 서비스입니다!");
    }
  }

  const searchBar_ = () => {
    let options = ["전체"];
    options.push(...Object.keys(data.keywords));

    return options.map((t, idx) => (
      <span
        className="kwdbtn"
        key={`kwdbtn-${idx}`}
        onClick={(e) => {
          e.preventDefault();
          setKwd(t);
        }}
      >
        {t}
      </span>
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
  const color = { POS: "#006ebe", NEG: "#ef1c1c", NEU: "grey" };
  for (var i = 0; i < WordData.length; i++) {
    const sentiment = sentiment_(
      CountData[i].POS,
      CountData[i].NEG,
      CountData[i].NEU
    );
    obj = {
      value: WordData[i],
      count: CountData[i][sentiment],
      color: color[sentiment],
    };
    CloudData.push(obj);
  }

  const PercentData = {
    labels: WordData.length > 9 ? WordData.slice(0, 10) : WordData, //키워드
    datasets: [
      {
        label: "good", //긍정
        data: posCount,
        backgroundColor: "#006ebe",
        stack: "Stack 0",
        borderWidth: 1,
      },
      {
        label: "bad", //부정
        data: negCount,
        backgroundColor: "#ef1c1c",
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
          url={data.url}
          btnMsg={true}
          onWishlist={cart.includes(data._id)}
          wishListOnClick={() => wishListOnClick(data._id)}
          defaultdata={CloudData}
          data={PercentData}
        />
      </div>
      <div className="review-container">
        <div className="review-nav">
          <span>키워드별 리뷰 보기</span>
          {searchBar_()}
        </div>

        {review_list["selected"].map((review, idx) => {
          return (
            <div className="review-list">
              <p
                key={`review-${idx}`}
                dangerouslySetInnerHTML={{ __html: review["review"] }}
              ></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DetailPage;
