import List from "../shared/List";
import { dummyRankinglist } from "../dummyData";

<<<<<<< HEAD

function Ranking() {
  // function onClick(props){
  //   props.history.push({
  //     pathname: "/detail",
  //     state: {product: product, price: price, productDetail :productDetail}
  //   })
  // }
  //console.log("::::::propsss::::::::::::::"+ this.props)


=======
function Ranking() {
>>>>>>> bcb639ec2c59d4a05ab7e3a878b7ec9a2464a4a4
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
<<<<<<< HEAD
            
=======
>>>>>>> bcb639ec2c59d4a05ab7e3a878b7ec9a2464a4a4
          />
        );
      })}
    </div>
  );
<<<<<<< HEAD
  
=======
>>>>>>> bcb639ec2c59d4a05ab7e3a878b7ec9a2464a4a4
}

export default Ranking;
//product, price, productDetail, likeword, hateword
