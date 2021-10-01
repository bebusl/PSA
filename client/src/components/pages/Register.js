import withAuth from "../container/withAuth";
import { useInput } from "../../hooks";
import "./Login.css";
import axios from "axios";
const Register = ({ history }) => {
    const { values, onChange, onFileChange } = useInput({ email: "", password: "", checkPassword: "", name: "" });

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:5000/auth/register", {
            email: values.email,
            password: values.password,
            name: values.name,
        });
        if (res) {
            history.push("/login");
        }
    };

    return (
        <div className="contents-wrapper">
            <form onSubmit={onSubmit}>
                <div className="textl">회원가입</div>
                <div className="box">
                <label htmlFor="email">이메일</label>
                <input type="email" name="email" value={values.email} onChange={onChange}></input>
                <label htmlFor="password">비밀번호</label>
                <input type="password" name="password" value={values.password} onChange={onChange}></input>
                <label htmlFor="checkPassword">비밀번호 확인</label>
                <input type="password" name="checkPassword" value={values.checkPassword} onChange={onChange}></input>
                <label htmlFor="name">이름</label>
                <input type="text" name="name" value={values.name} onChange={onChange}></input>
                <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default withAuth(Register);
