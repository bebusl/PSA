import List from "../layout/List";
import {useLocation} from "react-router";

function RankingList() {
  const location = useLocation();
  const likeword = location.state.likeword;
  return <List likeword={likeword} />;
}

export default RankingList;
