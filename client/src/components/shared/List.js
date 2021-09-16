import React from "react";
import "./List.css";

// function RankingInfo(props){
//   props.history.push({
//     pathname: "/detail",
//     state: {product: product, price: price, productDetail :productDetail}
//   })
// }


function List({ product, price, productDetail, likeword, hateword }) {
  //console.log("::::::::::::::" + product)
// function mvDetail(props){
//   props.history.push({
//     pathname: "/detail",
//     state: {product: product, price: price, productDetail :productDetail}
//   })
// }

  //onClick={()=>this.props.history.push("/detail")}
  //<div className="List-container" onClick={()=>this.props.history.push({
  //  pathname: "/detail", state: {productname: product}})}>
  //onClick={mvDetail}
  //handleClick={(e) => {onclick(e)}}
  return (

    <div className="List-container">
      <div className="List-item productImage">
        <img src="http://placehold.it/250x200"></img>
      </div>
      <div className="List-item productInfo">
        <div className="List-product product">{product}</div>
        <div className="List-product price">{price}</div>
        <div className="List-product productD">{productDetail}</div>
        <div className="List-product keywords">
          {likeword.map((selected) => (
            <div className="goodKeywords">{selected}</div>
          ))}
          {hateword.map((selected) => (
            <div className="badKeywords">{selected}</div>
          ))}
        </div>
        
      </div>

    </div>
    
       
  );
}

export default List;
