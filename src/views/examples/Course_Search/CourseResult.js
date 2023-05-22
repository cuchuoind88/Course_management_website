import React from "react";
import "./CourseResult.scss";
import { Link } from "react-router-dom";
export default function CourseResult({ url, title, courseId }) {
  return (
    <Link className="Course_result_item" to={`/learning/${courseId}`}>
      <div className="Course_result_image">
        <img src={`${url}`}></img>
      </div>
      <div className="Course_result_content">
        <h5 className="Course_result_title">{`${title}`}</h5>
      </div>
    </Link>
  );
}
