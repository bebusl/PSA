import List from "../shared/List";

function Ranking({ location }) {
  const productlist = location.productlist;
  return (
    <div>
      <h2>Ranking Page</h2>
      {productlist.map((product, idx) => {
        const { name, price, imageUrl } = product;
        return (
          <List key={idx} product={name} price={price} imageUrl={imageUrl} />
        );
      })}
    </div>
  );
}

export default Ranking;
//product, price, productDetail, likeword, hateword
