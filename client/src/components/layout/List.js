import React from "react";
import "./List.css";

function List({ likeword, hateword }) {
  var product = ["제품 이름"];
  var productDetail = ["상세 정보"];
  var price = ["가격"];
  console.log(likeword, hateword);
  return (
    <div className="List-container">
      <div className="List-item productImage">
        <img src="http://placehold.it/250x200"></img>
      </div>
      <div className="List-item productInfo">
        <div className="List-product product">{product} </div>
        <div className="List-product price">{price}</div>
        <div className="List-product productD">{productDetail}</div>
        <div className="List-product ketwords">
          선택한 키워드
          {likeword.map((selected) => (
            <div className="goodKeywords">{selected}</div>
          ))}
          {hateword.map((selected) => (
            <div className="badKeywords">{selected}</div>
          ))}
        </div>
      </div>
      <div className="List-item sBasket">
        <button type="button">장바구니</button>
      </div>
    </div>
  );
}

export default List;
