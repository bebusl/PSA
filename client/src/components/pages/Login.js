import withAuth from "../container/withAuth";
import { useInput } from "../../hooks";
import "./Login.css";
import axios from "axios";
axios.defaults.withCredentials = true;


const Login = ({ login, history }) => {
    const { values, onChange, isLogin, userData } = useInput({ email: "", password: "" });

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/auth/login", {
                email: values.email,
                password: values.password,
            })
            .then((res) => {
                if (res.data.success === true) {
                    login(res.data.userData);
                    history.push("/");
                }
            });
    };

    return (
        <div className="contents-wrapper">
            <form onSubmit={onSubmit}>
            
                <div className="textl">로그인</div>
                <div className="box">
                <label htmlFor="email">이메일</label>
                <input type="email" name="email" value={values.email} onChange={onChange}></input>
                <label htmlFor="password" >비밀번호</label>
                <input type="password" name="password" value={values.password} onChange={onChange}></input>
                <button type="submit">로그인</button>
                </div>
            </form>
        </div>
    );
};

export default withAuth(Login);
