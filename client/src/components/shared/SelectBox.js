<<<<<<< HEAD
import styled from "styled-components";
=======
>>>>>>> bcb639ec2c59d4a05ab7e3a878b7ec9a2464a4a4
import "./SelectBox.css";

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
        <>
          {index % 4 === 0 ? <div></div> : undefined}
          <KeywordBtn
            word={Keyword}
            key={index}
            className={`${values[mode].includes(Keyword) && `${mode}`}`}
            handleClick={(e) => {
              onClick(e, Keyword);
            }}
          />
        </>
      ))}

      <form onSubmit={onSubmit}>
        <button type="submit">완료</button>
      </form>
      <button>더보기</button>
    </div>
  );
}

export default SelectBox;
