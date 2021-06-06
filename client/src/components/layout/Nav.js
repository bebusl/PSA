import "./Nav.css";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <>
      <nav>
        <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="logo undefined" />
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/register">회원가입</Link>
          </li>
          <li>
            <Link to="/cart">장바구니</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
