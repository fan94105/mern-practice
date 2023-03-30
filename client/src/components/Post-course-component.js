import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseService from "../services/course.service";

const PostCourseComponent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handlePostCourse = async () => {
    try {
      await CourseService.post(title, description, price);
      navigate("/course");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div className="form-group">
        <label htmlFor="title">課程名稱 :</label>
        <input
          onChange={handleTitle}
          id="title"
          type="text"
          class="form-control"
          name="title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">課程介紹 :</label>
        <input
          onChange={handleDescription}
          id="description"
          type="text"
          class="form-control"
          name="description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">課程價格 :</label>
        <input
          onChange={handlePrice}
          id="price"
          type="text"
          class="form-control"
          name="price"
        />
      </div>

      <br />
      <button onClick={handlePostCourse} className="btn btn-primary">
        <span>建立課程</span>
      </button>
    </div>
  );
};

export default PostCourseComponent;
