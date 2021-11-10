import { BsSearch } from "react-icons/bs";
function SearchBox({ onSubmit, searchItem, onChange }) {
    const SearchBar = {
        borderRadius: "50px",
        height: "2rem",
        width: "600px",
        textAlign: " center",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: " white",
        lineHeight: "1.2rem",
    };
    const inputStyle = {
        border: "none",
        width: "550px",
        textAlign: "center",
        fontSize: "0.8rem",
    };

    const buttonStyle = {
        border: "none",
        backgroundColor: "white",
        cursor: "pointer",
    };

    return (
        <div style={SearchBar}>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="searchItem"
                    value={searchItem}
                    style={inputStyle}
                    placeholder="원하는 상품을 검색해보세요!"
                    onChange={onChange}
                ></input>
                <button type="submit" style={buttonStyle} className="searchButton">
                    <BsSearch size="1rem" />
                </button>
            </form>
        </div>
    );
}
export default SearchBox;
