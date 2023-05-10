import React from "react";
import LoadingScreen2 from "components/LoadingScreen/LoadingScreen2";
import axios from "axios";
import "./CourseDetail.scss";
import { Container } from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar";
import { Row, Col } from "reactstrap";
import Footer from "components/Footer/Footer";
import CourseHeader from "./Course_header/CourseHeader";
import { Link } from "react-router-dom";
import {
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  CardFooter,
  Card,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
export default function CourseDetail() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const url = `http://localhost:2002/course/${courseId}`;

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCourse(response.data.result);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <div className="course_Detail_body">
        <CourseHeader title={course.title} />
        <Container>
          <div className="course_Detail_title">
            <h1>{course.title}</h1>
          </div>
          {loading ? (
            <LoadingScreen2 />
          ) : (
            <Row>
              <Col lg="7" md="6">
                <h3>Course Decriptsion</h3>
                <p className="text-muted Course_Desc  ">
                  {course.courseDetails}
                  <br></br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
                <h3 className="course_desc_title">
                  What You’ll Learn From This Course
                </h3>
                <ul>
                  <li className="text-muted">
                    Neque sodales ut etiam sit amet nisl purus non tellus orci
                    ac auctor
                  </li>
                  <li className="text-muted">
                    Tristique nulla aliquet enim tortor at auctor urna. Sit amet
                    aliquam id diam maer
                  </li>
                  <li className="text-muted">
                    Nam libero justo laoreet sit amet. Lacus sed viverra tellus
                    in hac
                  </li>
                  <li className="text-muted">
                    Tempus imperdiet nulla malesuada pellentesque elit eget
                    gravida cum sociis
                  </li>
                </ul>
                <h3>Certification</h3>
                <p className="certification">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
                <Button color="warning">
                  <Link to="/" className="text-white">
                    Enroll
                  </Link>
                </Button>
              </Col>
              <Col>
                <Card
                  style={{
                    width: "20rem",
                  }}
                >
                  <div className="card_wrapper">
                    <img alt="Sample" src={course.thumbnail} />
                    <CardBody>
                      <CardTitle tag="h3">{course.title}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        <i class="tim-icons icon-tap-02"></i>
                        <p>{course.views} viewed</p>
                      </CardSubtitle>
                      <CardText>
                        Skills you'll gain: Front-End Web Development,
                        Full-Stack Web Development
                      </CardText>
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
                    </CardBody>
                  </div>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}
