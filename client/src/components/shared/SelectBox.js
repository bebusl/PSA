import "./SelectBox.css";
import { Fragment } from "react";
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
