import SelectBox from "../shared/SelectBox";
import { useKeywords } from "../../hooks";
import { useEffect, useState } from "react";

function LikeKeywordSelect({ updateLikeKeyword, history, socket }) {
    const [keywords, setKeywords] = useState([]);
    const { values, addKeyword, deleteKeyword } = useKeywords("like", []);

    useEffect(() => {
        let item = window.localStorage.getItem("keywords");
        setKeywords(JSON.parse(item));
    }, []);

    function onClick(e, keyword) {
        e.preventDefault();
        if (values["like"].includes(keyword)) {
            deleteKeyword(keyword);
        } else addKeyword(keyword);
    }

    function onSubmit(e) {
        //redux에 저장하고 다음페이지로 넘기기!
        e.preventDefault();
        updateLikeKeyword(values["like"]); //redux 저장소에 like keyword 저장.
        history.push({
            pathname: "/hatekeyword",
            socket: socket,
        });
    }
    return (
        <div className="contents-wrapper">
            <SelectBox mode="like" keywords={keywords} onSubmit={onSubmit} onClick={onClick} values={values} />
        </div>
    );
}

export default LikeKeywordSelect;
