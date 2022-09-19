import SelectBox from "../components/shared/SelectBox";
import { useRef } from "react";
import "./Keywordpage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setKeywords } from "../store/slice/keywordSlice";

function LikeKeywordSelect() {
  const keywords = JSON.parse(window.localStorage.getItem("poskeywords"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedKeywords = useRef([]);

  const onClick = (e) => {
    if (e.target.checked) {
      selectedKeywords.current.push(e.target.id);
    } else {
      selectedKeywords.current = selectedKeywords.current.filter(
        (keyword) => keyword !== e.target.id
      );
    }
  };

  function onSubmit() {
    dispatch(
      setKeywords({
        type: "preferKeywords",
        keywords: selectedKeywords.current,
      })
    );
    navigate("/hatekeyword");
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
        onClick={onClick}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default LikeKeywordSelect;
