import SelectBox from "../components/shared/SelectBox";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setKeywords, setProductList } from "../store/slice/keywordSlice";
import { useEffect } from "react";
import socket from "../socket";

function HateKeywordSelect() {
  const keywords = JSON.parse(window.localStorage.getItem("negkeywords"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const keywordStore = useSelector((state) => state.keyword);
  const selectedKeywords = useRef([]);

  useEffect(() => {
    socket.on("productlist", (productlist) => {
      console.log("productlist 도착");
      dispatch(setProductList(productlist));
      navigate("/ranking");
    });

    return () => socket.disconnect();
  }, []);

  const onClick = (e) => {
    if (e.target.checked) {
      selectedKeywords.current.push(e.target.id);
    } else {
      selectedKeywords.current = selectedKeywords.current.filter(
        (keyword) => keyword !== e.target.id
      );
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    dispatch(
      setKeywords({
        type: "dispreferKeywords",
        keywords: selectedKeywords.current,
      })
    );
    socket.emit("selected keywords", {
      searchItem: keywordStore.searchItem,
      likeword: keywordStore.preferKeywords,
      hateword: keywordStore.dispreferKeywords,
    });
  }

  return (
    <div className="select-container">
      <div className="title">불호 특징을 선택해주세요!</div>
      <p className="explain">
        선택한 키워드에 대한 부정적인 리뷰가 적은 순으로 상품이 보여집니다.
      </p>
      <SelectBox
        mode="hate"
        keywords={keywords}
        onClick={onClick}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default HateKeywordSelect;
