import List from "../components/shared/List";
import axios from "axios";
import { useEffect, useState } from "react";

function Ranking({ history, isLogin, productlists = [] }) {
  const [cart, setCart] = useState([]);
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

  return (
    <div>
      <h2>랭킹페이지</h2>
      <h5>고객님께 알맞은 상품을 찾았어요</h5>
      {productlists &&
        productlists.map((product, idx) => {
          const {
            _id,
            name,
            price,
            imageUrl,
            posKeywords,
            negKeywords,
            allKeywords,
          } = product;
          return (
            <List
              key={idx}
              product={name}
              price={price}
              imageUrl={imageUrl}
              negKeywords={negKeywords}
              posKeywords={posKeywords}
              onWishlist={cart.includes(_id)}
              btnMsg="장바구니에 담기"
              wishListOnClick={() => wishListOnClick(_id)}
            >
              <div
                className="List-product"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  history.push({
                    pathname: `/detail/${_id}`,
                    state: {
                      product: name,
                      price: price,
                      imageUrl: imageUrl,
                      _id: _id,
                      allKeywords: allKeywords,
                    },
                  });
                }}
              >
                상세페이지 보기
              </div>
            </List>
          );
        })}
    </div>
  );
}

export default Ranking;
//product, price, productDetail, likeword, hateword
