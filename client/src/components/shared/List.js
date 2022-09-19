import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
function List({
  children,
  product,
  price,
  posKeywords,
  negKeywords,
  onWishlist,
  wishListOnClick,
  btnMsg,
  imageUrl = "http://placehold.it/250x200",
}) {
  return (
    <div className="List-container">
      <div className="List-item productImage">
        <img src={imageUrl} alt={product}></img>
      </div>
      <div className="List-item productInfo">
        <div className="List-product product">{product} </div>
        <div className="List-product price">{price}원</div>
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
          style={
            onWishlist
              ? {
                  backgroundColor: "lightgrey",
                  borderRadius: 10,
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }
              : {
                  backgroundColor: "#0A1B62",
                  borderRadius: 10,
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  cursor: "pointer",
                }
          }
        >
          {btnMsg ? (
            <FaCartPlus color="white" size="1.5rem" />
          ) : (
            <MdRemoveShoppingCart color="white" size="1.5rem" />
          )}
        </button>
      </div>
    </div>
  );
}

export default List;
