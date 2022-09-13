import { useInput } from "../hooks/useInput";
import "./Login.css";
import axios from "axios";
const Register = ({ history }) => {
  const { values, onChange } = useInput({
    email: "",
    password: "",
    checkPassword: "",
    name: "",
  });

  const validation = () => {
    if (
      values.email.length === 0 ||
      values.password.length === 0 ||
      values.name.length === 0
    ) {
      window.alert("빈칸을 모두 채워주세요.");
      return false;
    } else if (values.password !== values.checkPassword) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      const res = await axios.post("http://localhost:5000/auth/register", {
        email: values.email,
        password: values.password,
        name: values.name,
      });
      if (res.status === 200) {
        history.push("/login");
      } else window.alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="contents-wrapper">
      <form onSubmit={onSubmit}>
        <div className="textl">회원가입</div>
        <div className="box">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
          ></input>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
          ></input>
          <label htmlFor="checkPassword">비밀번호 확인</label>
          <input
            type="password"
            name="checkPassword"
            value={values.checkPassword}
            onChange={onChange}
          ></input>
          {values.password !== values.checkPassword && (
            <p>비밀번호가 일치하지 않습니다.</p>
          )}
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={onChange}
          ></input>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
