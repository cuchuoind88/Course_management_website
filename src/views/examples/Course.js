import IndexNavbar from "components/Navbars/IndexNavbar";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "components/Footer/Footer";
import {
  CardBody,
  Container,
  Col,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  CardFooter,
} from "reactstrap";
import { Card } from "reactstrap";
import { Row } from "reactstrap";
import "./Course.scss";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function Course() {
  // React.useEffect(() => {
  //   document.body.classList.toggle("index-page");
  //   //  clean up after this effect:
  //   return function cleanup() {
  //     document.body.classList.toggle("index-page");
  //   };
  // }, []);
  const LXCstate = useSelector((state) => state);
  const url = "http://localhost:2002/course/viewall";
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCourses(response.data.result);
      });
  }, []);
  return LXCstate.auth.username ? (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="course_header">
          <Container>
            <h1>Archives: Courses</h1>
            <h3>Learn Anything, Anytime, Anywhere with Our Online Courses!</h3>
          </Container>
        </div>
        <Container>
          <div className="course_body">
            <h1>Algolia</h1>
            <Row>
              {courses?.map((course) => {
                return (
                  <Col lg="4" md="6" key={course._id}>
                    <Card
                      style={{
                        width: "18rem",
                      }}
                    >
                      <img alt="Sample" src={course.thumbnail} />
                      <CardBody>
                        <CardTitle tag="h3">{course.title}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                          <i class="tim-icons icon-tap-02"></i>
                          <p>{course.views} viewed</p>
                        </CardSubtitle>
                        <CardText>{course.courseDetails}</CardText>
                        <CardText>
                          <div className="Price">
                            <i class="tim-icons icon-coins"></i>
                            <p>{course.price}</p>
                          </div>
                          <div className="Enrollment">
                            <i class="tim-icons icon-single-02"></i>
                            <p>{course.enrolledCount} Students</p>
                          </div>
                        </CardText>
                        <Button color="success">Click to enroll</Button>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>

        <Footer />
      </div>
    </>
  ) : (
    <Redirect to="/home" />
  );
}
