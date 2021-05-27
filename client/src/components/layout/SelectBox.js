import { Fragment,useEffect } from 'react';
import useInput from "../shared/hook/useInput";

function KeywordBtn({ word, handleClick }){
  const Likeword = [];   
 
  return (
      <div>
          <button onClick={handleClick}>{word}</button>
      </div>
  );
}

function SelectBox({ keywords, history }) {

  const [values, onChange,onFileChange,KeywordButton] = useInput({ likeword: [] });

  function onSubmit(e){
    e.preventDefault()
    history.push({
      pathname: "/ranking",
      state: { likeword: values.likeword },
    });

  }

  useEffect(()=>{
    console.log("useEffect : ",values)
  })

  const handleClick = (e,Keyword)=>{
    KeywordButton(Keyword)
    
  }
  return (
    <Fragment>
        <div>원하는 키워드를 선택해주세요!</div>
        {keywords.map((Keyword, index) => (
                <KeywordBtn word={Keyword} key={index} handleClick={(e)=>handleClick(e,Keyword)} />
        ))}
        <form onSubmit={onSubmit}>
          <button type='submit'>버튼</button>
        </form>
        <button>더보기</button>
    </Fragment>
)
}

export default SelectBox;
