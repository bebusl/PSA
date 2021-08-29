import SearchBox from "../shared/SearchBox";
import { useInput } from "../../hooks";
import { useState, useCallback, useEffect } from "react";
import Loading from "../shared/Loading";
import "./Main.css";

function Home({ history, socket }) {
  const { values, onChange } = useInput({ searchItem: "" });
  const [isLoading, setLoading] = useState(false);

  const setSocket = useCallback(() => {
    socket.on("keywords", (keyword) => {
      setLoading(false);
      history.push({
        pathname: "/likekeyword",
        keywords: keyword,
        socket: socket,
      });
    });
  }, [socket]);

  useEffect(() => {
    setSocket();
    return function cleanup() {
      socket.off("keywords");
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault(); //새로고침 안함.
    setLoading(true);
    socket.emit("send message", { searchItem: values.searchItem });
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="contents-wrapper">
        <SearchBox
          searchItem={values.searchItem}
          onSubmit={onSubmit}
          onChange={onChange}
        ></SearchBox>
      </div>
    </>
  );
}

export default Home;
