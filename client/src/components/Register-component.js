import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const authService = new AuthService();
  const navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState(null);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = async () => {
    try {
      await authService.register(username, email, password, role);
      alert("註冊成功，跳轉至登入頁面。。。");
      navigate("/login");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {message && <div className="alert alert-danger">{message}</div>}
      <div className="form-group">
        <label htmlFor="username">用戶名稱 :</label>
        <input
          onChange={handleUsername}
          id="username"
          type="text"
          class="form-control"
          name="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">電子郵件 :</label>
        <input
          onChange={handleEmail}
          id="email"
          type="text"
          class="form-control"
          name="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">密碼 :</label>
        <input
          onChange={handlePassword}
          id="password"
          type="password"
          class="form-control"
          name="password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">身分 :</label>
        <input
          onChange={handleRole}
          id="role"
          type="text"
          class="form-control"
          name="role"
          placeholder="student / instructor"
        />
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleRegister}>
        <span>註冊會員</span>
      </button>
    </div>
  );
};

export default RegisterComponent;
