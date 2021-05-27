import { Link } from "react-router-dom";
import useInput from "../shared/hook/useInput";
import "./home.css";
function Home() {
  const [values, onChange, reset] = useInput({ searchItem: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("서브밋했따,,", values);
  };

  return (
    <>
      <ul>
        <li>
          <Link to="/">홈으로</Link>
        </li>
        <li>
          <Link to="/keyword">키워드선택창</Link>
        </li>
        <li>
          <Link to="/ranking">랭킹리스트(결과)페이지</Link>
        </li>
      </ul>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="searchItem"
          value={values.searchItem}
          placeholder="원하는 상품을 검색해보세요!"
          onChange={onChange}
          className="searchbar"
        ></input>
        <button type="submit" className="searchButton">
          검색
        </button>
      </form>
    </>
  );
}

export default Home;
