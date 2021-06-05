function SearchBox({ onSubmit, searchItem, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="searchItem"
        value={searchItem}
        placeholder="원하는 상품을 검색해보세요!"
        onChange={onChange}
        className="searchbar"
      ></input>
      <button type="submit" className="searchButton">
        검색
      </button>
    </form>
  );
}
export default SearchBox;
