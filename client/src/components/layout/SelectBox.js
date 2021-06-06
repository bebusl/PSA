import { Fragment, useEffect, useCallback } from "react";
import useKeywords from "../shared/hook/useKeywords";
import "./SelectBox.css";
function KeywordBtn({ word, handleClick, className }) {
  return (
    <button className={`keywordBtn ${className}`} onClick={handleClick}>
      {word}
    </button>
  );
}

function SelectBox({ keywords, history }) {
  const {
    values,
    likeButton,
    hateButton,
    deleteLikeKeyword,
    deleteHateKeyword,
    setHateMode,
  } = useKeywords({
    isLikeSelect: true,
    likeword: [],
    hateword: [],
  });
  useEffect(() => {
    console.log("useEffect", values);
  });
  function onKeywordSubmit(e) {
    e.preventDefault();
    if (values.isLikeSelect) {
      setHateMode();
    } else {
      history.push({
        pathname: "/ranking",
        state: { likeword: values.likeword, hateword: values.hateword },
      });
    }
  }

  const handleLikeClick = (e, Keyword) => {
    if (values.likeword.includes(Keyword)) {
      console.log("나 또눌림");
      deleteLikeKeyword(Keyword);
    } else likeButton(Keyword);
  };

  const handleHateClick = (e, Keyword) => {
    if (values.hateword.includes(Keyword)) {
      deleteHateKeyword(Keyword);
    } else hateButton(Keyword);
  };
  return (
    <div>
      {values.isLikeSelect ? (
        <div>원하는 키워드를 선택해주세요!</div>
      ) : (
        <div>원하지 않는 키워드를 선택해주세요!</div>
      )}
      {keywords.map((Keyword, index) => (
        <>
          {index % 4 === 0 ? <div></div> : undefined}
          <KeywordBtn
            word={Keyword}
            key={index}
            className={`${
              values.isLikeSelect
                ? values.likeword.includes(Keyword) && "like"
                : values.hateword.includes(Keyword) && "hate"
            }`}
            handleClick={(e) =>
              values.isLikeSelect
                ? handleLikeClick(e, Keyword)
                : handleHateClick(e, Keyword)
            }
          />
        </>
      ))}

      <form onSubmit={onKeywordSubmit}>
        <button type="submit">완료</button>
      </form>
      <button>더보기</button>
    </div>
  );
}

export default SelectBox;
