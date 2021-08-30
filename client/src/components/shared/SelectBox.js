import "./SelectBox.css";
import { Fragment } from "react";
function KeywordBtn({ word, handleClick, className }) {
  return (
    <button className={`keywordBtn ${className}`} onClick={handleClick}>
      {word}
    </button>
  );
}
//head는 selectbox 상단 부에 뜰 내용 적은거.
function SelectBox({ mode, values, keywords, onSubmit, onClick }) {
  return (
    <div>
      {mode === "like" ? (
        <div>원하는 키워드를 선택해주세요!</div>
      ) : (
        <div>원하지 않는 키워드를 선택해주세요!</div>
      )}
      {keywords.map((Keyword, index) => (
        <Fragment key={index}>
          {index % 4 === 0 ? <div></div> : undefined}
          <KeywordBtn
            word={Keyword}
            className={`${values[mode].includes(Keyword) && `${mode}`}`}
            handleClick={(e) => {
              onClick(e, Keyword);
            }}
          />
        </Fragment>
      ))}

      <form onSubmit={onSubmit}>
        <button type="submit">완료</button>
      </form>
      <button>더보기</button>
    </div>
  );
}

export default SelectBox;
