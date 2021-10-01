import React from "react";
import "./List.css";

function List({
    children,
    product,
    price,
    posKeywords,
    negKeywords,
    onWishlist,
    btnMsg,
    wishListOnClick,
    imageUrl = "http://placehold.it/250x200",
}) {
    return (
        <div className="List-container">
            <div className="List-item productImage">
                <img src={imageUrl}></img>
            </div>
            <div className="List-item productInfo">
                <div className="List-product product">{product} </div>
                <div className="List-product price">{price}</div>
                {/* <div className="List-product productD">디테일들어갈 곳</div> */}
                {children}
                <div className="List-product keywords">
                    {posKeywords &&
                        posKeywords.map((selected, idx) => (
                            <div className="goodKeywords" key={`good-${idx}`}>
                                {selected}
                            </div>
                        ))}
                    {negKeywords &&
                        negKeywords.map((selected, idx) => (
                            <div className="badKeywords" key={`bad-${idx}`}>
                                {selected}
                            </div>
                        ))}
                    {/*likeword.map((selected) => (
            <div className="goodKeywords">{selected}</div>
          ))}
          {hateword.map((selected) => (
            <div className="badKeywords">{selected}</div>
          ))*/}
                </div>
            </div>
            <div className="List-item sBasket">
                <button
                    type="button"
                    disabled={onWishlist}
                    onClick={(e) => {
                        e.preventDefault();
                        wishListOnClick();
                    }}
                >
                    {onWishlist ? "이미 장바구니에 담긴 상품입니다." : btnMsg}
                </button>
            </div>
        </div>
    );
}

export default List;
