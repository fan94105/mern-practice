import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const authService = new AuthService();
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState(null);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    try {
      let response = await authService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      alert("登入成功，跳轉至個人頁面。。。");
      setCurrentUser(authService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {message && <div className="alert alert-danger">{message}</div>}
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
      <br />
      <button onClick={handleLogin} className="btn btn-primary">
        <span>登入</span>
      </button>
    </div>
  );
};

export default LoginComponent;
