import SelectBox from "../layout/SelectBox";
import {useLocation} from "react-router";
import useInput from "../shared/hook/useInput";

function KeywordSelect() {
  const location = useLocation();
  const keywords = location.state.keywords;
  return <SelectBox keywords={keywords} />;
}

export default KeywordSelect;
