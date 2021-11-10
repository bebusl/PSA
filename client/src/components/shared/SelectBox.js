import "./SelectBox.css";
import { Fragment, useState } from "react";

function Cursor({ children }) {
    const [MousePosition, setMousePosition] = useState({
        left: 0,
        top: 0,
    });

    function handleMouseMove(e) {
        setMousePosition({ left: e.pageX, top: e.pageY });
    }
    return (
        <div onMouseMove={handleMouseMove}>
            <div
                style={{
                    position: "absolute",
                    left: MousePosition.left,
                    top: MousePosition.top - 20,
                    zIndex: 100,
                    backgroundcolor: "black",
                    cursor: 'url("../../down-arrow.png")',
                    fontSize: "0.7rem",
                }}
            >
                scroll
            </div>
            {children}
        </div>
    );
}

function KeywordBtn({ word, handleClick, className }) {
    return (
        <button className={`keywordBtn ${className}`} onClick={handleClick}>
            {word}
        </button>
    );
}
//head는 selectbox 상단 부에 뜰 내용 적은거.
function SelectBox({ mode, values, keywords, onSubmit, onClick }) {
    return (
        <>
            <div className="sbox">
                <div className="grid">
                    {keywords.map((Keyword, index) => (
                        <div key={index} className="grid-item">
                            <KeywordBtn
                                word={Keyword}
                                className={`${values[mode].includes(Keyword) && `${mode}`}`}
                                handleClick={(e) => {
                                    onClick(e, Keyword);
                                }}
                            />
                        </div>
                    ))}
                </div>
                {/* <button className="showmore">더보기</button> */}
            </div>

            <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: "1200px" }}>
                <button type="submit" className="submitBtn">
                    완료
                </button>
            </form>
        </>
    );
}

export default SelectBox;
