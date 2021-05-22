import { Link } from "react-router-dom";
function Home() {
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

      <div>검색창 구현해주세요</div>
    </>
  );
}

export default Home;
