import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseService from "../services/course.service";

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  const courseService = new CourseService();
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);

  const handleToLogin = () => {
    navigate("/login");
  };
  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = async () => {
    try {
      let result = await courseService.getCourseByName(searchInput);
      setSearchResult(result.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleEnroll = (e) => {
    courseService
      .enroll(e.target.id)
      .then((response) => {
        alert("註冊成功，跳轉至課程頁面。。。");
        navigate("/course");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>登入後才能註冊課程。。。</p>
          <button className="btn btn-primary btn-lg" onClick={handleToLogin}>
            登入
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>只有學生能註冊課程。</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div className="search input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={handleInput}
          ></input>
          <button onClick={handleSearch} className="btn btn-primary">
            搜尋課程
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length !== 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {searchResult.map((course) => {
            return (
              <div
                className="card"
                style={{ width: "18rem", marginRight: "1rem" }}
                key={course._id}
              >
                <div className="card-body">
                  <h5 className="card-title">課程名稱: {course.title}</h5>
                  <p sytle={{ margin: "0.5rem 0" }} className="card-text">
                    {course.description}
                  </p>
                  <p sytle={{ margin: "0.5rem 0" }}>
                    學生人數: {course.students.length}
                  </p>
                  <p sytle={{ margin: "0.5rem 0" }}>課程價格: {course.price}</p>
                  <p sytle={{ margin: "0.5rem 0" }}>
                    講師: {course.instructor.username}
                  </p>
                </div>
                <button
                  id={course._id}
                  className="card-text btn btn-primary"
                  onClick={handleEnroll}
                >
                  註冊課程
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
