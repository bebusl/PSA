import { Link } from "react-router-dom";
import SearchBox from "../layout/SearchBox";
import useInput from "../shared/hook/useInput";
import socketIOClient from "socket.io-client";
import { useEffect } from "react";

let socket;

function Home({ history }) {
  const { values, onChange } = useInput({ searchItem: "" });

  if (socket == null) {
    socket = socketIOClient("http://localhost:5000");
    socket.on("keywords", (keywords) => {
      console.log(keywords);
      history.push({
        pathname: "/keyword",
        state: { keywords: keywords },
      });
    });
  }

  const onSubmit = (e) => {
    e.preventDefault(); //새로고침 안함.
    console.log("소켓으로 넣을 값:", values.searchItem); //확인하고

    socket.emit("send message", { searchItem: values.searchItem });

    // history.push({
    //   pathname: "/keyword",
    //   state: { keywords: keywords },
    // });
  };

  return (
    <>
      {/*<ul>
        <li>
          <Link to="/">홈으로</Link>
        </li>
        <li>
          <Link to="/keyword">키워드선택창</Link>
        </li>
        <li>
          <Link to="/ranking">랭킹리스트(결과)페이지</Link>
        </li>
      </ul>*/}
      <SearchBox
        searchItem={values.searchItem}
        onSubmit={onSubmit}
        onChange={onChange}
      ></SearchBox>
    </>
  );
}

export default Home;
