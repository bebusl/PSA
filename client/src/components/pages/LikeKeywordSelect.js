import SelectBox from "../shared/SelectBox";
import { useKeywords } from "../../hooks/useKeywords";
import { useEffect, useState } from "react";
import "./Keywordpage.css";
import { dummyKeywords } from "../dummyData";

function LikeKeywordSelect({ updateLikeKeyword, history, socket }) {
  const [keywords, setKeywords] = useState(dummyKeywords);
  const { values, addKeyword, deleteKeyword } = useKeywords("like", []);

  useEffect(() => {
    let item = window.localStorage.getItem("poskeywords");
    setKeywords(JSON.parse(item));
  }, []);

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
      socket: socket,
    });
  }
  return (
    <div className="select-container">
      <div className="title">선호 특징을 선택해주세요!</div>
      <p className="explain">
        선택한 키워드에 대한 긍정적인 리뷰가 많은 순으로 상품이 보여집니다.
      </p>
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
