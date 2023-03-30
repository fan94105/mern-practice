import React from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    alert("登出成功");
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" to="/">
                  首頁
                </Link>
              </li>
              {!currentUser && (
                <li class="nav-item">
                  <Link class="nav-link" to="/register">
                    註冊會員
                  </Link>
                </li>
              )}
              {!currentUser && (
                <li class="nav-item">
                  <Link class="nav-link" to="/login">
                    會員登入
                  </Link>
                </li>
              )}
              {currentUser && (
                <li class="nav-item">
                  <Link onClick={handleLogout} class="nav-link" to="/">
                    登出
                  </Link>
                </li>
              )}
              {currentUser && (
                <li class="nav-item">
                  <Link class="nav-link" to="/profile">
                    個人頁面
                  </Link>
                </li>
              )}
              {currentUser && (
                <li class="nav-item">
                  <Link class="nav-link" to="/course">
                    課程頁面
                  </Link>
                </li>
              )}
              {currentUser && currentUser.user.role == "instructor" && (
                <li class="nav-item">
                  <Link class="nav-link" to="/postCourse">
                    新增課程
                  </Link>
                </li>
              )}
              {currentUser && currentUser.user.role == "student" && (
                <li class="nav-item">
                  <Link class="nav-link" to="/enroll">
                    註冊課程
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;
