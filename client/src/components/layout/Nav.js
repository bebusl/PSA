import "./Nav.css";
import { Link } from "react-router-dom";
import withAuth from "../container/withAuth";

function Nav({ isLogin, logoff }) {
    return (
        <>
            <nav>
                <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="logo undefined" />;
                {!isLogin ? (
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
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link to="/">홈</Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    logoff();
                                }}
                            >
                                로그아웃
                            </a>
                        </li>
                        <li>
                            <Link to="cart">장바구니</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </>
    );
}

export default withAuth(Nav);
