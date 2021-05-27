import SelectBox from "../layout/SelectBox";
import {useLocation} from "react-router";
import useInput from "../shared/hook/useInput";

function KeywordSelect(props) {
  const location = useLocation();
  const keywords = location.state.keywords;
  return <SelectBox keywords={keywords} history={props.history} />;
}

export default KeywordSelect;
