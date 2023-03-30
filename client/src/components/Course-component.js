import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CourseService from "../services/course.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const courseService = new CourseService();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);

  const handleToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    function checkRole() {
      let _id;
      if (currentUser) {
        _id = currentUser.user._id;
        if (currentUser.user.role === "instructor") {
          courseService
            .get(_id)
            .then((response) => {
              setCourseData(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (currentUser.user.role === "student") {
          courseService
            .getEnrollCourses(_id)
            .then((response) => {
              setCourseData(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    }
    checkRole();
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>登入後才能看到課程。。。</p>
          <button className="btn btn-primary btn-lg" onClick={handleToLogin}>
            登入
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>歡迎來到講師的課程頁面。</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <h1>歡迎來到學生的課程頁面。</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length !== 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">課程名稱: {course.title}</h5>
                  <p sytle={{ margin: "0.5rem 0" }} className="card-text">
                    {course.description}
                  </p>
                  <p sytle={{ margin: "0.5rem 0" }}>
                    學生人數: {course.students.length}
                  </p>
                  <p sytle={{ margin: "0.5rem 0" }}>課程價格: {course.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
