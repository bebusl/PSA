import SelectBox from "../shared/SelectBox";
import { useLocation } from "react-router";
import { useKeywords } from "../../hooks";

function HateKeywordSelect(props) {
  const location = useLocation();
  const keywords = location.keywords;
  const { values, addKeyword, deleteKeyword } = useKeywords("hate", [
    "hatetest",
  ]);

  function onClick(e, keyword) {
    e.preventDefault();
    if (values["hate"].includes(keyword)) {
      deleteKeyword(keyword);
    } else addKeyword(keyword);
  }

  function onSubmit(e) {
    //redux에 저장하고 다음페이지로 넘기기!
    e.preventDefault();
    props.updateHateKeyword(values["hate"]); //redux 저장소에 like keyword 저장.
    props.history.push({
      pathname: "/ranking",
    });
  }
  return (
    <div className="contents-wrapper">
      <SelectBox
        mode="hate"
        onSubmit={onSubmit}
        onClick={onClick}
        values={values}
        keywords={keywords}
      />
    </div>
  );
}

export default HateKeywordSelect;
