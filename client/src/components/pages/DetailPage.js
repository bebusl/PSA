import Detail from "../shared/Detail";
import { useLocation } from "react-router";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "../container/withAuth";

function DetailPage({ match, isLogin, likeWrd, hateWrd, productlists }) {
    const location = useLocation();
    const product = location.state.product;
    const price = location.state.price;
    const imageUrl = location.state.imageUrl;
    const _id = location.state._id;
    const allKeywords = location.state.allKeywords;
    const [cart, setCart] = useState([]);
    const [isLoading, setLoading] = useState(true);

    //console.log("match.paramas::",match.params);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/product/detail/${match.params.id}`)
            .then((res) => {
                console.log("res: ", res);
            })
            .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        if (isLogin) {
            axios.get("http://localhost:5000/product/wishlistId").then((res) => {
                setCart(res.data.cartlist);
            });
        }
    }, []);

    function wishListOnClick(_id) {
        if (isLogin) {
            axios
                .get(`http://localhost:5000/product/wishlist/${_id}`)
                .then((res) => setCart(res.data.cartlist))
                .catch((e) => console.error(e));
        } else {
            window.alert("로그인이 필요한 서비스입니다!");
        }
    }

    const WordData = Object.keys(allKeywords);
    const CountData = Object.values(allKeywords);
    let posCount = CountData.map((a) => a.POS);
    let negCount = CountData.map((a) => a.NEG);

    var CloudData = [];
    var obj = {};
    for (var i = 0; i < WordData.length; i++) {
        //긍부정으로 나눌지 리뷰 언급 횟수로 나눌지
        //   if(CountData[i].POS > CountData[i].NEG){
        //     obj = {value: WordData[i], count: CountData[i].POS + CountData[i].NEG}  //, props:{style: {color:'blue'}}
        //   }
        //   else if(CountData[i].POS < CountData[i].NEG){
        //     obj = {value: WordData[i], count: CountData[i].POS + CountData[i].NEG}  //, props:{style: {color:'red'}}
        //   }
        //   else{
        //     obj = {value: WordData[i], count: CountData[i].POS + CountData[i].NEG}  //, props:{style: {color:'black'}}
        //   }
        obj = { value: WordData[i], count: CountData[i].POS + CountData[i].NEG };
        CloudData.push(obj);
    }

    //console.log(":::::::::::::::::::::::::",CloudData);

    const PercentData = {
        labels: WordData, //키워드
        datasets: [
            {
                label: "good", //긍정
                data: posCount,
                backgroundColor: "blue",
                stack: "Stack 0",
                // borderColor: [
                //   'rgba(255, 99, 132, 1)',
                //   'rgba(54, 162, 235, 1)',
                //   'rgba(255, 206, 86, 1)',
                //   'rgba(75, 192, 192, 1)',
                //   'rgba(153, 102, 255, 1)',
                //   'rgba(255, 159, 64, 1)',
                // ],
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
                    product={product}
                    price={price}
                    imageUrl={imageUrl}
                    btnMsg="장바구니에 담기"
                    onWishlist={cart.includes(_id)}
                    wishListOnClick={() => wishListOnClick(_id)}
                    defaultdata={CloudData}
                    data={PercentData}
                />
            </div>
        </div>
    );
}

export default withAuth(DetailPage);
