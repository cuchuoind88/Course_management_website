import React from "react";
import { Container } from "reactstrap";
import "./course_header.scss";
export default function CourseHeader({ title }) {
  return (
    <div className="course_header">
      <Container>
        <h1>{title}</h1>
        <h3>Learn Anything, Anytime, Anywhere with Our Online Courses!</h3>
      </Container>
    </div>
  );
}
