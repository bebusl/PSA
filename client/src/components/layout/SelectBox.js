import { Fragment,useEffect } from 'react';
import useInput from "../shared/hook/useInput";

function KeywordBtn({ word, handleClick }){
  const Likeword = [];   
  // function BtnClick(e){
  //   e.preventDefault();
  //   // console.log({word})
  //   // console.log({values})
  //   Keyword(e, word)
  //   const likeword = Likeword.concat({word})
  //   // console.log({likeword})
  // } 
  return (
      <div>
          <button onClick={handleClick}>{word}</button>
      </div>
  );
}

function SelectBox({ keywords }) {

  const [values, onChange,onFileChange,KeywordButton] = useInput({ likeword: [] });

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
        <button>더보기</button>
    </Fragment>
)
}

export default SelectBox;
