import React from "react";
import "./List.css";

function List({
  product,
  price,
  productDetail,
  likeword,
  hateword,
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
        <div className="List-product productD">디테일들어갈 곳</div>
        <div className="List-product ketwords">
          {/*likeword.map((selected) => (
            <div className="goodKeywords">{selected}</div>
          ))}
          {hateword.map((selected) => (
            <div className="badKeywords">{selected}</div>
          ))*/}
        </div>
      </div>
      <div className="List-item sBasket">
        <button type="button">장바구니</button>
      </div>
    </div>
  );
}

export default List;
