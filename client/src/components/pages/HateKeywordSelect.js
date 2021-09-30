import SelectBox from "../shared/SelectBox";
import { useKeywords } from "../../hooks";
import { useCallback, useEffect, useState } from "react";

function HateKeywordSelect({ updateHateKeyword, setProductlist, history, likeWrd, hateWrd, searchItem, socket }) {
    //const socket = location.socket;
    const [keywords, setKeywords] = useState([]);
    const { values, addKeyword, deleteKeyword } = useKeywords("hate", []);

    const setSocket = useCallback(() => {
        socket.on("productlist", (productlist) => {
            setProductlist(productlist);
            history.push({
                pathname: "/ranking",
            });
        });
    }, []);

    useEffect(() => {
        setSocket();
        let item = window.localStorage.getItem("keywords");
        setKeywords(JSON.parse(item));
        return function cleanup() {
            socket.off("productlist");
        };
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
            searchItem: searchItem,
            likeword: likeWrd,
            hateword: values["hate"],
        });
    }

    return (
        <div className="contents-wrapper">
            <SelectBox mode="hate" onSubmit={onSubmit} onClick={onClick} values={values} keywords={keywords} />
        </div>
    );
}

export default HateKeywordSelect;
