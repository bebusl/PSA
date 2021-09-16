import List from "../shared/List";
import { dummyRankinglist } from "../dummyData";


function Ranking() {
  // function onClick(props){
  //   props.history.push({
  //     pathname: "/detail",
  //     state: {product: product, price: price, productDetail :productDetail}
  //   })
  // }
  //console.log("::::::propsss::::::::::::::"+ this.props)


  return (
    <div>
      <h2>Ranking Page</h2>
      {dummyRankinglist.map((product) => {
        const { productname, price, productDetail, like, hate } = product;
        return (
          <List
            product={productname}
            price={price}
            productDetail={productDetail}
            likeword={like}
            hateword={hate}
            
          />
        );
      })}
    </div>
  );
  
}

export default Ranking;
//product, price, productDetail, likeword, hateword
