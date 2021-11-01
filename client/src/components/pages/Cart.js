import List from "../shared/List";
import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "../container/withAuth";

function Cart({ isLogin, history }) {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/product/wishlist`)
            .then((res) => {
                console.log(res.data.cartlist);
                setWishlist(res.data.cartlist);
            })
            .catch((e) => {
                window.alert("위시리스트 목록을 가져오는데 실패했습니다. 로그인을 다시 한 후 재시도해주세요");
            });
    }, []);

    function wishListOnClick(_id) {
        if (isLogin) {
            axios
                .delete(`http://localhost:5000/product/wishlist/${_id}`)
                .then((res) => setWishlist(res.data.cartlist))
                .catch((e) => console.error(e));
        } else {
            window.alert("로그인이 필요한 서비스입니다!");
        }
    }

    return (
        <div>
            <h2>Shopping List</h2>
            {wishlist.map((product, idx) => {
                const { name, price, imageUrl, _id } = product;
                return (
                    <List
                        kdy={idx}
                        product={name}
                        price={price}
                        imageUrl={imageUrl}
                        onWishlist={false}
                        btnMsg={"장바구니에서 빼기"}
                        wishListOnClick={() => {
                            wishListOnClick(_id);
                        }}
                    >
                        <div
                            className="List-product"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                                e.preventDefault();
                                history.push(`/wishlistdetail/${idx}`);
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

export default withAuth(Cart);
