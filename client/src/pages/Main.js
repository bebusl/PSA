import { useState, useCallback, useEffect } from "react";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

import Loading from "../components/shared/Loading";
import SearchBar from "../components/searchBar/SearchBox";
import { GiShoppingBag } from "react-icons/gi";
import { Banner, Container, SubBanner } from "./Main.style";

import { setSearchItem } from "../store/slice/keywordSlice";
import { useDispatch } from "react-redux";
import socket from "../socket";

function Home() {
  const { values, onChange } = useInput({ searchItem: "" });
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchRequest = useCallback(() => {
    socket.on("keywords", (poskeyword, negkeyword) => {
      setLoading(false);
      window.localStorage.setItem("poskeywords", JSON.stringify(poskeyword));
      window.localStorage.setItem("negkeywords", JSON.stringify(negkeyword));
      navigate("/likekeyword");
    });
  }, []);

  useEffect(() => {
    searchRequest();
    return () => socket.off("keywords");
  }, []);

  const onSubmit = (e) => {
    e.preventDefault(); //새로고침 안함.
    setLoading(true);
    dispatch(setSearchItem(values.searchItem));
    //socket.emit("send message", { searchItem: values.searchItem });
  };

  return (
    <>
      {isLoading && <Loading />}
      <Container>
        <Banner>
          <SubBanner>
            <p>마음에 꼭 맞는</p>
            <p>상품을 찾아드립니다</p>
            <br />
            <p>믿고 맡겨주세요!</p>
          </SubBanner>
          <SubBanner>
            <GiShoppingBag color="white" size="8rem"></GiShoppingBag>
          </SubBanner>
        </Banner>
        <SearchBar
          searchItem={values.searchItem}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </Container>
    </>
  );
}

export default Home;
