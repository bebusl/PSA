import { useInput } from "../hooks/useInput";
import { useState, useCallback, useEffect } from "react";
import Loading from "../components/shared/Loading";
import "./Main.css";
import { connect } from "react-redux";
import { setSearchItem } from "../store/action";
import { GiShoppingBag } from "react-icons/gi";
import { Banner, Container, SubBanner } from "./Main.style";
import SearchBar from "../components/searchBar/SearchBox";

const mapDispatchToProps = (dispatch) => ({
  setSearchItem: (searchItem) => dispatch(setSearchItem(searchItem)),
});

function Home({ history, socket, setSearchItem }) {
  const { values, onChange } = useInput({ searchItem: "" });
  const [isLoading, setLoading] = useState(false);

  const setSocket = useCallback(() => {
    socket.on("keywords", (poskeyword, negkeyword) => {
      setLoading(false);
      window.localStorage.setItem("poskeywords", JSON.stringify(poskeyword));
      window.localStorage.setItem("negkeywords", JSON.stringify(negkeyword));
      history.push({
        pathname: "/likekeyword",
        socket: socket,
      });
    });
  }, [socket]);
  //keyword => 가 오면 localStorage에 저장하고 넘기네.

  useEffect(() => {
    setSocket();
    return function cleanup() {
      socket.off("keywords");
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault(); //새로고침 안함.
    setLoading(true);
    setSearchItem(values.searchItem);
    socket.emit("send message", { searchItem: values.searchItem });
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

export default connect(null, mapDispatchToProps)(Home);
