import SearchBox from "../shared/SearchBox";
import { useInput } from "../../hooks";
import socketIOClient from "socket.io-client";
import { dummyKeywords } from "../dummyData";
import "./Main.css";
let socket;

function Home({ history }) {
  const { values, onChange } = useInput({ searchItem: "" });

  // if (socket == null) {
  //   socket = socketIOClient("http://localhost:5000");
  //   socket.on("keywords", (keywords) => {
  //     console.log(keywords);
  //     history.push({
  //       pathname: "/keyword",
  //       state: { keywords: keywords },
  //     });
  //   });
  // }
  //!웹개발시에는 소켓 통신 등 다 빼고 일단 더미 데이터로 작성.(나중에 위에 주석은 풀어줄 것. 실제 소켓통신.)
  //!components/dummyData/index.js에 보면 각 페이지에 필요한 data들 더미데이터형태로 만들어 두었음
  //!임시로 그 값들을 넣어서 개발하고 테스트 해보면 됨.

  const onSubmit = (e) => {
    e.preventDefault(); //새로고침 안함.
    console.log("소켓으로 넣을 값:", values.searchItem); //확인하고

    //socket.emit("send message", { searchItem: values.searchItem });
    //!socket test시 풀어주세요

    history.push({
      pathname: "/likekeyword",
      state: { keywords: dummyKeywords },
    });
  };

  return (
    <div className="contents-wrapper">
      <SearchBox
        searchItem={values.searchItem}
        onSubmit={onSubmit}
        onChange={onChange}
      ></SearchBox>
    </div>
  );
}

export default Home;
