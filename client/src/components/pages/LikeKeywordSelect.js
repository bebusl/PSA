import SelectBox from "../shared/SelectBox";
import { useLocation } from "react-router";
import { useKeywords } from "../../hooks";

function LikeKeywordSelect(props) {
  const location = useLocation();
  const keywords = location.state.keywords;
  const { values, addKeyword, deleteKeyword } = useKeywords("like", [
    "testKeyword",
  ]);
  function onClick(e, keyword) {
    e.preventDefault();
    if (values["like"].includes(keyword)) {
      deleteKeyword(keyword);
    } else addKeyword(keyword);
  }

  function onSubmit(e) {
    //redux에 저장하고 다음페이지로 넘기기!
    e.preventDefault();
    props.updateLikeKeyword(values["like"]); //redux 저장소에 like keyword 저장.
    props.history.push({
      pathname: "/hatekeyword",
      keywords: keywords,
    });
  }
  return (
    <div className="contents-wrapper">
      <SelectBox
        mode="like"
        keywords={keywords}
        onSubmit={onSubmit}
        onClick={onClick}
        values={values}
      />
    </div>
  );
}

export default LikeKeywordSelect;
