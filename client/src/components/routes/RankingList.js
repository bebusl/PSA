import List from "../layout/List";
import { useLocation, useEffect } from "react-router";

function RankingList() {
  const location = useLocation();
  const likeword = location.state.likeword;
  const hateword = location.state.hateword;
  console.log(location.state);

  return <List likeword={likeword} hateword={hateword} />;
}

export default RankingList;
