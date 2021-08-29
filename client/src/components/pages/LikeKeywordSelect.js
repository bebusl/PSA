import SelectBox from "../shared/SelectBox";
import { useKeywords } from "../../hooks";

function LikeKeywordSelect({ updateLikeKeyword, history, location }) {
  const keywords = location.keywords;
  const socket = location.socket;

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
    updateLikeKeyword(values["like"]); //redux 저장소에 like keyword 저장.
    history.push({
      pathname: "/hatekeyword",
      keywords: keywords,
      socket: socket,
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
