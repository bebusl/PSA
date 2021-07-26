import List from "../shared/List";
import { dummyRankinglist } from "../dummyData";

function Ranking() {
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
