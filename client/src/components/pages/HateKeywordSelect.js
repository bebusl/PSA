import SelectBox from "../shared/SelectBox";
import { useKeywords } from "../../hooks";
import { useCallback, useEffect } from "react";

function HateKeywordSelect({
  updateHateKeyword,
  history,
  location,
  likeWrd,
  hateWrd,
}) {
  const socket = location.socket;
  const keywords = location.keywords;
  const { values, addKeyword, deleteKeyword } = useKeywords("hate", [
    "hatetest",
  ]);

  const setSocket = useCallback(() => {
    socket.on("productlist", (productlist) => {
      history.push({
        pathname: "/ranking",
        productlist: productlist,
        socket: socket,
      });
    });
  }, []);

  function onClick(e, keyword) {
    e.preventDefault();
    if (values["hate"].includes(keyword)) {
      deleteKeyword(keyword);
    } else addKeyword(keyword);
  }

  function onSubmit(e) {
    //redux에 저장하고 다음페이지로 넘기기!
    e.preventDefault();
    updateHateKeyword(values["hate"]); //redux 저장소에 like keyword 저장.
    socket.emit("selected keywords", {
      searchItem: "깡통",
      likeword: likeWrd,
      hateword: hateWrd,
    });
  }

  useEffect(() => {
    setSocket();
    return function cleanup() {
      socket.off("productlist");
    };
  }, []);

  return (
    <div className="contents-wrapper">
      <SelectBox
        mode="hate"
        onSubmit={onSubmit}
        onClick={onClick}
        values={values}
        keywords={keywords}
      />
    </div>
  );
}

export default HateKeywordSelect;
